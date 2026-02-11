import { useEffect, useRef } from 'react';

const GlobalNoise = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000; 
        }
      }

      ctx.putImageData(idata, 0, 0);
      requestAnimationFrame(loop);
    };

    const animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GlobalNoise;
