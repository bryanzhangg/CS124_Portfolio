const projects = [
  {
    slug: "project-a220",
    title: "CAD Airbus A220-300",
    caption: "Airbus A220-300 fully modeled in Siemens NX.",
    image: "/assets/projects/project-a220.png",
    description: "I created a 1:1 dimensioned 3D model of the Airbus A220-300 (with the SWISS livery) in Siemens NX, mostly using surface modeling tools. To do so, I found publicly available dimensions, calculated some missing measurements, and utilized raster images and Airbus-provided blueprints to create an accurate scale. Airfoil coordinates were pulled from databases containing NACA profiles. Finally, decals were used to construct the aircraft's livery.", // TODO: full project description for detail page
    tags: ["Siemens NX", "Excel", "Design", "Research"], // TODO: ["Python", "React", ...]
    links: {}, // TODO: { github: "...", demo: "..." }
  },
  {
    slug: "project-avbay",
    title: "Roll-Controlled Rocket Avionics Bay",
    caption: "Designed and manufactured significant portions of the LRI Avionics Bay.",
    image: "/assets/projects/project-avbay.png",
    description: null,
    tags: ["Siemens NX", "3D Printing", "Soldering"],
    links: {},
  },
  {
    slug: "project-habitual",
    title: "Habitual: Personal Wellness",
    caption: "Intelligent personal wellness app that uses AI and friends to keep your tasks accountable.",
    image: null,
    description: null,
    tags: ["Java", "Android Studio", "Claude Code", "Google Gemini API", "Firebase", "Firestore"],
    links: {},
  },
  {
    slug: "project-four",
    title: "Project Four",
    caption: "Short one-line description of what this project does.",
    image: null,
    description: null,
    tags: [],
    links: {},
  },
];

export default projects;
