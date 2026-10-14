import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import ErrorPage from "./ErrorPage";
import "./ProjectDetail.css";

function Gallery({ photos, title }) {
  const track = useRef(null);
  if (!photos.length) return null;
  function move(direction) {
    const el = track.current;
    const left = el.getBoundingClientRect().left;
    const positions = Array.from(el.children, slide => slide.getBoundingClientRect().left - left + el.scrollLeft);
    const target = direction > 0
      ? positions.find(position => position > el.scrollLeft + 2) ?? el.scrollWidth - el.clientWidth
      : positions.findLast(position => position < el.scrollLeft - 2) ?? 0;
    el.scrollTo({ left: target, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  return (
    <div className="detail-gallery" role="region" aria-label={`${title} gallery`}>
      <div className="detail-gallery-heading">
        <div><span className="detail-eyebrow">A closer look</span><h2>Gallery</h2></div>
        {photos.length > 1 && <div className="detail-gallery-controls"><button onClick={() => move(-1)} aria-label="Previous photo">←</button><button onClick={() => move(1)} aria-label="Next photo">→</button></div>}
      </div>
      <div className="detail-gallery-track" ref={track} tabIndex={0} aria-label="Scroll through project photos">
        {photos.map((photo, index) => (
          <figure key={`${photo.src}-${index}`}>
            <div className="detail-gallery-image"><img src={photo.src} alt={photo.alt || `${title}, photo ${index + 1}`} loading="lazy" /></div>
            <figcaption><span>{String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>{photo.caption && <span>{photo.caption}</span>}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  if (!project) return <ErrorPage project />;
  const { title, image, description, tags = [], links = {}, gallery = [] } = project;
  const photos = gallery.length
    ? gallery.map((photo) => typeof photo === "string" ? { src: photo } : photo)
    : image ? [{ src: image, alt: title }] : [];
  return (
    <main className="detail-page">
      <header className="detail-hero">
        {image && <img className="detail-hero-image" src={image} alt={title} fetchPriority="high" />}
        <div className="detail-blur detail-blur-soft" aria-hidden="true" />
        <div className="detail-blur detail-blur-deep" aria-hidden="true" />
        <div className="detail-hero-shade" aria-hidden="true" />
        <Link to="/#projects" className="detail-back">← Back to projects</Link>
        <div className="detail-hero-title"><span className="detail-eyebrow">Selected work</span><h1>{title}</h1></div>
      </header>
      <div className="detail-content">
        {tags.length > 0 && <ul className="detail-tags" aria-label="Tools and skills">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
        <p className="detail-description">{description ?? "Project description coming soon."}</p>
        {(links.github || links.demo) && <div className="detail-links">
          {links.github && <a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
          {links.demo && <a href={links.demo} target="_blank" rel="noreferrer">Live demo ↗</a>}
        </div>}
      </div>
      <Gallery key={slug} photos={photos} title={title} />
    </main>
  );
}
