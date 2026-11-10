import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "ABOUT",    id: "about"    },
  { label: "EXPERIENCE", id: "experience" },
  { label: "PROJECTS", id: "projects" },
  { label: "SKILLS",   id: "skills"   },
  { label: "CONTACT",  id: "contact"  },
];

const CSS = `
  .site-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    background: linear-gradient(180deg, #141414 0%, #0e0e0e 100%);
    border-bottom: 0;
    font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 500;
    font-size: clamp(0.8rem, 1.65vw, 1.0625rem);
    height: 56px;
    letter-spacing: 0.14em;
    color: #d4cfc6;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .nav-left {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.65rem;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: color 140ms ease-out;
  }

  .nav-initials {
    font-family: inherit;
    font-weight: 700;
    font-size: 1.75rem;
    letter-spacing: -0.07em;
    line-height: 1;
    color: inherit;
    display: inline-flex;
    align-items: baseline;
    transform: skewX(-8deg);
  }

  .nav-initials-separator {
    display: inline-block;
    width: 0.4em;
    height: 0.08em;
    margin: 0 0.06em;
    background: currentColor;
    transform: translateY(0.08em);
  }

  /* ── Desktop nav links ─────────────────────────── */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a,
  .nav-mobile-links a {
    position: relative;
    display: inline-block;
    padding: 0.5rem 0.65rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    transition: color 140ms ease-out;
  }

  .nav-left::before,
  .nav-links a::before,
  .nav-mobile-links a::before,
  .nav-hamburger::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(currentColor, currentColor) top left / 6px 1px no-repeat,
      linear-gradient(currentColor, currentColor) top left / 1px 6px no-repeat,
      linear-gradient(currentColor, currentColor) top right / 6px 1px no-repeat,
      linear-gradient(currentColor, currentColor) top right / 1px 6px no-repeat,
      linear-gradient(currentColor, currentColor) bottom left / 6px 1px no-repeat,
      linear-gradient(currentColor, currentColor) bottom left / 1px 6px no-repeat,
      linear-gradient(currentColor, currentColor) bottom right / 6px 1px no-repeat,
      linear-gradient(currentColor, currentColor) bottom right / 1px 6px no-repeat;
    opacity: 0;
    transform: scale(1.12, 1.2);
    transition: opacity 140ms ease-out, transform 140ms ease-out;
  }

  .nav-left:is(:hover, :focus-visible, [aria-current="location"]),
  .nav-links a:is(:hover, :focus-visible, [aria-current="location"]),
  .nav-mobile-links a:is(:hover, :focus-visible, [aria-current="location"]),
  .nav-hamburger:is(:hover, :focus-visible) {
    color: #eeeae3;
  }

  .nav-left:is(:hover, :focus-visible, [aria-current="location"])::before,
  .nav-links a:is(:hover, :focus-visible, [aria-current="location"])::before,
  .nav-mobile-links a:is(:hover, :focus-visible, [aria-current="location"])::before,
  .nav-hamburger:is(:hover, :focus-visible)::before {
    opacity: 1;
    transform: scale(1);
  }

  /* ── Hamburger button (hidden on desktop) ──────── */
  .nav-hamburger {
    position: relative;
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    padding: 0.4rem;
    cursor: pointer;
    color: #d4cfc6;
    flex-shrink: 0;
    transition: color 140ms ease-out;
  }

  .nav-hamburger span {
    display: block;
    width: 20px;
    height: 1.5px;
    background: currentColor;
    transition: transform 0.22s ease, opacity 0.18s ease;
    transform-origin: center;
  }

  .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  /* ── Mobile dropdown ───────────────────────────── */
  .nav-mobile-menu {
    display: none;
    position: fixed;
    top: 56px;
    left: 0; right: 0;
    background: linear-gradient(180deg, #141414 0%, #0e0e0e 100%);
    border-bottom: 0;
    padding: 1.2rem 1rem 1.4rem;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-6px);
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
    font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 500;
    letter-spacing: 0.14em;
    color: #d4cfc6;
  }

  .nav-mobile-menu.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-mobile-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .nav-mobile-links a {
    font-size: 0.9rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-left,
    .nav-left::before,
    .nav-links a,
    .nav-mobile-links a,
    .nav-hamburger,
    .nav-links a::before,
    .nav-mobile-links a::before,
    .nav-hamburger::before {
      transition: none;
    }
  }

  /* ── Mobile overrides ──────────────────────────── */
  @media (max-width: 768px) {
    .site-nav {
      padding: 0 1rem;
    }
    .nav-links {
      display: none;
    }
    .nav-hamburger {
      display: flex;
    }
    .nav-mobile-menu {
      display: block;
    }
  }
`;

export default function Navbar() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const currentSection = onHome ? activeSection : null;

  useEffect(() => {
    if (!onHome) return;
    const hero = document.getElementById("hero");
    const sections = NAV_LINKS.map(({ id }) => ({
      id,
      // About's navigation anchor is below its visible sticky surface.
      element: id === "about"
        ? document.querySelector(".about-section")
        : document.getElementById(id),
    }));
    const nav = document.querySelector(".site-nav");
    let frame = 0;
    let previous;

    function update() {
      frame = 0;
      const navHeight = nav?.offsetHeight ?? 56;
      const readingLine = navHeight + (window.innerHeight - navHeight) * 0.35;
      let next = "hero";

      // The hero covers About until its trailing edge passes the reading line.
      if (!hero || hero.getBoundingClientRect().bottom <= readingLine) {
        for (const { id, element } of sections) {
          if (element && element.getBoundingClientRect().top <= readingLine) next = id;
        }
        // Short final sections should still activate at the end of the page.
        const contact = sections.find(({ id }) => id === "contact")?.element;
        if (contact && contact.getBoundingClientRect().top < window.innerHeight &&
            window.scrollY > 0 &&
            window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
          next = "contact";
        }
      }

      // Update React only when the active section changes.
      if (next !== previous) {
        previous = next;
        setActiveSection(next);
      }
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    const main = document.querySelector("main");
    if (main) observer.observe(main);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [onHome]);

  useEffect(() => {
    if (!menuOpen) return;
    function close() { setMenuOpen(false); }
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  function handleClick(e, id) {
    if (onHome) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  }

  return (
    <>
      <style>{CSS}</style>
      <nav className="site-nav">
        <a
          className="nav-left"
          href="/"
          aria-label="Bryan Zhang — home"
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setMenuOpen(false);
          }}
        >
          <span className="nav-initials" aria-hidden="true">B<span className="nav-initials-separator" />Z</span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <a href={`/#${id}`} aria-current={currentSection === id ? "location" : undefined} onClick={(e) => handleClick(e, id)}>{label}</a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile-menu${menuOpen ? " open" : ""}`}>
        <ul className="nav-mobile-links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <a href={`/#${id}`} aria-current={currentSection === id ? "location" : undefined} onClick={(e) => handleClick(e, id)}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
