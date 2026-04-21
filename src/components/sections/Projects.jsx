import ProjectCard from "../ProjectCard";
import projects from "../../data/projects";

export default function Projects() {
  return (
    <section id="projects">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  );
}
