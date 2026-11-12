import "./ExpandableContent.css";

export default function ExpandableContent({ expanded, id, className = "", children }) {
  return (
    <div
      id={id}
      className={`expandable-content${expanded ? " is-expanded" : ""} ${className}`}
      aria-hidden={!expanded}
      inert={!expanded}
    >
      <div className="expandable-content-inner">{children}</div>
    </div>
  );
}
