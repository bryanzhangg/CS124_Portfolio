import { useEffect, useRef, useState } from "react";
import heroSlides from "../data/heroSlides";
import "./HeroSlideshow.css";

const slides = [{ id: "intro", type: "intro", label: "Introduction", duration: 7000 }, ...heroSlides];

export default function HeroSlideshow({ children, introDuration = 2300 }) {
  const stage = useRef(null);
  const videos = useRef({});
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [ready, setReady] = useState({ intro: true });
  const [failed, setFailed] = useState({});
  const [introDone, setIntroDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [saveData] = useState(() => Boolean(navigator.connection?.saveData));

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    preference.addEventListener("change", update);
    const timer = setTimeout(() => setIntroDone(true), introDuration);
    return () => { clearTimeout(timer); preference.removeEventListener("change", update); };
  }, [introDuration]);

  useEffect(() => {
    let inView = true;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(stage.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  function select(index) {
    if (previous !== null || index === current || !ready[slides[index].id] || failed[slides[index].id]) return;
    setPrevious(current);
    setCurrent(index);
  }

  function failSlide(id) {
    setFailed(value => ({ ...value, [id]: true }));
    if (slides[current].id === id) {
      setPrevious(null);
      setCurrent(0);
    }
  }

  useEffect(() => {
    if (!introDone || reduced || paused || !visible || previous !== null) return;
    const timer = setTimeout(() => {
      for (let step = 1; step < slides.length; step++) {
        const next = (current + step) % slides.length;
        if (ready[slides[next].id] && !failed[slides[next].id]) {
          setPrevious(current);
          setCurrent(next);
          break;
        }
      }
    }, current === 0 ? 1000 : slides[current].duration || 7000);
    return () => clearTimeout(timer);
  }, [current, previous, introDone, reduced, paused, visible, ready, failed]);

  useEffect(() => {
    Object.entries(videos.current).forEach(([id, video]) => {
      if (!video) return;
      if (id === slides[current].id && visible && !reduced && !paused) {
        video.play().catch(() => {
          setFailed(value => ({ ...value, [id]: true }));
          setCurrent(value => slides[value].id === id ? 0 : value);
        });
      } else {
        video.pause();
      }
    });
  }, [current, visible, reduced, paused, introDone]);

  return (
    <>
      <div className="hero-slideshow-stage" ref={stage} role="region" aria-label="Portfolio highlights" aria-roledescription="carousel">
        {slides.map((slide, index) => {
          const active = current === index;
          const outgoing = previous === index;
          return (
            <div
              key={slide.id}
              className={`hero-slide${slide.type === "intro" ? " is-intro" : ""}${active ? " is-active" : ""}${outgoing ? " is-previous" : ""}${active && previous !== null ? " is-wiping" : ""}`}
              aria-hidden={!active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
            >
              {slide.type === "intro" ? children : slide.type === "video" ? (
                introDone && !saveData && !reduced && <video
                  ref={node => { videos.current[slide.id] = node; }}
                  src={slide.src} poster={slide.poster} preload="auto" muted playsInline loop
                  onCanPlay={() => setReady(value => value[slide.id] ? value : ({ ...value, [slide.id]: true }))}
                  onError={() => failSlide(slide.id)}
                />
              ) : (
                <img src={slide.src} alt={slide.label} decoding="async"
                  onLoad={() => setReady(value => ({ ...value, [slide.id]: true }))}
                  onError={() => failSlide(slide.id)} />
              )}
              {slide.type !== "intro" && slide.showText !== false && (
                <div className="hero-slide-caption" style={{ "--slide-font": slide.fontFamily || "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  <div className="hero-slide-copy">
                    {slide.eyebrow && <span className="hero-slide-eyebrow">{slide.eyebrow}</span>}
                    <h2>{slide.heading || slide.label}</h2>
                    {slide.description && <p>{slide.description}</p>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
        {previous !== null && (
          <div className="hero-transition" aria-hidden="true" onAnimationEnd={event => {
            if (event.target === event.currentTarget) setPrevious(null);
          }}>
            <div className="hero-sweep"><div className="hero-sweep-dark" /><div className="hero-sweep-light" /></div>
          </div>
        )}
      <div className={`hero-slide-footer ${current === 0 ? "board-footer" : "hero-slide-footer-floating"}`}>
        <div className="hero-slide-progress" role="group" aria-label="Choose a hero slide">
          <i className="hero-progress-corner top-left" aria-hidden="true" />
          <i className="hero-progress-corner top-right" aria-hidden="true" />
          <i className="hero-progress-corner bottom-left" aria-hidden="true" />
          <i className="hero-progress-corner bottom-right" aria-hidden="true" />
          {slides.map((slide, index) => <button key={slide.id}
            className={`hero-slide-dot${index === current ? " active" : ""}`}
            aria-label={`Show ${slide.label}`} aria-current={index === current ? "true" : undefined}
            disabled={!ready[slide.id] || failed[slide.id]}
            onClick={() => select(index)} />)}
        </div>
      </div>
      <button className="hero-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} aria-pressed={paused}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M7 4v16l14-8z" /> : <path d="M6 4h4v16H6zm8 0h4v16h-4z" />}
        </svg>
      </button>
    </>
  );
}
