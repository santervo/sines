export class SineWave {
  constructor({
    amplitude = 0.5,
    frequency = 1,
    phaseShift = 0.001,
    xStep = 1,
    color = {}
  } = {}) {
    // amplitude (0..1) determines how high wave is in proportion to canvas
    this.amplitude = amplitude;

    // frequency determines how many sine waves it generates per second
    this.frequency = frequency;

    // phaseshift determines how steep the wave is
    this.phaseShift = phaseShift;

    // xStep determines how many pixels we draw at once
    this.xStep = xStep;

    this.t = 0;

    this.color = color;
  }

  draw(ctx) {
    const { width, height } = ctx.canvas;

    // multiplier = total height of the wave
    const multiplier = this.amplitude * height;

    // adjustment for drawing the wave at the center of canvas
    const yAdjust = (height - multiplier) / 2;

    // update t
    const currentTime = new Date().getTime() / 1000;
    if (this.lastRender) {
      this.t += currentTime - this.lastRender;
    }
    this.lastRender = currentTime;
    
    ctx.save();

    // set color
    const { r = 0, g = 255, b = 0, o = 1 } = this.color;
    ctx.strokeStyle = `rgba(${r},${g},${b},${o})`;

    // draw the wave
    ctx.beginPath();
    for (var x = 0; x < width; x += this.xStep) {
      // calculate sin value for each pixel
      const sinValue = Math.sin(
        2 * Math.PI * this.frequency * this.t + x * this.phaseShift
      );
      const y = yAdjust + (multiplier * (sinValue + 1)) / 2;

      ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.restore();
  }
}
