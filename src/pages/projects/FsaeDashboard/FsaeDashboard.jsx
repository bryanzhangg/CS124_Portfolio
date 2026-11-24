import DefaultProjectPage from "../DefaultProjectPage";
import "./FsaeDashboard.css";

export default function FsaeDashboard({ project }) {
  // This registered custom page deliberately preserves the existing appearance.
  // Replace DefaultProjectPage with <main className="fsae-dashboard-page"> when
  // building the custom story; keep metadata in the supplied project prop.
  // App already renders the navbar/footer. Include a back link to /#projects.
  //
  // TODO: Add sections for the system overview, engineering decisions and results.
  // TODO: Add an optimized GLB PCB viewer, loaded only when needed. Keep a static
  // image fallback for loading/WebGL failures and avoid capturing mobile scrolling.
  // TODO: Add keyboard-accessible hotspot buttons with readable detail panels;
  // make the same information available without interacting with the 3D model.
  // TODO: Respect reduced motion in any scroll-driven or animated scenes.
  return <DefaultProjectPage project={project} />;
}
