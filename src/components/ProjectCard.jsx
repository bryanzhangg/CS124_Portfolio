import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const { slug, title, image } = project;

  return (
    <Link to={`/projects/${slug}`} className="project-card">
      <span className="pc-br pc-br-tl" />
      <span className="pc-br pc-br-tr" />
      <span className="pc-br pc-br-bl" />
      <span className="pc-br pc-br-br" />
      <div className="project-card-image">
        {image
          ? <img src={image} alt={title} />
          : (
            <div className="project-card-placeholder">
              <div className="project-card-placeholder-inner">
                <span className="ph-br ph-br-tl" />
                <span className="ph-br ph-br-tr" />
                <span className="ph-br ph-br-bl" />
                <span className="ph-br ph-br-br" />
                <span className="project-card-placeholder-text">NO IMAGE AVAILABLE</span>
              </div>
            </div>
          )
        }
        <div className="project-card-title-box">
          <span className="pc-br pc-br-tl" aria-hidden="true" />
          <span className="pc-br pc-br-tr" aria-hidden="true" />
          <span className="pc-br pc-br-bl" aria-hidden="true" />
          <span className="pc-br pc-br-br" aria-hidden="true" />
          <h3 className="project-card-title">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
