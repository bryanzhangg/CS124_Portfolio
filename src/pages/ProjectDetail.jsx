import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main>
        <Link to="/">Back home</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/#projects">Back to projects</Link>
    </main>
  );
}
