import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingCTAProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  offset?: string;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({
  children,
  onClick,
  variant = 'default',
  size = 'lg',
  className,
  position = 'bottom-right',
  offset = '4'
}) => {
  const positionClasses = {
    'bottom-right': `bottom-${offset} right-${offset}`,
    'bottom-center': `bottom-${offset} left-1/2 -translate-x-1/2`,
    'bottom-left': `bottom-${offset} left-${offset}`
  };

  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={cn(
        'fixed z-50 shadow-lg hover:shadow-xl transition-all duration-300',
        'animate-pulse hover:animate-none',
        'md:hidden', // Only show on mobile
        positionClasses[position],
        className
      )}
    >
      {children}
    </Button>
  );
};

export default FloatingCTA;