import { useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  function handleClick(e, id) {
    if (onHome) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav>
      <ul>
        {NAV_LINKS.map(({ label, id }) => (
          <li key={id}>
            <a href={`/#${id}`} onClick={(e) => handleClick(e, id)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
