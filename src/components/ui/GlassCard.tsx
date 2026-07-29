'use client';

import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', hoverEffect = true, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-2xl p-6 ${hoverEffect ? 'glass-panel-hover cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
