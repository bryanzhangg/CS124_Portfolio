import { useLayoutEffect, useRef } from "react";
import "./Home.css";
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
  const revealRef = useRef(null);

  useLayoutEffect(() => {
    const reveal = revealRef.current;
    const hero = reveal.querySelector("#hero");
    let frame = 0;

    function update() {
      frame = 0;
      // Cancel About's normal movement until the board has cleared it.
      const remaining = Math.max(0, hero.getBoundingClientRect().bottom);
      reveal.style.setProperty("--about-offset", `${-remaining}px`);
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(hero);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

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
      <div className="hero-about-reveal" ref={revealRef}>
        <Hero />
        {/* Keep the navigation anchor in normal flow while its surface moves. */}
        <div id="about">
          <About />
        </div>
      </div>
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
