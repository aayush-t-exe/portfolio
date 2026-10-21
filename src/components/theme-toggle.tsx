/**
 * Theme toggle: cycles light → dark → follow system. A server component: the click is
 * handled by PageBehavior (event delegation on [data-theme-toggle]), and the icon/label for
 * the current preference (html[data-theme-pref], set before first paint) are shown by CSS,
 * so the server render is right for every visitor and nothing hydrates here.
 */
export function ThemeToggle() {
  return (
    <button
      type="button"
      data-theme-toggle
      title="Theme: light, dark or system"
      className="theme-toggle press grid size-9 place-items-center rounded-full text-muted hover:text-fg"
    >
      <span className="tt tt-light sr-only">Theme: light. Switch to dark</span>
      <span className="tt tt-dark sr-only">Theme: dark. Switch to follow system</span>
      <span className="tt tt-system sr-only">Theme: follows system. Switch to light</span>
      <svg
        className="tt tt-light"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
      <svg
        className="tt tt-dark"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7Z" />
      </svg>
      <svg
        className="tt tt-system"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="4.5" width="18" height="12" rx="2" />
        <path d="M8.5 20h7M12 16.5V20" />
      </svg>
    </button>
  );
}
