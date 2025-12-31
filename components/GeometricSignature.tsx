
import React from 'react';

interface GeometricSignatureProps {
  n: number;
  m: number;
  harmonics: number;
  size?: number;
  color?: string;
}

const GeometricSignature: React.FC<GeometricSignatureProps> = ({ 
  n, 
  m, 
  harmonics, 
  size = 40,
  color = "currentColor"
}) => {
  // Generate points for a star-like pattern based on 'n' symmetry
  const points: string[] = [];
  const rings = m || 1;
  const symmetry = n || 3;
  
  for (let r = 1; r <= rings; r++) {
    const radius = (r / rings) * (size / 2 - 2);
    const ringPoints: string[] = [];
    
    for (let i = 0; i <= symmetry * 2; i++) {
      const angle = (i / (symmetry * 2)) * Math.PI * 2;
      const dist = i % 2 === 0 ? radius : radius * (0.6 + (harmonics * 0.1));
      const x = size / 2 + Math.cos(angle) * dist;
      const y = size / 2 + Math.sin(angle) * dist;
      ringPoints.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    points.push(ringPoints.join(' '));
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="opacity-80">
      {points.map((p, i) => (
        <polyline
          key={i}
          points={p}
          fill="none"
          stroke={color}
          strokeWidth={0.5 + (i * 0.5)}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500"
        />
      ))}
    </svg>
  );
};

export default GeometricSignature;
