import React from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40); // Will take ~2 seconds to complete

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <img
          src="/images/logo transparent.png"
          alt="WHITE club"
          className="h-32 mb-8 w-auto"
        />
        <div className="w-[128px] h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-black transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}