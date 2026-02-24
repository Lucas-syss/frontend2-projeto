"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import GlobalNoise from "@/components/ui/GlobalNoise";
import { TRPCReactProvider } from "@/trpc/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
        <GlobalNoise />
      </TooltipProvider>
    </TRPCReactProvider>
  );
}
