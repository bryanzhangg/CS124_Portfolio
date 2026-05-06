import ShootingStars from "../ShootingStars";

// TODO: fill in your actual contact details
const TILES = [
  { label: "Email",    value: "bryanz4@illinois.edu",        href: "mailto:bryanz4@illinois.edu" },
  { label: "LinkedIn", value: "linkedin.com/in/bryanz4/", href: "https://linkedin.com/in/bryanz4/" },
  { label: "Phone",    value: "+1 (205) 215-6515",     href: "tel:+12052156515" },
];

const CSS = `
  #contact {
    height: 50dvh;
    display: flex;
    flex-direction: column;
    padding: 3rem 8rem 2.5rem;
  }

  /* ── Header (matches Projects / Skills) ───────── */
  .contact-eyebrow {
    display: block;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .contact-label {
    font-size: clamp(2.2rem, 4.5vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
    background: linear-gradient(to right, #666 0%, #2a2a2a 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .contact-divider {
    height: 1px;
    background: #1c1c1c;
    border: none;
    margin: 1rem 0 1.5rem;
  }

  /* ── Tile row ─────────────────────────────────── */
  .contact-tiles-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .contact-tiles {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    width: 100%;
  }

  .contact-tile {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    text-decoration: none;
  }

  /* Bracket corners */
  .ct-br {
    position: absolute;
    width: 10px;
    height: 10px;
    border-style: solid;
    border-color: #505050;
    transition: border-color 0.25s ease;
  }
  .ct-br-tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  .ct-br-tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  .ct-br-bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  .ct-br-br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }

  .contact-tile:hover .ct-br { border-color: #888; }

  /* Tile text */
  .contact-tile-label {
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    color: #505050;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .contact-tile-value {
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    color: #c8c2b8;
    text-transform: uppercase;
    transition: color 0.2s ease;
  }

  .contact-tile:hover .contact-tile-label { color: #555; }
  .contact-tile:hover .contact-tile-value { color: #f0e8d0; }
`;

export default function Contact() {
  return (
    <>
      <style>{CSS}</style>
      <section id="contact">
        <ShootingStars />

        <span className="contact-eyebrow">Get In Touch</span>
        <p className="contact-label">Contact</p>
        <hr className="contact-divider" />

        <div className="contact-tiles-wrapper">
        <div className="contact-tiles">
          {TILES.map(({ label, value, href }) => (
            <a key={label} className="contact-tile" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <span className="ct-br ct-br-tl" />
              <span className="ct-br ct-br-tr" />
              <span className="ct-br ct-br-bl" />
              <span className="ct-br ct-br-br" />
              <span className="contact-tile-label">{label}</span>
              <span className="contact-tile-value">{value}</span>
            </a>
          ))}
        </div>
        </div>

      </section>
    </>
  );
}
