import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const GlassTabs = TabsPrimitive.Root;

const GlassTabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'relative inline-flex items-center gap-6 pb-0 border-b border-white/10 w-full justify-start rounded-none bg-transparent',
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
      'relative inline-flex items-center justify-center gap-2 pb-3 -mb-[1px] border-b-2 border-transparent',
      'text-sm font-semibold transition-all duration-200 cursor-pointer',
      'text-[#a1a1aa] hover:text-blue-300',
      'focus-visible:outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      // active state
      'data-[state=active]:text-blue-300 data-[state=active]:border-blue-300',
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
