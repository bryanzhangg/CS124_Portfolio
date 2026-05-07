import { useEffect, useRef } from "react";

const CSS = `
  @media (hover: hover) and (pointer: fine) {
    * { cursor: none !important; }
  }

  .custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    will-change: transform;
    transition: opacity 0.25s ease;
  }

  .cursor-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.18s ease, filter 0.18s ease;
  }

  .custom-cursor.locked .cursor-inner {
    transform: scale(0.78);
    filter: brightness(1.35);
  }

  /* Dashed scan ring — rotates into view on hover */
  .cursor-scan-ring {
    transform-origin: 20px 20px;
    opacity: 0;
    transition: opacity 0.18s ease;
  }

  .custom-cursor.locked .cursor-scan-ring {
    opacity: 1;
    animation: cursor-scan 2.4s linear infinite;
  }

  @keyframes cursor-scan {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @media (hover: none), (pointer: coarse) {
    .custom-cursor { display: none; }
  }
`;

export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let shown = false;

    function onMove(e) {
      el.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;

      const isInteractive = !!e.target.closest('a, button, [role="button"], input, select, textarea');
      el.classList.toggle("locked", isInteractive);

      if (!shown) {
        el.style.opacity = "1";
        shown = true;
      }
    }

    function onLeave() { el.style.opacity = "0"; shown = false; }
    function onEnter() { if (shown) el.style.opacity = "1"; }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="custom-cursor" ref={ref}>
        <div className="cursor-inner">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Dashed outer scan ring — spins in on hover */}
            <circle
              className="cursor-scan-ring"
              cx="20" cy="20" r="17"
              stroke="rgba(200,194,184,0.45)"
              strokeWidth="0.8"
              strokeDasharray="3 5"
            />
            {/* Solid inner ring */}
            <circle cx="20" cy="20" r="13" stroke="rgba(200,194,184,0.85)" strokeWidth="1.2"/>
            {/* Crosshair — top */}
            <line x1="20" y1="2"  x2="20" y2="16" stroke="rgba(200,194,184,0.85)" strokeWidth="1.2"/>
            {/* Crosshair — bottom */}
            <line x1="20" y1="24" x2="20" y2="38" stroke="rgba(200,194,184,0.85)" strokeWidth="1.2"/>
            {/* Crosshair — left */}
            <line x1="2"  y1="20" x2="16" y2="20" stroke="rgba(200,194,184,0.85)" strokeWidth="1.2"/>
            {/* Crosshair — right */}
            <line x1="24" y1="20" x2="38" y2="20" stroke="rgba(200,194,184,0.85)" strokeWidth="1.2"/>
            {/* Center dot */}
            <circle cx="20" cy="20" r="1.8" fill="rgba(200,194,184,0.95)"/>
          </svg>
        </div>
      </div>
    </>
  );
}
