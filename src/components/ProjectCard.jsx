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
        {image
          ? <img src={image} alt={title} />
          : (
            <div className="project-card-placeholder">
              <div className="project-card-placeholder-inner">
                <span className="ph-br ph-br-tl" />
                <span className="ph-br ph-br-tr" />
                <span className="ph-br ph-br-bl" />
                <span className="ph-br ph-br-br" />
                <span className="project-card-placeholder-text">IMAGE COMING SOON</span>
              </div>
            </div>
          )
        }
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-caption">{caption}</p>
      </div>
    </Link>
  );
}
