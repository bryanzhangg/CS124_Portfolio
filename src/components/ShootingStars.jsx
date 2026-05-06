// Each star has an angle (CSS clockwise degrees from east) that drives both
// the element's rotation and its translation vector, so the tail always
// points opposite to the direction of travel.
//
// tx = distance * cos(angle), ty = distance * sin(angle)
// (valid in screen-space where y-down matches CSS rotate clockwise)

const STARS = [
  { top: "10%", left: "78%", delay: "0s",   dur: "3.2s", w: 90  },
  { top: "15%", left: "20%", delay: "1.7s", dur: "2.8s", w: 68  },
  { top: "70%", left: "60%", delay: "3.9s", dur: "4.1s", w: 104 },
  { top: "20%", left: "85%", delay: "0.6s", dur: "2.5s", w: 62  },
  { top: "45%", left: "30%", delay: "2.5s", dur: "3.7s", w: 82  },
  { top: "80%", left: "15%", delay: "5.3s", dur: "3.0s", w: 76  },
  { top: "55%", left: "70%", delay: "1.2s", dur: "4.6s", w: 58  },
  { top: "35%", left: "50%", delay: "4.1s", dur: "3.3s", w: 86  },
];

const CSS = `
  @keyframes star-move {
    0%   { transform: translate(0, 0);                         opacity: 0; }
    12%  { opacity: 0.8; }
    78%  { opacity: 0.8; }
    100% { transform: translate(-480px, 240px);                opacity: 0; }
  }

  .stars-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .star-mover {
    position: absolute;
    animation: star-move linear infinite;
  }

  .shooting-star {
    height: 2px;
    border-radius: 100px;
    /* right end = leading edge (direction of travel), left end = fading tail */
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.65));
    transform: rotate(153deg);
  }
`;

export default function ShootingStars() {
  return (
    <>
      <style>{CSS}</style>
      <div className="stars-bg" aria-hidden="true">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="star-mover"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          >
            <div className="shooting-star" style={{ width: s.w + "px" }} />
          </div>
        ))}
      </div>
    </>
  );
}
