import { SineWave } from "./sine-wave";
import { animate } from "./animations";
import { Sound } from "./sound";

export class NoteController {
  constructor({ sound }) {
    this.sound = new Sound(sound);

    // Build sine wave based on sound
    this.sine = this._buildSine(sound);
  }

  _buildSine({ frequency, type = "sine" }) {
    switch (type) {
      case "triangle":
        return new SineWave({
          amplitude: 0.9,
          frequency: 3,
          phaseShift: 1 / (1000 - frequency),
          color: { r: 255, g: 0, b: 0, o: 1 }
        });
      case "sine":
      default:
        return new SineWave({
          amplitude: 0.5,
          frequency: 1,
          phaseShift: 1 / (1000 - frequency),
          color: { r: 0, g: 255, b: 0, o: 1 }
        });
    }
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
