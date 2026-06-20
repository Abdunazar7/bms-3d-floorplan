// ---------------------------------------------------------------------------
// Automatic sidebar entry (frontend-only, no YAML required).
//
// Home Assistant has no *officially supported* way for a Lovelace resource to
// add a sidebar item — the supported routes (`panel_custom` / panel dashboard)
// need a small YAML block. This injector instead hooks the sidebar DOM so the
// card appears in the side panel with zero manual config. It is best-effort and
// defensive: it waits for the sidebar, re-injects if HA re-renders it, and does
// nothing (just logs) if the structure can't be found.
//
// Clicking the item opens the 3D floor plan fullscreen in an overlay (no panel
// route registration needed).
//
// Configure (optional) by setting before the resource loads, e.g. in a small
// /local/ha-3d-floorplan-config.js or via the browser:
//   window.ha3dFloorplan = {
//     sidebar: true,                       // set false to disable injection
//     title: '3D Floor Plan',
//     icon: 'mdi:floor-plan',
//     url: '/local/floorplans/home.json',  // OR
//     config: { type: 'custom:ha-3d-floorplan-card', url: '...' }
//   };
// ---------------------------------------------------------------------------

interface SidebarSettings {
  sidebar?: boolean;
  title?: string;
  icon?: string;
  url?: string;
  config?: Record<string, any>;
}

const ITEM_ID = 'ha-3d-floorplan-sidebar-item';
const OVERLAY_ID = 'ha-3d-floorplan-overlay';

function settings(): SidebarSettings {
  return (window as any).ha3dFloorplan ?? {};
}

/** Find the scrollable list container inside the sidebar across HA versions. */
function findList(sidebar: HTMLElement): HTMLElement | null {
  const root = (sidebar as any).shadowRoot as ShadowRoot;
  return (
    root.querySelector('ha-md-list') ||
    root.querySelector('paper-listbox') ||
    root.querySelector('ul.ha-scrollbar') ||
    root.querySelector('ul') ||
    root.querySelector('.menu')
  );
}

function buildItem(s: SidebarSettings): HTMLAnchorElement {
  const a = document.createElement('a');
  a.id = ITEM_ID;
  a.href = '#';
  a.setAttribute('role', 'menuitem');
  a.style.cssText = [
    'display:flex',
    'align-items:center',
    'gap:12px',
    'box-sizing:border-box',
    'width:calc(100% - 12px)',
    'margin:4px 8px',
    'padding:12px',
    'border-radius:12px',
    'cursor:pointer',
    // Match the other (unselected) sidebar items: white-ish text, medium weight.
    'color:var(--sidebar-text-color, var(--primary-text-color, #e1e1e1))',
    'font:inherit',
    'font-size:14px',
    'font-weight:500',
    'text-decoration:none',
    '-webkit-tap-highlight-color:transparent',
  ].join(';');

  const icon = document.createElement('ha-icon');
  icon.setAttribute('icon', s.icon ?? 'mdi:floor-plan');
  icon.style.cssText = 'width:24px;height:24px;flex:0 0 24px;';

  const label = document.createElement('span');
  label.textContent = s.title ?? '3D Floor Plan';
  label.style.cssText = 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';

  a.appendChild(icon);
  a.appendChild(label);
  a.addEventListener('mouseenter', () => (a.style.background = 'var(--sidebar-selected-icon-color, rgba(255,255,255,0.06))'));
  a.addEventListener('mouseleave', () => (a.style.background = 'transparent'));
  a.addEventListener('click', (e) => {
    e.preventDefault();
    openOverlay(s);
  });
  return a;
}

function inject(sidebar: HTMLElement, s: SidebarSettings): void {
  const root = (sidebar as any).shadowRoot as ShadowRoot;
  if (root.getElementById(ITEM_ID)) return; // already present
  const list = findList(sidebar);
  const item = buildItem(s);
  // Insert right after the panel list — this placement renders reliably across
  // HA versions (a raw <a> inside <ha-md-list> can be hidden). For a fully
  // native, always-present sidebar item that survives refresh, use panel_custom
  // (see README) — the card supports being used as a panel.
  if (list && list.parentNode) {
    list.parentNode.insertBefore(item, list.nextSibling);
  } else {
    root.appendChild(item);
  }
}

/** Resolve the card config from settings (inline config wins over url).
 *  With no config/url, the card falls back to a saved (localStorage) plan or
 *  the built-in demo — so the overlay never 404s on a missing file. */
function resolveConfig(s: SidebarSettings): Record<string, any> {
  if (s.config) return { type: 'custom:ha-3d-floorplan-card', height: '100vh', ...s.config };
  const cfg: Record<string, any> = { type: 'custom:ha-3d-floorplan-card', height: '100vh' };
  if (s.url) cfg.url = s.url;
  return cfg;
}

/** Right edge (x) of the sidebar in viewport coords, so the overlay can start
 *  just after it and never cover the sidebar. 0 when the sidebar is hidden
 *  (e.g. mobile drawer closed). */
function sidebarRightEdge(): number {
  const ha = document.querySelector('home-assistant') as any;
  const main = ha?.shadowRoot?.querySelector('home-assistant-main') as any;
  const sidebar = main?.shadowRoot?.querySelector('ha-sidebar') as HTMLElement | null;
  if (!sidebar) return 0;
  const rect = sidebar.getBoundingClientRect();
  if (rect.width === 0 || rect.right <= 0) return 0; // hidden / off-screen
  return Math.max(0, Math.round(rect.right));
}

