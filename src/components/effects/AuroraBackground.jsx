import React from 'react';

/**
 * Pure CSS/Tailwind Animated Aurora Background
 * Features 4 layered, angled, semi-transparent light curtains drifting smoothly across the dark sky.
 * Zero circular background shapes or glow rings.
 */
export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-slate-950">
      {/* Keyframe Animations for Horizontal Drift & Opacity Waves */}
      <style>{`
        @keyframes auroraWave1 {
          0% { transform: translateX(-10%) translateY(-4%) rotate(-12deg) skewX(-14deg) scaleY(1); opacity: 0.18; }
          50% { transform: translateX(12%) translateY(6%) rotate(-8deg) skewX(-10deg) scaleY(1.2); opacity: 0.35; }
          100% { transform: translateX(-10%) translateY(-4%) rotate(-12deg) skewX(-14deg) scaleY(1); opacity: 0.18; }
        }
        @keyframes auroraWave2 {
          0% { transform: translateX(14%) translateY(5%) rotate(-18deg) skewX(12deg) scaleY(1.1); opacity: 0.2; }
          50% { transform: translateX(-8%) translateY(-7%) rotate(-14deg) skewX(8deg) scaleY(0.95); opacity: 0.38; }
          100% { transform: translateX(14%) translateY(5%) rotate(-18deg) skewX(12deg) scaleY(1.1); opacity: 0.2; }
        }
        @keyframes auroraWave3 {
          0% { transform: translateX(-6%) translateY(7%) rotate(-10deg) skewX(-8deg) scaleX(1); opacity: 0.15; }
          50% { transform: translateX(10%) translateY(-6%) rotate(-15deg) skewX(-14deg) scaleX(1.15); opacity: 0.32; }
          100% { transform: translateX(-6%) translateY(7%) rotate(-10deg) skewX(-8deg) scaleX(1); opacity: 0.15; }
        }
        @keyframes auroraWave4 {
          0% { transform: translateX(8%) translateY(-8%) rotate(-6deg) skewX(15deg); opacity: 0.16; }
          50% { transform: translateX(-12%) translateY(4%) rotate(-12deg) skewX(10deg); opacity: 0.3; }
          100% { transform: translateX(8%) translateY(-8%) rotate(-6deg) skewX(15deg); opacity: 0.16; }
        }
        .aurora-sheet-1 { animation: auroraWave1 13s ease-in-out infinite; }
        .aurora-sheet-2 { animation: auroraWave2 16s ease-in-out infinite 2s; }
        .aurora-sheet-3 { animation: auroraWave3 11s ease-in-out infinite 1s; }
        .aurora-sheet-4 { animation: auroraWave4 15s ease-in-out infinite 3s; }
      `}</style>

      {/* Sheet 1: Pale Green Light Band */}
      <div 
        className="aurora-sheet-1 absolute -top-36 -left-1/4 w-[150%] h-[460px] bg-gradient-to-r from-transparent via-[#86efac]/25 via-[#5eead4]/30 to-transparent blur-[80px]"
      />

      {/* Sheet 2: Soft Teal & Icy Cyan Light Curtain */}
      <div 
        className="aurora-sheet-2 absolute -top-20 -left-1/3 w-[160%] h-[430px] bg-gradient-to-r from-transparent via-[#5eead4]/25 via-[#7dd3fc]/30 to-transparent blur-[90px]"
      />

      {/* Sheet 3: Frosty White & Icy Blue Crown */}
      <div 
        className="aurora-sheet-3 absolute top-10 -left-1/4 w-[140%] h-[390px] bg-gradient-to-r from-transparent via-[#7dd3fc]/20 via-white/18 to-transparent blur-[100px]"
      />

      {/* Sheet 4: High-Altitude Pale Green Ribbon */}
      <div 
        className="aurora-sheet-4 absolute -top-44 left-0 w-[150%] h-[510px] bg-gradient-to-r from-transparent via-[#86efac]/20 via-[#5eead4]/25 to-transparent blur-[85px]"
      />

      {/* Soft Tactical Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cff4fe_1px,transparent_1px)] [background-size:32px_32px]"></div>
    </div>
  );
}
