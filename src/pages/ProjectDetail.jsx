import { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import projects from "../data/projects";
import ErrorPage from "./ErrorPage";
import DefaultProjectPage from "./projects/DefaultProjectPage";
import customProjectPages from "./projects/customProjectPages";
import "./projects/ProjectRoute.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) return <ErrorPage project />;
  const Page = customProjectPages[slug] ?? DefaultProjectPage;

  // App owns the navbar/footer. Each page supplies its own single <main>.
  // The key resets local gallery/model state when changing projects.
  return (
    <div className="project-route">
      <Suspense key={slug} fallback={<main className="project-page-loading" role="status">Loading project…</main>}>
        <Page project={project} />
      </Suspense>
    </div>
  );
}
