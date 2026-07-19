import * as React from 'react';
import { cn } from '@/lib/utils';

const GlassBadge = React.forwardRef(({ className, variant = 'default', children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors',
        variant === 'default' && 'bg-[#242c3d] text-[#f8fafc] border border-white/10',
        variant === 'secondary' && 'bg-[#1e2638] text-[#94a3b8] border border-white/10',
        variant === 'accent' && 'bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 text-blue-400 border border-blue-400/30',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});
GlassBadge.displayName = 'GlassBadge';

export { GlassBadge };
