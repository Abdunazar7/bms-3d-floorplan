"""3D Floor Plan integration.

Serves the bundled frontend JS, loads it on every HA page (so the card and the
in-app editor work everywhere), and registers a native sidebar panel that
survives page refreshes and appears on every device — unlike a Lovelace-resource
DOM injection, which only runs when a dashboard loads the resource.

This is a custom integration, NOT an add-on: it runs inside HA core, so it works
on every install type (Core, Container, Supervised, OS) — no Supervisor needed.
"""

from __future__ import annotations

import logging
import os

from homeassistant.components import frontend, panel_custom
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    DOMAIN,
    MODULE_URL,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL,
    URL_BASE,
)

_LOGGER = logging.getLogger(__name__)

FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "frontend")


async def _register_static_path(hass: HomeAssistant) -> None:
    """Serve the bundled frontend directory at URL_BASE (version-tolerant)."""
    try:
        # HA 2024.7+
        from homeassistant.components.http import StaticPathConfig

        await hass.http.async_register_static_paths(
            [StaticPathConfig(URL_BASE, FRONTEND_DIR, False)]
        )
    except ImportError:
        # Older HA cores.
        hass.http.register_static_path(URL_BASE, FRONTEND_DIR, False)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up from a config entry (UI install — no YAML)."""
    await _register_static_path(hass)

    # Load the card module on every frontend page so the card is usable in
    # dashboards and the editor works app-wide.
    try:
        frontend.add_extra_js_url(hass, MODULE_URL)
    except Exception as err:  # noqa: BLE001 - best effort
        _LOGGER.debug("add_extra_js_url failed: %s", err)

    # Register the native sidebar panel (idempotent).
    panels = hass.data.get("frontend_panels", {})
    if PANEL_URL not in panels:
        try:
            await panel_custom.async_register_panel(
                hass,
                frontend_url_path=PANEL_URL,
                webcomponent_name="ha-3d-floorplan-card",
                module_url=MODULE_URL,
                sidebar_title=PANEL_TITLE,
                sidebar_icon=PANEL_ICON,
                require_admin=False,
                config={},
                embed_iframe=False,
            )
        except ValueError:
            # Already registered (e.g. reload) — fine.
            pass

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the panel when the integration is unloaded."""
    frontend.async_remove_panel(hass, PANEL_URL)
    return True
