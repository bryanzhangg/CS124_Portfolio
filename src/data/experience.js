// Replace these starter entries with your experience, newest first.
// Add or remove entries freely; the timeline grows with the content.
// Put logo files in public/assets/experience/ and set logo to "/assets/experience/filename.png".
// Leave logo empty to show the bordered square without an image.
const experience = [
  {
    id: "incoming-experience",
    period: "May 2027 — Aug. 2027",
    role: "Incoming Firmware Engineering Intern",
    organization: "Milwaukee Tool",
    logo: "/assets/experience/milwaukeetool-com-logo.png",
  },
  {
    id: "experience-1",
    period: "Aug. 2026 — Present",
    role: "Circuit Design and Software Engineer",
    organization: "Illini Electric Motorsports",
    logo: "/assets/experience/iem_logo_polychrome.png",
    description: "Creating schematics, laying out PCBs, and writing embedded drivers with Dash Circuits, R&D, and Software.",
    highlights: ["Led trade study between ten custom dash displays, prioritizing selection based on MIPI DSI, Linux compute-node compatibility, and backlight power consumption", "Building embedded driver for TIC10024-Q1 MSDI, allowing pull-up/pull-down and threshold voltage configuration"],
    tags: ["Altium Designer", "WSL/Linux", "STM32", "RTOS"],
  },
  {
    id: "experience-2",
    period: "Aug. 2025 — Aug. 2026",
    role: "Airframe Avionics Engineer",
    organization: "Liquid Rocketry at Illinois",
    logo: "/assets/experience/LRI_transparent.avif",
    description: "Contributed end-to-end to the avionics and controls  of our first active roll-controlled rocket, Control Freak.",
    highlights: ["Co-developed an embedded driver for a Triple Modular Redundant BMP390 barometer architecture through SPI and STM32", "Designed the avionics bay, owning the battery bay, constrainer, and TeleMega enclosure. Flight validated to 9g axial acceleration"],
    tags: ["KiCAD", "Siemens NX", "STM32", "CLion", "Soldering"],
  },
  {
    id: "experience-3",
    period: "Feb. 2026 — Present",
    role: "Technical Consultant",
    organization: "CUBE Consulting",
    logo: "/assets/experience/cubelogo.jpg",
    description: "Working with tech startups on product development and growth.",
    highlights: ["Built an end-to-end LLM pipeline for a Sequoia-backed startup", "Facilitating growth and QA for a YC P25 startup"],
    tags: ["FastAPI", "Gemini API", "REST API"]
  }
];

export default experience;
