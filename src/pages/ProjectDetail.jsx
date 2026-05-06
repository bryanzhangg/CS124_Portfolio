import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";

const CSS = `
  .detail-page {
    min-height: 100dvh;
    background: #000;
    box-sizing: border-box;
    padding: 6rem 2rem 4rem;
  }

  .detail-inner {
    max-width: 860px;
    margin: 0 auto;
  }

  .detail-back {
    display: inline-block;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: #444;
    text-decoration: none;
    text-transform: uppercase;
    margin-bottom: 3rem;
    transition: color 0.15s;
  }

  .detail-back:hover { color: #888; }

  /* ── Hero image ───────────────────────────────── */
  .detail-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #111; /* placeholder until image is set */
    overflow: hidden;
    margin-bottom: 2.5rem;
  }

  /* TODO: replace with <img src={project.image} alt={project.title} /> */
  .detail-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ── Text content ─────────────────────────────── */
  .detail-title {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #f0ece4;
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .detail-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 2rem;
  }

  .detail-tag {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    padding: 0.3rem 0.7rem;
    border: 1px solid #222;
    color: #555;
  }

  .detail-description {
    /* TODO: fill in project description */
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: clamp(0.9rem, 1.4vw, 1rem);
    line-height: 1.8;
    color: #aaa;
    width: 100%;
  }

  /* ── Links ────────────────────────────────────── */
  .detail-links {
    display: flex;
    gap: 1rem;
    margin-top: 2.5rem;
  }

  .detail-link {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    color: #888;
    border: 1px solid #222;
    padding: 0.5rem 1.1rem;
    transition: color 0.15s, border-color 0.15s;
  }

  .detail-link:hover {
    color: #ccc;
    border-color: #444;
  }
`;

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <style>{CSS}</style>
        <main className="detail-page">
          <div className="detail-inner">
            <Link to="/#projects" className="detail-back">← Back to projects</Link>
            <p style={{ color: "#444" }}>Project not found.</p>
          </div>
        </main>
      </>
    );
  }

  const { title, image, description, tags = [], links = {} } = project;

  return (
    <>
      <style>{CSS}</style>
      <main className="detail-page">
        <div className="detail-inner">

          <Link to="/#projects" className="detail-back">← Back to projects</Link>

          {/* TODO: swap placeholder for <img src={image} alt={title} /> once image is ready */}
          <div className="detail-image">
            {image && <img src={image} alt={title} />}
          </div>

          {/* TODO: fill in project title (pulled from projects.js) */}
          <h1 className="detail-title">{title}</h1>

          {/* TODO: fill in tags array in projects.js */}
          {tags.length > 0 && (
            <div className="detail-tags">
              {tags.map((tag) => (
                <span key={tag} className="detail-tag">{tag}</span>
              ))}
            </div>
          )}

          {/* TODO: fill in description field in projects.js */}
          <p className="detail-description">
            {description ?? "Project description coming soon."}
          </p>

          {/* TODO: fill in links object in projects.js — { github: "...", demo: "..." } */}
          {Object.keys(links).length > 0 && (
            <div className="detail-links">
              {links.github && (
                <a href={links.github} className="detail-link" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {links.demo && (
                <a href={links.demo} className="detail-link" target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          )}

        </div>
      </main>
    </>
  );
}
