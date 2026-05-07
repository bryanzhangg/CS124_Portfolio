import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",     label: "Hero"     },
  { id: "about",    label: "About"    },
  { id: "projects", label: "Projects" },
  { id: "skills",   label: "Skills"   },
  { id: "contact",  label: "Contact"  },
];

const CSS = `
  .section-progress {
    position: fixed;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }

  /* Bracket frame */
  .sp-frame {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
    padding: 0.85rem 0.65rem;
  }

  /* Connecting line behind the dots */
  .sp-frame::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: 50%;
    width: 1px;
    background: #1c1c1c;
    transform: translateX(-50%);
    z-index: -1;
  }

  /* L-bracket corners */
  .sp-br {
    position: absolute;
    width: 8px;
    height: 8px;
    border-style: solid;
    border-color: #383838;
  }
  .sp-br-tl { top: 0; left: 0;  border-width: 1px 0 0 1px; }
  .sp-br-tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  .sp-br-bl { bottom: 0; left: 0;  border-width: 0 0 1px 1px; }
  .sp-br-br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }

  .sp-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #282828;
    border: none;
    padding: 0;
    flex-shrink: 0;
    cursor: pointer;
    transition: background 0.25s ease, transform 0.25s ease;
  }

  .sp-dot.active {
    background: #888;
    transform: scale(1.5);
  }

  .sp-dot:hover:not(.active) {
    background: #484848;
  }

  @media (max-width: 768px) {
    .section-progress {
      display: none;
    }
  }
`;

export default function SectionProgress() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    function update() {
      const mid = window.innerHeight / 2;
      let closest = "hero";
      let closestDist = Infinity;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - mid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = id;
        }
      }
      setActive(closest);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="section-progress" aria-hidden="true" style={{ opacity: active === "hero" ? 0 : 1, pointerEvents: active === "hero" ? "none" : "auto", transition: "opacity 0.4s ease" }}>
        <div className="sp-frame">
          <span className="sp-br sp-br-tl" />
          <span className="sp-br sp-br-tr" />
          <span className="sp-br sp-br-bl" />
          <span className="sp-br sp-br-br" />
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`sp-dot${active === id ? " active" : ""}`}
              onClick={() => scrollTo(id)}
              title={label}
            />
          ))}
        </div>
      </div>
    </>
  );
}
