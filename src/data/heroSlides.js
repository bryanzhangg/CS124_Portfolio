// The intro board is always the first slide. Add media here in playback order.
// Put files in public/assets/hero/ (or reuse existing project assets).
// Video example:
// { id: "hardware-video", type: "video", src: "/assets/hero/hardware.mp4",
//   poster: "/assets/hero/hardware-poster.jpg", label: "Hardware in action", duration: 10000 }
// Optional text per slide: eyebrow, heading, description.
// fontFamily applies to the heading and description; use a web-safe font or load a custom font first.
// label names the navigation dot. Set showText: false to hide the slide's text entirely.
const heroSlides = [
  {
    id: "airbus",
    type: "image",
    src: "/assets/projects/project-a220.png",
    label: "Airbus A220 design",
    eyebrow: "Design / CAD",
    heading: "Airbus A220-300",
    description: "Surface modeling in Siemens NX.",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    duration: 7000,
  },
  {
    id: "avionics",
    type: "image",
    src: "/assets/projects/project-avbay.png",
    label: "Rocket avionics",
    eyebrow: "Engineering / Avionics",
    heading: "Built for flight.",
    description: "Designing and testing rocket avionics hardware.",
    fontFamily: "'Inter', Arial, sans-serif",
    duration: 7000,
  },
];

export default heroSlides;
