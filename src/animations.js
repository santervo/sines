
// simple animation helper
export const animate = ({ begin, end, duration }, cb) => {
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
  