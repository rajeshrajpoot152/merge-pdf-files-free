import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'leaderboard';
  className?: string;
}

/**
 * AdSense Placeholder component hardcoded with exact min-height and width
 * to guarantee 0 Cumulative Layout Shift (CLS) during AdSense script hydration.
 */
export default function AdPlaceholder({
  slotId = 'default-slot',
  format = 'horizontal',
  className = '',
}: AdPlaceholderProps) {
  const getDimensions = () => {
    switch (format) {
      case 'leaderboard':
        return 'min-h-[90px] max-w-[728px] w-full';
      case 'rectangle':
        return 'min-h-[250px] max-w-[300px] w-full';
      case 'horizontal':
      default:
        return 'min-h-[90px] sm:min-h-[100px] w-full max-w-5xl';
    }
  };

  return (
    <div
      className={`mx-auto my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-100/60 p-2 text-center transition-all ${getDimensions()} ${className}`}
      aria-label="Advertisement Area"
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Advertisement
      </span>
      <div id={`ad-container-${slotId}`} className="w-full h-full flex items-center justify-center text-xs text-slate-400">
        Google Ad Space (Reserved to prevent CLS)
      </div>
    </div>
  );
}
