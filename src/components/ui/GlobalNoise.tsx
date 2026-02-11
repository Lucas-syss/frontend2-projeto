const GlobalNoise = () => {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden opacity-[0.05] mix-blend-overlay">
      <div className="absolute inset-[-200%] w-[400%] h-[400%] animate-noise bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[length:256px]" />
    </div>
  );
};

export default GlobalNoise;
