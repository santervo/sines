export class Sound {
  constructor({ frequency, type = "sine" }) {
    this.frequency = frequency;
    this.type = type;
  }

  play(audioCtx, destination) {
    this.audioCtx = audioCtx;

    // Create gain node to handle gain
    this.gainNode = audioCtx.createGain();
    this.gainNode.connect(destination);

    // Create oscillator for given tune
    this.oscillator = audioCtx.createOscillator();
    this.oscillator.frequency.value = this.frequency
    this.oscillator.type = this.type;
    this.oscillator.connect(this.gainNode);

    // Start playing
    this.oscillator.start();
  }

  stop() {
    // Fade
    this.gainNode.gain.setTargetAtTime(0, 0, 0.015);

    // Disconnect
    setTimeout(() => {
      this.oscillator.disconnect();
      this.gainNode.disconnect();
    }, 1000);
  }
}