function openOverlay(s: SidebarSettings): void {
  if (document.getElementById(OVERLAY_ID)) return;

  const overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  overlay.style.cssText = [
    'position:fixed',
    'top:0',
    'right:0',
    'bottom:0',
    'left:0',
    'z-index:9999',
    'background:var(--primary-background-color, #111)',
    'display:block',
  ].join(';');

  // Keep the overlay clear of the sidebar, tracking expand/collapse/resize.
  const applyOffset = () => {
    overlay.style.left = `${sidebarRightEdge()}px`;
  };
  applyOffset();
  window.addEventListener('resize', applyOffset);
  let offsetRO: ResizeObserver | undefined;
  const haMain = (document.querySelector('home-assistant') as any)?.shadowRoot?.querySelector(
    'home-assistant-main',
  ) as any;
  const sidebarEl = haMain?.shadowRoot?.querySelector('ha-sidebar') as HTMLElement | null;
  if (sidebarEl && 'ResizeObserver' in window) {
    offsetRO = new ResizeObserver(applyOffset);
    offsetRO.observe(sidebarEl);
  }
  // Fallback: re-check periodically (collapse animation, theme changes).
  const offsetTimer = window.setInterval(applyOffset, 500);

  const close = document.createElement('button');
  close.textContent = '✕';
  close.title = 'Close';
  // Bottom-left so it never overlaps the editor toolbar (top-left) or the
  // Reset/Done buttons (top-right). Esc and navigating to another panel also close.
  close.style.cssText = [
    'position:absolute',
    'bottom:14px',
    'left:14px',
    'z-index:10000',
    'width:42px',
    'height:42px',
    'border-radius:50%',
    'border:1px solid rgba(255,255,255,0.2)',
    'background:rgba(30,33,40,0.85)',
    'color:#fff',
    'font-size:18px',
    'cursor:pointer',
    'backdrop-filter:blur(4px)',
  ].join(';');

  const card = document.createElement('ha-3d-floorplan-card') as any;
  card.style.cssText = 'display:block;width:100%;height:100%;';
  try {
    card.setConfig(resolveConfig(s));
  } catch (err) {
    console.error('[3d-floorplan] sidebar config error:', err);
  }

  const ha = document.querySelector('home-assistant') as any;
  if (ha?.hass) card.hass = ha.hass;
  // Keep hass fresh; the card diffs by reference per entity so this is cheap.
  const timer = window.setInterval(() => {
    if (ha?.hass) card.hass = ha.hass;
    if (location.pathname !== startPath) dispose();
  }, 1000);

  // Close automatically when the user navigates to another sidebar panel, so
  // other items work normally (no need to press ✕ first).
  const startPath = location.pathname;
  const onNav = () => {
    if (location.pathname !== startPath) dispose();
  };

  const dispose = () => {
    window.clearInterval(timer);
    window.clearInterval(offsetTimer);
    window.removeEventListener('resize', applyOffset);
    window.removeEventListener('location-changed', onNav);
    window.removeEventListener('popstate', onNav);
    offsetRO?.disconnect();
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') dispose();
  };
  window.addEventListener('location-changed', onNav);
  window.addEventListener('popstate', onNav);
  close.addEventListener('click', dispose);
  document.addEventListener('keydown', onKey);

  overlay.appendChild(close);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

function currentSidebar(): HTMLElement | null {
  const ha = document.querySelector('home-assistant') as any;
  const main = ha?.shadowRoot?.querySelector('home-assistant-main') as any;
  const sidebar = main?.shadowRoot?.querySelector('ha-sidebar') as HTMLElement | null;
  return sidebar && (sidebar as any).shadowRoot ? sidebar : null;
}

let installed = false;

export function installSidebar(): void {
  const s = settings();
  if (s.sidebar === false || installed) return;
  installed = true;

  const tryInject = () => {
    const sidebar = currentSidebar();
    if (!sidebar) return;
    const root = (sidebar as any).shadowRoot as ShadowRoot;
    // If a native panel (integration / panel_custom) already provides the
    // sidebar entry, stand down to avoid a duplicate item.
    const nativePanel = root.querySelector(
      'a[href="/3d-floorplan"], a[href$="/3d-floorplan"], a[href$="/ha-3d-floorplan-card"]',
    );
    if (nativePanel || (window as any).__ha3dPanelMode) {
      root.getElementById(ITEM_ID)?.remove();
      return;
    }
    inject(sidebar, s);
    // Attach a re-inject observer once per sidebar instance (HA re-renders it).
    if (!(sidebar as any).__ha3dObs) {
      const root = (sidebar as any).shadowRoot as ShadowRoot;
      const obs = new MutationObserver(() => {
        if (!root.getElementById(ITEM_ID)) inject(sidebar, s);
      });
      obs.observe(root, { childList: true, subtree: true });
      (sidebar as any).__ha3dObs = obs;
    }
  };

  tryInject();
  // Keep trying forever (cheap, idempotent): handles the resource loading
  // before the sidebar exists, new tabs, other devices, theme/HA re-renders,
  // and the sidebar element being recreated. This is why the item now appears
  // everywhere, not just the first tab that loaded a dashboard.
  window.setInterval(tryInject, 1500);
}
