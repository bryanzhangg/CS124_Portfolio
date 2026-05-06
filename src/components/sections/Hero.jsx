import { useState, useEffect, useRef, useCallback } from "react";

const CYCLE_INTERVAL = 60;
const SPIN_COUNT = 10;
const CHAR_STAGGER = 80;
const CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const TILE_GAP = 3;
const ROW_GAP = 14;

const BOARD_DATA = [
  { value: "BRYAN ZHANG", rowDelay: 200, rowOffset: 0, scrambleDelay: 1000 },
  { value: "AEROSPACE + CS", rowDelay: 600, rowOffset: 2, scrambleDelay: 600 },
  { value: "@ UIUC", rowDelay: 1000, rowOffset: 3, scrambleDelay: 200 },
];

function randomChar() {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
}

function SplitFlapChar({ targetChar, delay, scrambleDelay, flippedAway }) {
  const [cur, setCur] = useState(randomChar);
  const [prev, setPrev] = useState('');
  const [flipKey, setFlipKey] = useState(0);
  const curRef = useRef(cur);
  const ticksRef = useRef(0);

  const advance = useCallback((char) => {
    setPrev(curRef.current);
    curRef.current = char;
    setCur(char);
    setFlipKey(k => k + 1);
  }, []);

  useEffect(() => {
    if (flippedAway) return;
    let timeoutId, intervalId;
    timeoutId = setTimeout(() => {
      ticksRef.current = 0;
      intervalId = setInterval(() => {
        ticksRef.current++;
        if (ticksRef.current >= SPIN_COUNT) {
          clearInterval(intervalId);
          advance(targetChar);
        } else {
          advance(randomChar());
        }
      }, CYCLE_INTERVAL);
    }, delay);
    return () => { clearTimeout(timeoutId); clearInterval(intervalId); };
  }, [targetChar, delay, flippedAway, advance]);

  useEffect(() => {
    if (!flippedAway) return;
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => advance(randomChar()), CYCLE_INTERVAL);
    }, scrambleDelay);
    return () => { clearTimeout(timeoutId); clearInterval(intervalId); };
  }, [flippedAway, scrambleDelay, advance]);

  return (
    <span className="flap-tile">
      <span className="flap-bot-half">{cur}</span>
      <span className="flap-top-half">{cur}</span>
      <span className="flap-panel" key={flipKey}>{prev || cur}</span>
    </span>
  );
}

function BlankTile() {
  return <span className="flap-tile" />;
}

const CSS = `
  #hero {
    height: 100dvh;
    box-sizing: border-box;
    display: flex;
    background: #050505;
    padding-top: 48px;
    position: relative;
  }

  /* Hard physical bottom edge of the board */
  #hero::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255,255,255,0.07);
    z-index: 2;
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
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-weight: 500;
    font-size: clamp(0.75rem, 1.6vw, 1rem);
    letter-spacing: 0.18em;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    background: linear-gradient(180deg, #0e0e0e 0%, #141414 100%);
    border-top: 8px solid #0a0a0a;
  }

  @keyframes flow-down {
    0%   { background-position: 50% -50%; }
    100% { background-position: 50% 150%; }
  }

  .board-footer span {
    background: linear-gradient(
      to bottom,
      #8a8480 0%,
      #c8c2b8 30%,
      #ede9e3 50%,
      #c8c2b8 70%,
      #8a8480 100%
    );
    background-size: 100% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: flow-down 3s ease-in-out infinite;
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

  .board-grid::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.35) 100%);
    pointer-events: none;
    z-index: 4;
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

  .flap-tile {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    background: linear-gradient(
      to bottom,
      #1c1c1c 0%,
      #161616 46%,
      #040404 48.5%,
      #020202 50%,
      #040404 51.5%,
      #161616 54%,
      #121212 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.07),
      inset 0 -1px 0 rgba(0,0,0,0.5);
  }

  .flap-top-half,
  .flap-bot-half,
  .flap-panel {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'B612 Mono', 'Courier New', monospace;
    font-size: clamp(1.25rem, 5.5vw, 5rem);
    font-weight: 500;
    color: #f0e8d0;
  }

  .flap-top-half {
    clip-path: inset(0 0 50% 0);
  }

  .flap-bot-half {
    clip-path: inset(50% 0 0 0);
  }

  .flap-panel {
    clip-path: inset(0 0 50% 0);
    background: linear-gradient(to bottom, #1c1c1c 0%, #131313 100%);
    transform-origin: center 50%;
    animation: panel-flip ${CYCLE_INTERVAL}ms ease-in forwards;
    z-index: 1;
  }

  @keyframes panel-flip {
    0%   { transform: perspective(500px) rotateX(0deg); }
    100% { transform: perspective(500px) rotateX(90deg); }
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
  const gridRef = useRef(null);
  const probeRef = useRef(null);
  const [dims, setDims] = useState({ cols: 0, rows: 0 });
  const [flippedAway, setFlippedAway] = useState(false);

  useEffect(() => {
    function measure() {
      const grid = gridRef.current;
      const probe = probeRef.current;
      if (!grid || !probe) return;
      const gs = window.getComputedStyle(grid);
      const availW = grid.clientWidth - parseFloat(gs.paddingLeft) - parseFloat(gs.paddingRight);
      const availH = grid.clientHeight - parseFloat(gs.paddingTop) - parseFloat(gs.paddingBottom);
      setDims({
        cols: Math.floor((availW + TILE_GAP) / (probe.offsetWidth + TILE_GAP)),
        rows: Math.floor((availH + ROW_GAP) / (probe.offsetHeight + ROW_GAP)),
      });
    }
    const t = setTimeout(measure, 0);
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
  const startRow = Math.max(0, Math.floor((rows - blockSize) / 2));

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
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          } : undefined}
        >
          <span className="flap-tile flap-probe" ref={probeRef} />
          {cols > 0 && rows > 0 && Array.from({ length: rows * cols }, (_, idx) => {
            const rowIdx = Math.floor(idx / cols);
            const colIdx = idx % cols;
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
        </div>

      </div>
    </section>
  );
}
