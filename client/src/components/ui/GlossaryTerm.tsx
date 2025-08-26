// src/components/ui/GlossaryTerm.tsx

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

interface GlossaryTermProps {
  children: React.ReactNode;
  definition: string;
}

export default function GlossaryTerm({
  children,
  definition,
}: GlossaryTermProps) {
  const isMobileLayout = useIsMobile();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
  }, []);

  const usePopover = isTouchDevice || isMobileLayout;

  const triggerElement = (
    <button
      type="button"
      className="font-bold text-quantum-cyan cursor-pointer underline decoration-dotted decoration-1 underline-offset-2 bg-transparent p-0 border-none text-left"
    >
      {children}
    </button>
  );

  if (usePopover) {
    return (
      <Popover>
        <PopoverTrigger asChild>{triggerElement}</PopoverTrigger>
        <PopoverContent className="max-w-xs text-center w-auto">
          <p>{definition}</p>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{triggerElement}</TooltipTrigger>
      <TooltipContent className="max-w-xs text-center">
        <p>{definition}</p>
      </TooltipContent>
    </Tooltip>
  );
}
