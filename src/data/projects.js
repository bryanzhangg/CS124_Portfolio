// Add photo files to public/assets/projects/, then list them in gallery:
// Use plain paths: ["/assets/projects/photo.png"], or objects for captions and alt text:
// { src: "/assets/projects/photo.png", alt: "Photo description", caption: "Optional caption" }
// image is the header; an empty gallery displays the header image as a fallback.
const projects = [
  {
    slug: "project-a220",
    title: "CAD Airbus A220-300",
    caption: "Airbus A220-300 fully modeled in Siemens NX.",
    image: "/assets/projects/project-a220.png",
    gallery: ["/assets/projects/project-a220.png", "/assets/projects/a220_render_1.png", "/assets/projects/a220_render_2.png"],
    description: "I created a 1:1 dimensioned 3D model of the Airbus A220-300 (with the SWISS livery) in Siemens NX. The entire assembly, which comprises of approximately six files, was constructed using NX Surface Modeling tools. All external features of the aircraft were fully modeled, and the entire N1 shaft of the turbofans can rotate. Some dimensions for this project were pulled directly from public Airbus resources, whilst others were reconstructed from template raster images and software tools like Kinovea. The airfoils used on the A220 series are proprietary, but I found similar NACA airfoils and pulled them from databases. Then, I used Excel to extract their coordinates, scaled them to their true dimensions, and imported them into NX. Finally, decals were used to construct the aircraft's livery.", // TODO: full project description for detail page
    tags: ["Siemens NX", "Excel", "Design", "Research"], // TODO: ["Python", "React", ...]
    links: {}, // TODO: { github: "...", demo: "..." }
  },
  {
    slug: "project-avbay",
    title: "Roll-Controlled Rocket Avionics Bay",
    caption: "Designed the avionics bay that flew on LRI's Control Freak rocket.",
    image: "/assets/projects/project-avbay.png",
    gallery: [],
    description: "I owned the design of the battery bay, the battery constrainer, and the TeleMega PCB enclosure, while I significantly contributed to the design of other components on the avionics bay. The battery bay was designed to hold our batteries while providing easy accessibility for servicing and replacement. However, the relatively open designed allowed for vibrations, so a small ring, the battery constrainer, was added to the assembly. The TeleMega enclosure was also designed to provide adequate protection to the board while providing cooling channels, screw holes, and airflow for the onboard barometer. The entire structure was designed in Siemens NX to strict dimensioning and tolerance stackup standards. The components were manufactured through PLA 3D printing, stress testing each print and redesigning using the observed behavior. The components were assembled together using a combination of screws and epoxy/loctite. I soldered various jumper wires and cables together, then helped integrate the full avionics bay into our upper stage and nosecone.",
    tags: ["Siemens NX", "3D Printing", "Testing", "Soldering"],
    links: {github: "https://github.com/liquid-rocketry-illinois/HAL-1-HW.git"},
  },
  {
    slug: "project-habitual",
    title: "Habitual: Personal Wellness",
    caption: "Intelligent personal wellness app that uses AI and friends to keep your tasks accountable.",
    image: null,
    gallery: [],
    description: "Designed in Android Studio with Java and built using Gradle, Habitual is a simple, intuitive and functional app designed to keep you accountable. It utilizes the Gemini API to automatically generate tasks based on your goals and verify completion of these tasks. Completing a task earns points, and all of these metrics are tracked through Firebase/Firestore. The app also has multiplayer capabilities, allowing you to join groups, compete with friends, and keep each other accountable.",
    tags: ["Java", "Android Studio", "Claude Code", "Google Gemini API", "Firebase", "Firestore"],
    links: {},
  },
  {
    slug: "project-wagerly",
    title: "Wagerly: Intelligent Prediction Markets",
    caption: "Sports betting platform using intelligent AI analysis to help users make better bets.",
    image: null,
    gallery: [],
    description: "Worked alongside a CS 124 Honors team to develop a new intelligent prediction market platform optimized for the NBA. Wagerly utilizes accurate, up-to-date datasets from Kaggle to pull all relevant data and utilizes the Gemini 2.5 Flash API to generate custom, context-aware AI line recommendations and statistical analysis.",
    tags: ["React", "Vite", "Typescript", "Figma", "Claude Code", "Gemini API", "Kaggle"],
    links: {github: "https://github.com/bryanzhangg/sp26-honorsproject.git"},
  },
];

export default projects;
