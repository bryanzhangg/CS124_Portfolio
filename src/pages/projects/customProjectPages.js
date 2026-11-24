import { lazy } from "react";

// Keys must match a slug in src/data/projects.js. Unlisted slugs use the default page.
// Declare lazy components outside render to keep their identity stable and keep
// custom page code out of the initial homepage bundle.
const customProjectPages = {
  "project-2027dash": lazy(() => import("./FsaeDashboard/FsaeDashboard")),
};

export default customProjectPages;
