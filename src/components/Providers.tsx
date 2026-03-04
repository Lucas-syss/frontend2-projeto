"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import GlobalNoise from "@/components/ui/GlobalNoise";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TRPCReactProvider>
        <TooltipProvider>
          {children}
          <Toaster />
          <Sonner />
          <GlobalNoise />
        </TooltipProvider>
      </TRPCReactProvider>
    </SessionProvider>
  );
}
