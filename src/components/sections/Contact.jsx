import { useLayoutEffect, useRef } from "react";
import fsaeCar, { CAR_COLUMNS, CAR_ROWS, CAR_LETTER_SPACING, CAR_LINE_HEIGHT } from "../../data/fsaeCar";
// TODO: fill in your actual contact details
const TILES = [
  { label: "Email",    value: "bryanz4@illinois.edu",        href: "mailto:bryanz4@illinois.edu" },
  { label: "LinkedIn", value: "linkedin.com/in/bryanz4/", href: "https://linkedin.com/in/bryanz4/" },
  { label: "Phone",    value: "+1 (205) 215-6515",     href: "tel:+12052156515" },
];

const CSS = `
  .contact-scroll-track {
    position: relative;
  }

  html.contact-bottom-stop {
    scroll-snap-type: y proximity;
  }

  .contact-original-end {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    pointer-events: none;
    scroll-snap-align: end;
    scroll-snap-stop: always;
  }

  .contact-viewport-probe {
    position: absolute;
    height: 100dvh;
    width: 0;
    visibility: hidden;
    pointer-events: none;
  }

  #contact {
    --contact-cut: clamp(32px, 6vw, 88px);
    --contact-gutter: 9rem;
    position: sticky;
    height: auto;
    overflow: visible;
    isolation: isolate;
    z-index: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .contact-content {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    padding: 4rem var(--contact-gutter) 2.5rem;
  }

  .contact-car {
    position: absolute;
    bottom: 3px;
    left: var(--contact-gutter);
    right: var(--contact-gutter);
    margin: 0;
    overflow: hidden;
    clip-path: inset(100% 0 0);
    opacity: 0;
    pointer-events: none;
    user-select: none;
  }

  .contact-car pre {
    width: max-content;
    margin: 0 auto;
    color: #242424;
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-weight: 400;
    font-size: 1px;
    font-variant-ligatures: none;
    font-kerning: none;
    white-space: pre;
    letter-spacing: ${CAR_LETTER_SPACING}em;
    line-height: ${CAR_LINE_HEIGHT};
  }

  .contact-footer-divider {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #24242455;
    pointer-events: none;
  }

  #contact::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: #e2dfd8;
    pointer-events: none;
  }

  #contact::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: var(--contact-cut);
    height: var(--contact-cut);
    background: #050505;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    pointer-events: none;
  }

  /* ── Header (matches Projects / Skills) ───────── */
  .contact-label {
    line-height: 1.1;
    font-size: clamp(2.2rem, 4.5vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
    color: #191919;
  }

  .contact-divider {
    height: 1px;
    background: #24242430;
    border: none;
    margin: 1rem 0 1.2rem;
    width: 100%;
  }

  /* ── Tile row ─────────────────────────────────── */
  .contact-tiles-wrapper {
    display: flex;
    align-items: flex-start;
  }

  .contact-tiles {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    width: 100%;
  }

  .contact-tile {
    position: relative;
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    text-decoration: none;
  }

  /* Bracket corners */
  .ct-br {
    position: absolute;
    width: 10px;
    height: 10px;
    border-style: solid;
    border-color: #505050;
    transition: border-color 0.25s ease;
  }
  .ct-br-tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  .ct-br-tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  .ct-br-bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  .ct-br-br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }

  .contact-tile:hover .ct-br { border-color: #888; }

  /* Tile text */
  .contact-tile-label {
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    color: #505050;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .contact-tile-value {
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    color: #191919;
    overflow-wrap: anywhere;
    text-transform: uppercase;
    transition: color 0.2s ease;
  }

  .contact-tile:hover .contact-tile-label { color: #555; }
  .contact-tile:hover .contact-tile-value { color: #514d46; }
  .contact-tile:focus-visible { outline: 2px solid #514d46; outline-offset: 4px; }

  @media (max-width: 768px) {
    #contact {
      --contact-gutter: 1.5rem;
    }
    .contact-tiles {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }
    .contact-tile {
      flex: 0 0 auto;
    }
  }
`;

