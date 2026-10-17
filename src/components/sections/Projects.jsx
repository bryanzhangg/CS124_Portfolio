import { useState } from "react";
import ProjectCard from "../ProjectCard";
import projects from "../../data/projects";


const CSS = `
  #projects {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 3rem 9rem 2.5rem;
    height: auto;
    overflow: visible;
  }

  /* ── Section inner (above stars) ─────────────── */
  .projects-inner {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: visible;
  }

  /* ── Section header ───────────────────────────── */
  .projects-eyebrow {
    display: block;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #484848;
    margin-bottom: 0.5rem;
  }

  .projects-label {
    flex-shrink: 0;
    font-size: clamp(2.2rem, 4.5vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
    color: #e0d8cc;
  }

  .projects-divider {
    height: 1px;
    background: #1c1c1c;
    border: none;
    margin: 1rem 0 1.2rem;
  }

  /* ── 2×2 grid ─────────────────────────────────── */
  .projects-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    overflow: visible;
  }

  /* Half-width cards; center an unpaired final card without resizing it. */
  .projects-grid > .project-card {
    grid-column: span 2;
    min-width: 0;
  }

  .projects-grid > .project-card:last-child:nth-child(odd) {
    grid-column: 2 / span 2;
  }

  /* ── Card ─────────────────────────────────────── */
  .project-card {
    position: relative;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    background: #0d0d0d;
    border: 1px solid #1a1a1a;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .project-card:hover {
    border-color: #444;
    box-shadow: 0 0 0 1px #383838, 0 0 40px rgba(255,255,255,0.11);
  }

  .project-card-image {
    flex: 0 0 auto;
    aspect-ratio: 16 / 9;
    position: relative;
    background: #111; /* placeholder until image is set */
    overflow: hidden;
  }

  .project-card-image img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .project-card-body {
    flex-shrink: 0;
    padding: 0.75rem 1rem;
    border-top: 1px solid #1c1c1c;
  }

  .project-card-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #e0d8cc;
    margin: 0 0 0.35rem;
    letter-spacing: -0.02em;
  }

  .pc-br {
    position: absolute;
    width: 14px;
    height: 14px;
    border-style: solid;
    border-color: #484848;
    z-index: 2;
    pointer-events: none;
    transition: border-color 0.3s ease;
  }
  .pc-br-tl { top: 0; left: 0; border-width: 1.5px 0 0 1.5px; }
  .pc-br-tr { top: 0; right: 0; border-width: 1.5px 1.5px 0 0; }
  .pc-br-bl { bottom: 0; left: 0; border-width: 0 0 1.5px 1.5px; }
  .pc-br-br { bottom: 0; right: 0; border-width: 0 1.5px 1.5px 0; }

  .project-card:hover .pc-br { border-color: #707070; }

  /* ── Image placeholder ────────────────────────── */
  .project-card-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project-card-placeholder-inner {
    position: relative;
    padding: 0.5rem 0.9rem;
  }

  .ph-br {
    position: absolute;
    width: 8px;
    height: 8px;
    border-style: solid;
    border-color: #2e2e2e;
  }
  .ph-br-tl { top: 0; left: 0;  border-width: 1px 0 0 1px; }
  .ph-br-tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  .ph-br-bl { bottom: 0; left: 0;  border-width: 0 0 1px 1px; }
  .ph-br-br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }

  .project-card-placeholder-text {
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-size: 0.78rem;
    letter-spacing: 0.2em;
    color: #383838;
    text-transform: uppercase;
    user-select: none;
  }

  .project-card-caption {
    font-size: 0.68rem;
    font-weight: 500;
    color: #7b7878;
    margin: 0;
    letter-spacing: 0.1em;
  }

  .projects-more {
    align-self: center;
    margin-top: 1.75rem;
    padding: 0.8rem 1.4rem;
    background: #0d0d0d;
    border: 1px solid #484848;
    color: #e0d8cc;
    font: inherit;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .projects-more:hover { border-color: #a19d96; background: #161616; }
  .projects-more:focus-visible { outline: 2px solid #e0d8cc; outline-offset: 4px; }

  @media (prefers-reduced-motion: reduce) {
    .projects-more { transition: none; }
  }

  @media (max-width: 768px) {
    #projects {
      padding: 2.5rem 1.5rem;
      height: auto;
      overflow: visible;
    }
    .projects-inner {
      overflow: visible;
    }
    .projects-grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      overflow: visible;
      gap: 1.5rem;
    }
    .projects-grid > .project-card,
    .projects-grid > .project-card:last-child:nth-child(odd) {
      grid-column: 1;
    }
    .project-card-image {
      flex: 0 0 auto;
      aspect-ratio: 16 / 9;
    }
  }
`;

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  const visibleProjects = expanded ? projects : projects.slice(0, 4);

  return (
    <>
      <style>{CSS}</style>
      <section id="projects">
        <div className="projects-inner">
          <span className="projects-eyebrow">Selected Work</span>
          {/* TODO: update label text if desired */}
          <p className="projects-label">Projects</p>
          <hr className="projects-divider" />

          <div className="projects-grid" id="projects-grid">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          {projects.length > 4 && (
            <button
              className="projects-more"
              aria-expanded={expanded}
              aria-controls="projects-grid"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "View less" : "View more"}
            </button>
          )}
        </div>

      </section>
    </>
  );
}
