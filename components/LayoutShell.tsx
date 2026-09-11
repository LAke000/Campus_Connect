"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9F9F8] dark:bg-[#141415] text-[#1C1D1F] dark:text-[#F6F6F4]">
      {/* ── Desktop Sidebar (Floating Glassmorphism) ──── */}
      <Sidebar className="hidden lg:flex shrink-0 m-4 mr-0 rounded-[28px] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-neutral-200/80 dark:border-neutral-800" />

      {/* ── Main Canvas area ──────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Top Navbar Header */}
        <div className="hidden lg:block absolute top-4 left-4 right-4 z-20">
          <TopNavbar userName="Shourya" userInitials="SV" />
        </div>

        {/* Mobile Header + Sheet */}
        <header className="flex h-14 items-center gap-3 border-b border-neutral-200/80 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-4 lg:hidden z-20">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300"
              >
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 p-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border-r border-neutral-200/80 dark:border-neutral-800"
              showCloseButton={false}
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Sidebar className="flex h-full border-r-0" />
            </SheetContent>
          </Sheet>
          <span className="text-sm font-bold tracking-tight text-[#1C1D1F] dark:text-white">
            CampusConnect
          </span>
        </header>

        {/* ── Main Content Area ────────────────────────── */}
        <main className="flex-1 overflow-y-auto scroll-smooth pt-4 lg:pt-24 px-4 lg:px-6 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

