import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "ABOUT",    id: "about"    },
  { label: "PROJECTS", id: "projects" },
  { label: "SKILLS",   id: "skills"   },
  { label: "CONTACT",  id: "contact"  },
];

const PlaneSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
    width="1.15em" height="1.15em" aria-hidden="true" style={{ display: "block" }}>
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

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
  }

  .site-nav.hero-mode {
    background: linear-gradient(180deg, #141414 0%, #0e0e0e 100%);
    border-bottom: 8px solid #1e1e1e;
    font-family: 'Inter', Inter, Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: clamp(0.75rem, 1.6vw, 1rem);
    height: 56px;
    letter-spacing: 0.14em;
    color: #c8c2b8;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .site-nav.default-mode {
    background: linear-gradient(180deg, #141414 0%, #0e0e0e 100%);
    border-bottom: 1px solid #1e1e1e;
    font-family: 'Inter', Inter, Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: clamp(0.75rem, 1.6vw, 1rem);
    height: 49px;
    letter-spacing: 0.14em;
    color: #c8c2b8;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  .hero-mode .nav-brand {
    display: none;
  }

  .nav-brand {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1.1em;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
  }

  .nav-brand-first { color: #c8c2b8; font-weight: 700; }
  .nav-brand-sep   { color: #c8c2b8; font-weight: 500; }
  .nav-brand-last  { color: #c8c2b8; font-weight: 700; }

  @keyframes nav-glitch {
    0%   { text-shadow: none;                                                    transform: none; }
    18%  { text-shadow:  3px 0 rgba(0,220,255,0.9), -3px 0 rgba(255,0,80,0.9);  transform: translateX(-3px); }
    36%  { text-shadow: -3px 0 rgba(0,220,255,0.75), 3px 0 rgba(255,0,80,0.75); transform: translateX( 3px); }
    54%  { text-shadow:  2px 0 rgba(255,0,80,0.65);                              transform: translateX(-2px); }
    72%  { text-shadow: -1px 0 rgba(0,220,255,0.5);                              transform: translateX( 1px); }
    88%  { text-shadow:  1px 0 rgba(0,220,255,0.2);                              transform: none; }
    100% { text-shadow: none;                                                    transform: none; }
  }

  .nav-left:hover .nav-brand-first,
  .nav-left:hover .nav-brand-sep,
  .nav-left:hover .nav-brand-last { animation: nav-glitch 0.38s step-start forwards; }

  .nav-icon {
    display: inline-flex;
    align-items: center;
    transform: rotate(45deg);
    opacity: 0.9;
    flex-shrink: 0;
  }

  /* ── Desktop nav links ─────────────────────────── */
  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s;
  }

  .nav-links a:hover { opacity: 0.55; }

  /* ── Hamburger button (hidden on desktop) ──────── */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    padding: 0.4rem;
    cursor: pointer;
    color: #c8c2b8;
    flex-shrink: 0;
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
    top: 49px;
    left: 0; right: 0;
    background: linear-gradient(180deg, #141414 0%, #0e0e0e 100%);
    border-bottom: 1px solid #1e1e1e;
    padding: 1.2rem 1rem 1.4rem;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-6px);
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
    font-family: 'Inter', Helvetica, Arial, sans-serif;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: #c8c2b8;
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
    text-decoration: none;
    color: inherit;
    font-size: 0.85rem;
    transition: opacity 0.2s;
  }

  .nav-mobile-links a:hover { opacity: 0.55; }

  /* ── Mobile overrides ──────────────────────────── */
  @media (max-width: 768px) {
    .site-nav.hero-mode,
    .site-nav.default-mode {
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
  const [isHero, setIsHero] = useState(onHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function check() {
      setIsHero(onHome && window.scrollY === 0);
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
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
      <nav className={`site-nav ${isHero ? "hero-mode" : "default-mode"}`}>
        <a
          className="nav-left"
          href="/"
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setMenuOpen(false);
          }}
        >
          <span className="nav-icon"><PlaneSVG /></span>
          <span className="nav-brand">
            <span className="nav-brand-first">BRYAN</span>
            <span className="nav-brand-sep">_</span>
            <span className="nav-brand-last">ZHANG</span>
          </span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <a href={`/#${id}`} onClick={(e) => handleClick(e, id)}>{label}</a>
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
              <a href={`/#${id}`} onClick={(e) => handleClick(e, id)}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
