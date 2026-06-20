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

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Walk down through HA's nested shadow roots to reach <ha-sidebar>. */
async function findSidebar(): Promise<HTMLElement | null> {
  for (let i = 0; i < 40; i++) {
    const ha = document.querySelector('home-assistant') as any;
    const main = ha?.shadowRoot?.querySelector('home-assistant-main') as any;
    const sidebar = main?.shadowRoot?.querySelector('ha-sidebar') as HTMLElement | null;
    if (sidebar && (sidebar as any).shadowRoot) return sidebar;
    await sleep(500);
  }
  return null;
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
    'color:var(--sidebar-icon-color, var(--primary-text-color, #888))',
    'font:inherit',
    'font-size:14px',
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
  if (list && list.parentNode) {
    // Place just after the main navigation list.
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
  close.style.cssText = [
    'position:absolute',
    'top:14px',
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
  }, 1000);

  const dispose = () => {
    window.clearInterval(timer);
    window.clearInterval(offsetTimer);
    window.removeEventListener('resize', applyOffset);
    offsetRO?.disconnect();
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') dispose();
  };
  close.addEventListener('click', dispose);
  document.addEventListener('keydown', onKey);

  overlay.appendChild(close);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

export async function installSidebar(): Promise<void> {
  const s = settings();
  if (s.sidebar === false) return;

  const sidebar = await findSidebar();
  if (!sidebar) {
    console.info(
      '[3d-floorplan] sidebar not found — auto-injection skipped. ' +
        'Use panel_custom (see README) for a guaranteed sidebar entry.',
    );
    return;
  }

  inject(sidebar, s);

  // HA re-renders the sidebar on navigation / theme changes; re-inject if our
  // item disappears.
  const root = (sidebar as any).shadowRoot as ShadowRoot;
  const observer = new MutationObserver(() => {
    if (!root.getElementById(ITEM_ID)) inject(sidebar, s);
  });
  observer.observe(root, { childList: true, subtree: true });
}
