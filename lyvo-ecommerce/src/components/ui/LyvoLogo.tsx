'use client';

import React from 'react';
import Link from 'next/link';

interface LyvoLogoProps {
  variant?: 'badge' | 'crimson' | 'ivory' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withLink?: boolean;
  className?: string;
}

export default function LyvoLogo({
  variant = 'badge',
  size = 'md',
  withLink = true,
  className = ''
}: LyvoLogoProps) {
  // Height definitions for consistent scale
  const sizeClasses = {
    sm: 'h-7',
    md: 'h-9 sm:h-10',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20'
  };

  const currentHeight = sizeClasses[size];

  const renderLogo = () => {
    if (variant === 'badge') {
      return (
        <div className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-red-950/20 group-hover:scale-102">
          <img
            src="/images/logo/lyvo-logo-badge.jpg"
            alt="LYVO"
            className={`${currentHeight} w-auto object-contain block`}
          />
        </div>
      );
    }

    if (variant === 'ivory') {
      return (
        <img
          src="/images/logo/lyvo-logo-ivory.png"
          alt="LYVO"
          className={`${currentHeight} w-auto object-contain block drop-shadow-sm group-hover:scale-102 transition-transform`}
        />
      );
    }

    return (
      <img
        src="/images/logo/lyvo-logo-crimson.png"
        alt="LYVO"
        className={`${currentHeight} w-auto object-contain block drop-shadow-sm group-hover:scale-102 transition-transform`}
      />
    );
  };

  const content = (
    <div className={`inline-flex items-center select-none ${className}`}>
      {renderLogo()}
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="inline-flex items-center group cursor-pointer">
        {content}
      </Link>
    );
  }

  return content;
}
