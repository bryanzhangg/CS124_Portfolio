import "./ErrorPage.css";

export default function ErrorPage({ unexpected = false, project = false }) {
  return (
    <main className="error-page">
      <div className="error-content">
        <span className="error-eyebrow">{unexpected ? "Something went wrong" : "404 / Not found"}</span>
        <h1>{unexpected ? "A brief interruption." : project ? "Project not found." : "Off the flight path."}</h1>
        <p>{unexpected
          ? "The page couldn’t be displayed. Reload to try again, or return home."
          : project
            ? "This project may have moved, or the link may be incorrect."
            : "The page you’re looking for doesn’t exist. Let’s get you back home."}</p>
        <div className="error-actions">
          <a href={project ? "/#projects" : "/"}>{project ? "Back to projects" : "Back to home"}</a>
          {unexpected && <button onClick={() => window.location.reload()}>Reload page</button>}
        </div>
      </div>
    </main>
  );
}
