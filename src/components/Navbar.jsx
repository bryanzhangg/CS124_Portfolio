import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "ABOUT",    id: "about" },
  { label: "SKILLS",   id: "skills" },
  { label: "PROJECTS", id: "projects" },
  { label: "CONTACT",  id: "contact" },
];

const CSS = `
  .site-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    height: 56px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
  }

  .site-nav.hero-mode {
    background: linear-gradient(180deg, #141414 0%, #0e0e0e 100%);
    border-bottom: 8px solid #1e1e1e;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: clamp(0.75rem, 1.6vw, 1rem);
    letter-spacing: 0.18em;
    color: #c8c2b8;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .site-nav.default-mode {
    background: rgba(8, 8, 8, 0.92);
    border-bottom: 1px solid #1e1e1e;
    backdrop-filter: blur(10px);
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    color: #888;
  }

  .nav-icon {
    display: inline-block;
    transform: rotate(-45deg);
    font-size: 1.15em;
    line-height: 1;
    opacity: 0.9;
  }

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
`;

export default function Navbar() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [isHero, setIsHero] = useState(onHome);

  useEffect(() => {
    function check() {
      setIsHero(onHome && window.scrollY === 0);
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [onHome]);

  function handleClick(e, id) {
    if (onHome) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <style>{CSS}</style>
      <nav className={`site-nav ${isHero ? "hero-mode" : "default-mode"}`}>
        <span className="nav-icon" aria-hidden="true">✈</span>
        <ul className="nav-links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <a href={`/#${id}`} onClick={(e) => handleClick(e, id)}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
