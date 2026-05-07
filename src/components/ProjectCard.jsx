import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const { slug, title, caption, image } = project;

  return (
    <Link to={`/projects/${slug}`} className="project-card">
      <span className="pc-br pc-br-tl" />
      <span className="pc-br pc-br-tr" />
      <span className="pc-br pc-br-bl" />
      <span className="pc-br pc-br-br" />
      <div className="project-card-image">
        {/* TODO: swap placeholder for <img src={image} alt={title} /> once image is ready */}
        {image && <img src={image} alt={title} />}
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-caption">{caption}</p>
      </div>
    </Link>
  );
}
