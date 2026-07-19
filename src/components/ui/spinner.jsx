import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva('animate-spin text-blue-400', {
  variants: {
    size: {
      default: 'h-5 w-5',
      sm: 'h-3.5 w-3.5',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export function Spinner({ className, size, ...props }) {
  return <Loader2 className={cn(spinnerVariants({ size }), className)} {...props} />;
}