export default function Contact() {
  const trackRef = useRef(null);
  const originalEndRef = useRef(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const carRef = useRef(null);
  const artRef = useRef(null);
  const viewportRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const originalEnd = originalEndRef.current;
    const section = sectionRef.current;
    const content = contentRef.current;
    const car = carRef.current;
    const art = artRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const context = document.createElement("canvas").getContext("2d");
    let metrics;
    let frame = 0;
    let disposed = false;
    let previousProgress = -1;
    let pauseConsumed = false;
    let holdUntil = 0;
    let touchY = null;

    function stopAtOriginalEnd(event, delta) {
      if (!metrics || preference.matches || delta <= 0) return;
      if (performance.now() < holdUntil) {
        if (event.cancelable) event.preventDefault();
        return;
      }
      if (pauseConsumed) return;
      const remaining = track.getBoundingClientRect().top + metrics.baseHeight - metrics.viewportHeight;
      // Large wheel steps can jump over a proximity snap in short viewports.
      // Clamp that one crossing, without moving or resizing any page elements.
      if (remaining >= 0 && delta >= remaining && event.cancelable) {
        event.preventDefault();
        pauseConsumed = true;
        holdUntil = performance.now() + 140;
        document.documentElement.classList.remove("contact-bottom-stop");
        window.scrollTo({ top: window.scrollY + remaining, behavior: "instant" });
      }
    }

    function onWheel(event) {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? metrics?.viewportHeight ?? 1 : 1;
      stopAtOriginalEnd(event, event.deltaY * unit);
    }

    function onTouchStart(event) {
      touchY = event.touches.length === 1 ? event.touches[0].clientY : null;
    }

    function onTouchMove(event) {
      if (touchY === null || event.touches.length !== 1) return;
      const nextY = event.touches[0].clientY;
      const delta = touchY - nextY;
      touchY = nextY;
      stopAtOriginalEnd(event, delta);
    }

    function finishOriginalStop() {
      if (!metrics) return;
      const distance = metrics.viewportHeight - track.getBoundingClientRect().top - metrics.baseHeight;
      if (Math.abs(distance) <= 2 || distance > metrics.viewportHeight * 0.35) {
        // Snap only once on the way down, then let small wheel/touch gestures
        // advance normally instead of repeatedly snapping back to this point.
        pauseConsumed = true;
        document.documentElement.classList.remove("contact-bottom-stop");
      }
    }

    function update() {
      frame = 0;
      if (!metrics || preference.matches) return;
      const { baseHeight, growth, viewportHeight, revealTravel } = metrics;
      const distance = viewportHeight - track.getBoundingClientRect().top - baseHeight;
      if (pauseConsumed && distance < -viewportHeight * 0.6) {
        pauseConsumed = false;
        document.documentElement.classList.add("contact-bottom-stop");
      }
      // Contact scrolls normally to its full height before any drawing starts.
      // Only the final reveal has a sticky runway; earlier sections stay put.
      const progress = Math.max(0, Math.min(1, (distance - growth) / revealTravel));
      if (progress === previousProgress) return;
      previousProgress = progress;
      const eased = 1 - (1 - progress) ** 3;
      const edge = eased * 108;
      const mask = `linear-gradient(to top, #000 ${Math.max(0, edge - 8)}%, transparent ${edge}%)`;
      car.style.clipPath = `inset(${Math.max(0, 100 - edge)}% 0 0)`;
      car.style.maskImage = mask;
      car.style.webkitMaskImage = mask;
      car.style.opacity = `${Math.min(1, eased * 4)}`;
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function measure() {
      if (disposed) return;
      const viewportHeight = viewportRef.current.offsetHeight;
      const navHeight = document.querySelector(".site-nav")?.getBoundingClientRect().height ?? 56;
      const fullHeight = Math.max(1, viewportHeight - navHeight);
      const naturalContentHeight = content.getBoundingClientRect().height;
      const baseHeight = Math.min(naturalContentHeight, fullHeight);
      context.font = `100px ${getComputedStyle(art).fontFamily}`;
      const glyphWidth = context.measureText("@").width / 100;
      const widthFontSize = car.clientWidth * 0.92 / (CAR_COLUMNS * (glyphWidth + CAR_LETTER_SPACING));
      const carSpace = Math.max(0, fullHeight - baseHeight - 16);
      // Fit both axes proportionally instead of making Contact taller than
      // the space below the navbar on short or wide displays.
      const fontSize = Math.min(widthFontSize, carSpace / (CAR_ROWS * CAR_LINE_HEIGHT));
      art.style.fontSize = `${fontSize}px`;
      const growth = fullHeight - baseHeight;
      const revealTravel = Math.max(240, Math.min(480, viewportHeight * 0.45));
      metrics = { baseHeight, growth, viewportHeight, revealTravel };
      previousProgress = -1;
      section.style.height = `${fullHeight}px`;
      // Keep links accessible even when zoom or a very short display makes
      // the contact text itself taller than the available page height.
      section.style.overflowY = naturalContentHeight > fullHeight ? "auto" : "visible";
      originalEnd.style.height = `${baseHeight}px`;

      if (preference.matches) {
        document.documentElement.classList.remove("contact-bottom-stop");
        track.style.height = `${fullHeight}px`;
        section.style.position = "relative";
        section.style.top = "0px";
        car.style.clipPath = "none";
        car.style.maskImage = "none";
        car.style.webkitMaskImage = "none";
        car.style.opacity = "1";
      } else {
        document.documentElement.classList.toggle("contact-bottom-stop", !pauseConsumed);
        track.style.height = `${fullHeight + revealTravel}px`;
        section.style.position = "sticky";
        section.style.top = `${navHeight}px`;
        update();
      }
    }

    let observedWidth;
    let observedContentHeight;
    let observedViewportHeight;
    const observer = new ResizeObserver(() => {
      const width = track.clientWidth;
      const height = content.getBoundingClientRect().height;
      const viewportHeight = viewportRef.current.offsetHeight;
      if (width !== observedWidth || height !== observedContentHeight || viewportHeight !== observedViewportHeight) {
        observedWidth = width;
        observedContentHeight = height;
        observedViewportHeight = viewportHeight;
        measure();
      }
    });
    observer.observe(track);
    observer.observe(content);
    observer.observe(viewportRef.current);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("scrollend", finishOriginalStop);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", measure);
    preference.addEventListener("change", measure);
    measure();
    document.fonts.ready.then(measure);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("scrollend", finishOriginalStop);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      document.documentElement.classList.remove("contact-bottom-stop");
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", measure);
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="contact-scroll-track" ref={trackRef}>
        <span className="contact-viewport-probe" ref={viewportRef} aria-hidden="true" />
        <span className="contact-original-end" ref={originalEndRef} aria-hidden="true" />
        <section id="contact" ref={sectionRef} aria-labelledby="contact-title">
          <div className="contact-content" ref={contentRef}>
            <h2 id="contact-title" className="contact-label">Let's Get in Touch</h2>
            <hr className="contact-divider" />
            <div className="contact-tiles-wrapper">
              <div className="contact-tiles">
                {TILES.map(({ label, value, href }) => (
                  <a key={label} className="contact-tile" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    <span className="ct-br ct-br-tl" />
                    <span className="ct-br ct-br-tr" />
                    <span className="ct-br ct-br-bl" />
                    <span className="ct-br ct-br-br" />
                    <span className="contact-tile-label">{label}</span>
                    <span className="contact-tile-value">{value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <figure className="contact-car" ref={carRef} aria-hidden="true">
            <pre ref={artRef}>{fsaeCar}</pre>
          </figure>
          <div className="contact-footer-divider" aria-hidden="true" />
        </section>
      </div>
    </>
  );
}
