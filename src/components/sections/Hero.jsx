import { useState, useEffect, useRef } from "react";

const CYCLE_INTERVAL = 60;
const SPIN_COUNT     = 10;
const CHAR_STAGGER   = 80;
const CHAR_POOL      = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const TILE_GAP       = 3;
const ROW_GAP        = 8;

const BOARD_DATA = [
  { value: "BRYAN ZHANG",    rowDelay: 200,  rowOffset: 0, scrambleDelay: 1000 },
  { value: "AEROSPACE + CS", rowDelay: 600,  rowOffset: 2, scrambleDelay: 600  },
  { value: "@ UIUC",         rowDelay: 1000, rowOffset: 3, scrambleDelay: 200  },
];

function randomChar() {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
}

function SplitFlapChar({ targetChar, delay, scrambleDelay, flippedAway }) {
  const [displayChar, setDisplayChar] = useState(randomChar);
  const ticksRef = useRef(0);

  useEffect(() => {
    if (flippedAway) return;
    let timeoutId, intervalId;
    timeoutId = setTimeout(() => {
      ticksRef.current = 0;
      intervalId = setInterval(() => {
        ticksRef.current++;
        if (ticksRef.current >= SPIN_COUNT) {
          clearInterval(intervalId);
          setDisplayChar(targetChar);
        } else {
          setDisplayChar(randomChar());
        }
      }, CYCLE_INTERVAL);
    }, delay);
    return () => { clearTimeout(timeoutId); clearInterval(intervalId); };
  }, [targetChar, delay, flippedAway]);

  useEffect(() => {
    if (!flippedAway) return;
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => setDisplayChar(randomChar()), CYCLE_INTERVAL);
    }, scrambleDelay);
    return () => { clearTimeout(timeoutId); clearInterval(intervalId); };
  }, [flippedAway, scrambleDelay]);

  return <span className="flap-char">{displayChar}</span>;
}

function BlankTile() {
  return <span className="flap-char" />;
}

const CSS = `
  #hero {
    height: 100dvh;
    box-sizing: border-box;
    display: flex;
    background: #050505;
    padding-top: 48px;
  }

  .board-frame {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 8px solid #1e1e1e;
  }

  .board-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.9rem 1.5rem;
    flex-shrink: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: clamp(0.75rem, 1.6vw, 1rem);
    letter-spacing: 0.18em;
    color: #c8c2b8;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    background: linear-gradient(180deg, #0e0e0e 0%, #141414 100%);
    border-top: 8px solid #0a0a0a;
  }

  @keyframes bounce-down {
    0%, 100% { transform: translateY(0);   opacity: 1;   }
    50%       { transform: translateY(5px); opacity: 0.5; }
  }

  .scroll-arrow {
    display: inline-block;
    animation: bounce-down 1.4s ease-in-out infinite;
    font-size: 1.15em;
    line-height: 1;
  }

  .board-grid {
    flex: 1;
    overflow: hidden;
    display: grid;
    column-gap: ${TILE_GAP}px;
    row-gap: ${ROW_GAP}px;
    padding: ${TILE_GAP}px;
    box-sizing: border-box;
    position: relative;
    background: radial-gradient(ellipse at 50% 50%, #111 0%, #080808 75%);
  }

  .board-grid::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 3px,
      rgba(0,0,0,0.07) 3px,
      rgba(0,0,0,0.07) 4px
    );
    pointer-events: none;
    z-index: 2;
  }

  .flap-char {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: clamp(1rem, 4vw, 3.5rem);
    font-weight: 700;
    color: #ede9e3;
    background: linear-gradient(
      to bottom,
      #161616 0%,
      #131313 48%,
      #0b0b0b 50%,
      #121212 52%,
      #101010 100%
    );
  }

  .flap-probe {
    width: clamp(32px, 5.5vw, 88px);
    height: clamp(44px, 7.5vw, 120px);
    visibility: hidden;
    position: absolute;
    pointer-events: none;
  }
`;

export default function Hero() {
  const sectionRef = useRef(null);
  const gridRef    = useRef(null);
  const probeRef   = useRef(null);
  const [dims, setDims]               = useState({ cols: 0, rows: 0 });
  const [flippedAway, setFlippedAway] = useState(false);

  useEffect(() => {
    function measure() {
      const grid  = gridRef.current;
      const probe = probeRef.current;
      if (!grid || !probe) return;
      const gs     = window.getComputedStyle(grid);
      const availW = grid.clientWidth  - parseFloat(gs.paddingLeft) - parseFloat(gs.paddingRight);
      const availH = grid.clientHeight - parseFloat(gs.paddingTop)  - parseFloat(gs.paddingBottom);
      setDims({
        cols: Math.floor((availW + TILE_GAP) / (probe.offsetWidth  + TILE_GAP)),
        rows: Math.floor((availH + ROW_GAP)  / (probe.offsetHeight + ROW_GAP)),
      });
    }
    const t  = setTimeout(measure, 0);
    const ro = new ResizeObserver(measure);
    if (gridRef.current) ro.observe(gridRef.current);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    function onScroll() {
      if (!section) return;
      setFlippedAway(section.getBoundingClientRect().top < 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { cols, rows } = dims;

  const blockSize = BOARD_DATA[BOARD_DATA.length - 1].rowOffset + 1;
  const startRow  = Math.max(0, Math.floor((rows - blockSize) / 2));

  const textRowMap = {};
  BOARD_DATA.forEach((data) => { textRowMap[startRow + data.rowOffset] = data; });

  return (
    <section id="hero" ref={sectionRef}>
      <style>{CSS}</style>
      <div className="board-frame">

        <div
          className="board-grid"
          ref={gridRef}
          style={cols > 0 ? {
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows:    `repeat(${rows}, 1fr)`,
          } : undefined}
        >
          <span className="flap-char flap-probe" ref={probeRef}>M</span>
          {cols > 0 && rows > 0 && Array.from({ length: rows * cols }, (_, idx) => {
            const rowIdx   = Math.floor(idx / cols);
            const colIdx   = idx % cols;
            const textData = textRowMap[rowIdx];
            if (!textData || colIdx >= textData.value.length) return <BlankTile key={idx} />;
            const char = textData.value[colIdx];
            if (char === " ") return <BlankTile key={idx} />;
            return (
              <SplitFlapChar
                key={idx}
                targetChar={char}
                delay={textData.rowDelay + colIdx * CHAR_STAGGER}
                scrambleDelay={textData.scrambleDelay + colIdx * CHAR_STAGGER}
                flippedAway={flippedAway}
              />
            );
          })}
        </div>

        <div className="board-footer">
          <span>SCROLL FOR MORE</span>
          <span className="scroll-arrow" aria-hidden="true">↓</span>
        </div>

      </div>
    </section>
  );
}
