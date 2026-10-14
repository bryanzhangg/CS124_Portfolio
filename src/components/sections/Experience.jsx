import experience from "../../data/experience";
import "./Experience.css";

export default function Experience() {
  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <div className="experience-header">
        <span className="experience-eyebrow">The path so far</span>
        <h2 id="experience-title">Experience</h2>
      </div>

      <ol className="experience-timeline">
        {experience.map(({ id, period, role, organization, description, highlights = [], tags = [] }, index) => (
          <li key={id} className="experience-entry">
            <div className="experience-date">
              <span className="experience-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span>{period}</span>
            </div>
            <span className="experience-node" aria-hidden="true" />
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
      </ol>
    </section>
  );
}
