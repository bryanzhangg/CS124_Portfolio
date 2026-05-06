import ProjectCard from "../ProjectCard";
import projects from "../../data/projects";
import ShootingStars from "../ShootingStars";


const CSS = `
  #projects {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 3rem 8rem 2.5rem;
  }

  /* ── Section inner (above stars) ─────────────── */
  .projects-inner {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* ── Section header ───────────────────────────── */
  .projects-eyebrow {
    display: block;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .projects-label {
    flex-shrink: 0;
    font-size: clamp(2.2rem, 4.5vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
    background: linear-gradient(to right, #666 0%, #2a2a2a 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
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
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
    overflow: hidden;
  }

  /* ── Card ─────────────────────────────────────── */
  .project-card {
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
    flex: 1;
    background: #111; /* placeholder until image is set */
    overflow: hidden;
  }

  .project-card-image img {
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

  .project-card-caption {
    font-size: 0.68rem;
    font-weight: 500;
    color: #7b7878;
    margin: 0;
    letter-spacing: 0.1em;
  }
`;

export default function Projects() {
  return (
    <>
      <style>{CSS}</style>
      <section id="projects">
        <ShootingStars />
        <div className="projects-inner">
          <span className="projects-eyebrow">Selected Work</span>
          {/* TODO: update label text if desired */}
          <p className="projects-label">Projects</p>
          <hr className="projects-divider" />

          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

      </section>
    </>
  );
}
