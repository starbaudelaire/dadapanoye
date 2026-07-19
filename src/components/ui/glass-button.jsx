import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const glassButtonVariants = cva(
  cn(
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl cursor-pointer',
    'text-sm font-semibold transition-all duration-300 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:scale-[1.02] active:scale-[0.98]',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
  ),
  {
    variants: {
      variant: {
        // default: Slate Gray glass
        default: cn(
          'bg-[#242c3d]/80 backdrop-blur-xl border border-white/10 text-[#f8fafc]',
          'shadow-md',
          'hover:bg-[#2d374d] hover:text-white'
        ),
        // primary: Apple Blue to Indigo Gradient
        primary: cn(
          'bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600 border border-blue-400/30 text-white',
          'shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700'
        ),
        // outline: border white/20
        outline: cn(
          'bg-transparent backdrop-blur-sm border border-white/20 text-[#f8fafc]',
          'hover:bg-[#242c3d] hover:text-white hover:border-white/40'
        ),
        ghost: cn(
          'bg-transparent text-[#94a3b8]',
          'hover:bg-[#242c3d] hover:text-[#f8fafc]'
        ),
        destructive: cn(
          'bg-red-500/20 backdrop-blur-xl border border-red-500/40 text-red-400',
          'hover:bg-red-500/30'
        ),
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const GlassButton = React.forwardRef(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(glassButtonVariants({ variant, size }), className)} {...props}>
        {children}
      </Comp>
    );
  }
);
GlassButton.displayName = 'GlassButton';

export { GlassButton, glassButtonVariants };
