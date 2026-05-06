import { useEffect, useRef, useState } from "react";
import ShootingStars from "../ShootingStars";

const CATEGORIES = [
  {
    label: "Languages",
    skills: ["Python", "Java", "C / C++", "JavaScript", "HTML / CSS", "Arduino"],
  },
  {
    label: "Tools",
    skills: ["Siemens NX", "Git", "KiCAD", "React", "Firebase", "Android Studio", "Gemini API"],
  },
  {
    label: "Interests",
    skills: ["Aerospace", "Autonomy", "AI / ML", "Adv. Air Mobility", "Consulting"],
  },
];

const CSS = `
  #skills {
    display: flex;
    flex-direction: column;
    padding: 3rem 8rem;
  }

  /* ── Scan line (plays once on entry) ─────────── */
  @keyframes scan-down {
    0%   { top: 0;    opacity: 0.7; }
    90%  { opacity: 0.7; }
    100% { top: 100%; opacity: 0; }
  }

  .scan-line {
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent);
    animation: scan-down 1.8s linear forwards;
    pointer-events: none;
    z-index: 5;
  }

  /* ── Section header (matches Projects) ───────── */
  .skills-eyebrow {
    display: block;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .skills-label {
    font-size: clamp(2.2rem, 4.5vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
    background: linear-gradient(to right, #666 0%, #2a2a2a 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .skills-divider {
    height: 1px;
    background: #1c1c1c;
    border: none;
    margin: 1rem 0 1.2rem;
  }

  /* ── HUD inner wrapper ────────────────────────── */
  .hud-inner {
    flex: 1;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    overflow: hidden;
  }

  /* ── Status bar ───────────────────────────────── */
  .hud-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    color: #484848;
    text-transform: uppercase;
  }

  .hud-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #3a6b3a;
    box-shadow: 0 0 6px rgba(80,180,80,0.35);
    margin-right: 0.6rem;
    vertical-align: middle;
  }

  .hud-divider {
    height: 1px;
    background: #1e1e1e;
    border: none;
    margin: 0;
  }

  /* ── Category columns ─────────────────────────── */
  .hud-grid {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .hud-category {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 3rem;
    border-right: 1px solid #1e1e1e;
  }

  .hud-category:first-child { padding-left: 0; }
  .hud-category:last-child  { border-right: none; padding-right: 0; }

  .hud-category-label {
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-size: 0.88rem;
    letter-spacing: 0.28em;
    color: #505050;
    text-transform: uppercase;
    flex-shrink: 0;
    margin-bottom: 1rem;
  }

  .hud-skills-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* ── Skill target ─────────────────────────────── */
  .skill-target {
    position: relative;
    display: inline-block;
    padding: 0.45rem 0.7rem;
    cursor: default;
  }

  /* Bracket corners — shared */
  .bracket {
    position: absolute;
    width: 8px;
    height: 8px;
    border-style: solid;
    border-color: transparent;
    opacity: 0;
    transition:
      top    0.28s ease,
      left   0.28s ease,
      right  0.28s ease,
      bottom 0.28s ease,
      border-color 0.28s ease,
      opacity      0.28s ease;
  }

  /* Default (unlocked) positions — pushed outward */
  .bracket-tl { top: -8px; left: -8px; border-width: 1px 0 0 1px; }
  .bracket-tr { top: -8px; right: -8px; border-width: 1px 1px 0 0; }
  .bracket-bl { bottom: -8px; left: -8px; border-width: 0 0 1px 1px; }
  .bracket-br { bottom: -8px; right: -8px; border-width: 0 1px 1px 0; }

  /* Locked — brackets close in to edges */
  .skill-target.locked .bracket-tl { top: 0; left: 0; border-color: #505050; opacity: 1; }
  .skill-target.locked .bracket-tr { top: 0; right: 0; border-color: #505050; opacity: 1; }
  .skill-target.locked .bracket-bl { bottom: 0; left: 0; border-color: #505050; opacity: 1; }
  .skill-target.locked .bracket-br { bottom: 0; right: 0; border-color: #505050; opacity: 1; }

  /* Hover — brighten brackets and name */
  .skill-target.locked:hover .bracket { border-color: #888; }

  /* Skill name */
  .skill-name {
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #c8c2b8;
    opacity: 0;
    transition: opacity 0.2s ease 0.22s, color 0.15s ease;
  }

  .skill-target.locked .skill-name { opacity: 1; }
  .skill-target.locked:hover .skill-name { color: #f0e8d0; }
`;

function SkillTarget({ name, delay, visible }) {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setLocked(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);

  function onMouseEnter() {
    setLocked(false);
    setTimeout(() => setLocked(true), 30);
  }

  return (
    <div
      className={`skill-target${locked ? " locked" : ""}`}
      onMouseEnter={onMouseEnter}
    >
      <span className="bracket bracket-tl" />
      <span className="bracket bracket-tr" />
      <span className="bracket bracket-bl" />
      <span className="bracket bracket-br" />
      <span className="skill-name">{name}</span>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScanning(true);
          setTimeout(() => setVisible(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <section id="skills" ref={ref}>
        <ShootingStars />
        {scanning && <div className="scan-line" />}

        <span className="skills-eyebrow">Technical Profile</span>
        <p className="skills-label">Skills</p>
        <hr className="skills-divider" />

        <div className="hud-inner">

          <div className="hud-status">
            <span>
              <span className="hud-dot" />
              Status: Systems Online
            </span>
            <span>Skills Matrix</span>
          </div>

          <hr className="hud-divider" />

          <div className="hud-grid">
            {CATEGORIES.map(({ label, skills }, catIdx) => (
              <div key={label} className="hud-category">
                <div className="hud-category-label">// {label}</div>
                <div className="hud-skills-list">
                  {skills.map((skill, skillIdx) => (
                    <SkillTarget
                      key={skill}
                      name={skill}
                      delay={catIdx * 80 + skillIdx * 110 + 200}
                      visible={visible}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
