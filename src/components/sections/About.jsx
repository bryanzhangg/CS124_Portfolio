import { useEffect, useRef } from "react";
import ShootingStars from "../ShootingStars";

const CSS = `
  .about-section {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    padding: 4rem 8rem;
    will-change: opacity, transform;
  }

  /* Board shadow bleeds down onto the About section */
  .about-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
    pointer-events: none;
    z-index: 0;
  }

  .about-inner {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: stretch;
    gap: 6rem;
    width: 100%;
  }

  /* ── Left: text ───────────────────────────────── */
  .about-text-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.4rem;
    min-width: 0;
  }

  .about-eyebrow {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #333;
  }

  .about-heading {
    /* TODO: fill in name / tagline text */
    font-size: clamp(2.4rem, 4.5vw, 4.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #f0ece4;
    margin: 0;
    line-height: 1.05;
  }

  .about-sub {
    /* TODO: fill in role / one-liner */
    font-size: clamp(0.75rem, 1.2vw, 0.9rem);
    font-weight: 500;
    color: #444;
    margin: 0;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .about-divider {
    height: 1px;
    background: #1c1c1c;
    border: none;
    margin: 0.3rem 0;
  }

  .about-bio {
    /* TODO: fill in bio paragraph(s) */
    font-size: clamp(0.88rem, 1.3vw, 1rem);
    line-height: 1.8;
    color: #777;
    margin: 0;
  }

  .about-tags {
    /* TODO: fill in keyword tags (languages, interests, etc.) */
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .about-tag {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.3rem 0.75rem;
    border: 1px solid #1e1e1e;
    color: #444;
  }

  /* ── Right: photo ─────────────────────────────── */
  .about-photo-col {
    flex: 0 0 clamp(220px, 36%, 540px);
    display: flex;
    flex-direction: column;
  }

  .about-photo-frame {
    flex: 1;
    background: #111; /* placeholder bg until image is dropped in */
    overflow: hidden;
  }

  /* TODO: replace with <img src="..." alt="Bryan Zhang" /> */
  .about-photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function update() {
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (window.scrollY - vh * 0.70) / (vh * 0.25)));
      el.style.opacity = p;
      el.style.transform = `translateY(${Math.round(28 * (1 - p))}px)`;
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <section id="about" className="about-section" ref={ref}>
        <ShootingStars />
        <div className="about-inner">

          {/* ── Left: text ───────────────────────────── */}
          <div className="about-text-col">
            <span className="about-eyebrow">About</span>

            {/* TODO: your name or a short headline */}
            <h2 className="about-heading">Bryan Zhang</h2>

            {/* TODO: role or one-liner (e.g. "Aerospace Engineering · CS @ UIUC") */}
            <p className="about-sub">AEROSPACE ENGINEER / CONSULTANT / BUILDER</p>

            <hr className="about-divider" />

            {/* TODO: 2–4 sentence bio */}
            <p className="about-bio">Hi, I'm Bryan! I'm a freshman at the University of Illinois Urbana-Champaign studying Aerospace Engineering with a minor in Computer Science. 
              I hope to combine engineering, software, and business to build products that are both cool and impactful. 
              Namely, I'm particularly passionate about autonomy, advanced air mobility, and sustainable aviation.</p>
            
            <p className="about-bio">On campus, I build and test avionics equipment for an active roll-controlled rocket with Liquid Rocketry. 
              I've also worked extensively with a Sequoia-backed startup to help them build an LLM data extraction and formatting pipeline as part of CUBE Consulting.
            </p>

            {/* TODO: keyword tags — languages, tools, interests */}
            <div className="about-tags">
              <span className="about-tag">CAD</span>
              <span className="about-tag">PROGRAMMING</span>
              <span className="about-tag">AI</span>
              <span className="about-tag">CONSULTING</span>
            </div>
          </div>

          {/* ── Right: photo ─────────────────────────── */}
          <div className="about-photo-col">
            <div className="about-photo-frame">
              {/* TODO: <img src="/assets/photo.jpg" alt="Bryan Zhang" /> */}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
