import * as React from 'react';
import { cn } from '@/lib/utils';

const GlassAvatar = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex shrink-0 rounded-full overflow-hidden border border-white/10 bg-[#27272a] shadow-md items-center justify-center',
      className
    )}
    {...props}
  >
    {children}
  </div>
));
GlassAvatar.displayName = 'GlassAvatar';

const GlassAvatarImage = React.forwardRef(({ className, src, alt, ...props }, ref) => {
  if (!src) return null;
  return (
    <img
      ref={ref}
      src={src}
      alt={alt || ''}
      className={cn('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  );
});
GlassAvatarImage.displayName = 'GlassAvatarImage';

const GlassAvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-[#27272a] text-[#f5f5f7] font-semibold text-base',
      className
    )}
    {...props}
  >
    {children}
  </div>
));
GlassAvatarFallback.displayName = 'GlassAvatarFallback';

export { GlassAvatar, GlassAvatarImage, GlassAvatarFallback };
