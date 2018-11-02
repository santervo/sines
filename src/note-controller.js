import { SineWave } from "./sine-wave";
import { animate } from "./animations";
import { Sound } from "./sound";

export class NoteController {
  constructor({ sound, sine }) {
    this.sound = new Sound(sound),
    this.sine = new SineWave(sine)
  }

  play(audioCtx, destination) {
    this.sound.play(audioCtx, destination);
  }

  stop() {
    this.sound.stop();
    return Promise.all([
      // Animate amplitude to 0
      animate(
        { begin: this.sine.amplitude, end: 0, duration: 1000 },
        amplitude => (this.sine.amplitude = amplitude)
      ),
      // Animate opacity to 0
      animate(
        { begin: 1, end: 0, duration: 1000 },
        opacity => (this.sine.color.o = opacity)
      )
    ]);
  }

  draw(ctx) {
    this.sine.draw(ctx);
  }
}
