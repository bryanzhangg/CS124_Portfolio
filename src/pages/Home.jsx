import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import SectionProgress from "../components/SectionProgress";

export default function Home() {
  const { hash, key } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    const navHeight = document.querySelector(".site-nav")?.getBoundingClientRect().height ?? 0;
    window.scrollTo({
      top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight),
      behavior: "instant",
    });
  }, [hash, key]);

  return (
    <main>
      <SectionProgress />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
