import * as React from "react";
import * as TooltipPrimitives from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitives.Provider;

const Tooltip = TooltipPrimitives.Root;

const TooltipTrigger = TooltipPrimitives.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitives.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    <TooltipPrimitives.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-md bg-gray-800 text-white px-3 py-2 text-sm shadow-lg",
        className
      )}
      {...props}
    />
  </motion.div>
));

TooltipContent.displayName = TooltipPrimitives.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };