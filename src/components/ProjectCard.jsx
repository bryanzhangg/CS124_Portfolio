import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const { slug, title } = project;
  return (
    <div>
      <h3>{title}</h3>
      <Link to={`/projects/${slug}`}>View details</Link>
    </div>
  );
}
