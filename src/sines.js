import { NoteController } from './note-controller';

const noteFrequencies = {
  c4: 261.6,
  d4: 293.7,
  e4: 329.6,
  f4: 349.2,
  g4: 392,
  a4: 440,
  b4: 493.9,
  c5: 523.3,
  d5: 587.3,
  e5: 659.3
};

const keys = {
  65: { sound: { frequency: noteFrequencies.c4 } },
  83: { sound: { frequency: noteFrequencies.d4 } },
  68: { sound: { frequency: noteFrequencies.e4 } },
  70: { sound: { frequency: noteFrequencies.f4 } },
  71: { sound: { frequency: noteFrequencies.g4 } },
  72: { sound: { frequency: noteFrequencies.a4 } },
  74: { sound: { frequency: noteFrequencies.b4 } },
  75: { sound: { frequency: noteFrequencies.c5 } },
  76: { sound: { frequency: noteFrequencies.d5 } },
  186: { sound: { frequency: noteFrequencies.e5 } }
};

// Set up canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get context
const ctx = canvas.getContext("2d");

// Create audioCtx
const audioCtx = new (AudioContext || webkitAudioContext)();
const compressor = audioCtx.createDynamicsCompressor();
compressor.connect(audioCtx.destination);

const drawables = new Set();
const playingByKey = {};

window.addEventListener("keydown", event => {
  const config = keys[event.keyCode];

  // Key down, we are playing already
  if (!config || playingByKey[event.keyCode]) {
    return;
  }
  const controller = new NoteController(config);
  playingByKey[event.keyCode] = controller;
  drawables.add(controller);
  // Start playing
  controller.play(audioCtx, compressor);
});

window.addEventListener("keyup", event => {
  const cur = playingByKey[event.keyCode];
  if (cur) {
    // Remove keybinding so new frequency can be played
    delete playingByKey[event.keyCode];

    // Stop sound and animation
    cur.stop().then(() => {
      delete drawables[cur];
    });
  }
});

const draw = () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawables.forEach(drawable => drawable.draw(ctx));
  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
