import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const GlassTabs = TabsPrimitive.Root;

const GlassTabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'relative inline-flex items-center gap-1 p-1 rounded-2xl',
      'bg-[#141417]/80 backdrop-blur-xl',
      'border border-white/10',
      'shadow-lg',
      className
    )}
    {...props}
  />
));
GlassTabsList.displayName = TabsPrimitive.List.displayName;

const GlassTabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl',
      'text-sm font-medium transition-all duration-200',
      'text-[#a1a1aa] hover:text-[#fafafa]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50',
      'disabled:pointer-events-none disabled:opacity-50',
      // active state
      'data-[state=active]:bg-indigo-600',
      'data-[state=active]:text-white',
      'data-[state=active]:shadow-md',
      className
    )}
    {...props}
  />
));
GlassTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const GlassTabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50',
      'animate-fade-in',
      className
    )}
    {...props}
  />
));
GlassTabsContent.displayName = TabsPrimitive.Content.displayName;

export { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent };
