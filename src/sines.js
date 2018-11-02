import { SineWave } from "./sine-wave";

// Set up canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get context
const ctx = canvas.getContext("2d");

const drawables = new Set();
const playingByKey = {};

window.addEventListener("keydown", event => {
  if (playingByKey[event.keyCode]) {
    return;
  }
  const sine = new SineWave();
  playingByKey[event.keyCode] = sine;
  drawables.add(sine);
});

window.addEventListener("keyup", event => {
  const cur = playingByKey[event.keyCode];
  if (cur) {
    delete playingByKey[event.keyCode];
    animate(
      { begin: cur.amplitude, end: 0, duration: 1000 },
      amplitude => (cur.amplitude = amplitude)
    );
    animate(
      { begin: 1, end: 0, duration: 1000 },
      opacity => (cur.color.o = opacity)
    ).then(() => delete drawables[cur]);
  }
});

const draw = () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawables.forEach(drawable => drawable.draw(ctx));
  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);

// simple animation helper
const animate = ({ begin, end, duration }, cb) => {
  const start = new Date().getTime();
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const delta = new Date().getTime() - start;
      const weight = Math.min(delta / duration, 1);
      if (weight === 1) {
        clearInterval(interval);
        resolve();
      }
      cb(lerp(begin, end, weight));
    }, 16);
  });
};

const lerp = (v1, v2, weight) => v1 + (v2 - v1) * weight;
