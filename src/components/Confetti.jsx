import React from 'react';

export default function Confetti() {
  const confettiPieces = Array.from({ length: 60 }, (_, i) => {
    const colors = [
      '#A855F7', // Morado
      '#06B6D4', // Cyan
      '#FCD34D', // Amarillo
      '#EC4899', // Rosa
      '#8B5CF6', // Púrpura
      '#10B981', // Verde
      '#F59E0B', // Naranja
    ];
    
    return {
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 3 + Math.random() * 2,
      rotation: Math.random() * 360,
      endRotation: 360 + Math.random() * 720,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.6 ? 'circle' : 'rect',
      size: 6 + Math.random() * 10,
      wobble: Math.random() * 50 - 25
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-40">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: '-10%',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animation: `fall-${piece.id} ${piece.duration}s ease-in-out ${piece.delay}s forwards`,
            borderRadius: piece.shape === 'circle' ? '50%' : '3px',
            transform: `rotate(${piece.rotation}deg)`,
            opacity: 0.85
          }}
        />
      ))}
      <style>{`
        ${confettiPieces.map(piece => `
          @keyframes fall-${piece.id} {
            0% {
              transform: translateY(0) translateX(0) rotate(${piece.rotation}deg) scale(1);
              opacity: 1;
            }
            50% {
              transform: translateY(50vh) translateX(${piece.wobble}px) rotate(${(piece.rotation + piece.endRotation) / 2}deg) scale(0.9);
              opacity: 0.9;
            }
            100% {
              transform: translateY(110vh) translateX(${piece.wobble * 2}px) rotate(${piece.endRotation}deg) scale(0.6);
              opacity: 0.6;
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
}