import { useState } from "react";
import experience from "../../data/experience";
import "./Experience.css";

export default function Experience() {
  const [expanded, setExpanded] = useState(false);
  const visibleExperience = expanded ? experience : experience.slice(0, 3);

  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <div className="experience-header">
        <span className="experience-eyebrow">Professional Profile</span>
        <h2 id="experience-title">Experience</h2>
      </div>

      <ol className="experience-timeline" id="experience-timeline">
        {visibleExperience.map(({ id, period, role, organization, logo, description, highlights = [], tags = [] }, index) => (
          <li key={id} className="experience-entry">
            <div className="experience-date">
              <span className="experience-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span>{period}</span>
            </div>
            <span className="experience-node" aria-hidden="true">
              {logo && <img src={logo} alt="" loading="lazy" />}
            </span>
            <article className="experience-card">
              <span className="experience-organization">{organization}</span>
              <h3>{role}</h3>
              {description && <p className="experience-description">{description}</p>}
              {highlights.length > 0 && (
                <ul className="experience-highlights">
                  {highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
                </ul>
              )}
              {tags.length > 0 && (
                <ul className="experience-tags" aria-label="Skills and tools">
                  {tags.map((tag, i) => <li key={i}>{tag}</li>)}
                </ul>
              )}
            </article>
          </li>
        ))}
        {!expanded && experience.length > 3 && (
          <li className="experience-expand-entry">
            <button
              className="experience-expand"
              aria-label="View all experiences"
              aria-expanded={expanded}
              aria-controls="experience-timeline"
              onClick={() => setExpanded(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 4v16m-6-6 6 6 6-6" />
              </svg>
            </button>
          </li>
        )}
      </ol>
    </section>
  );
}
