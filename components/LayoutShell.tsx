"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { ScrollContainer } from "@/components/ScrollContainer";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Sun, Moon, User, Bell } from "lucide-react";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  // Automatically close mobile navigation drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Check system/DOM dark mode on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9F9F8] dark:bg-[#141415] text-[#1C1D1F] dark:text-[#F6F6F4]">
      {/* ── Desktop Sidebar (Floating Glassmorphism) ──── */}
      <Sidebar className="hidden lg:flex shrink-0 m-4 mr-0 rounded-[28px] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-neutral-200/80 dark:border-neutral-800" />

      {/* ── Main Canvas area ──────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden relative min-w-0">
        {/* Top Navbar Header (Desktop) */}
        <div className="hidden lg:block absolute top-4 left-4 right-4 z-20">
          <TopNavbar userName="Shourya" userInitials="SV" />
        </div>

        {/* Mobile Header + Sheet */}
        <header className="flex h-14 items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md px-3 sm:px-4 lg:hidden z-20 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-9 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 p-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border-r border-neutral-200/80 dark:border-neutral-800"
                showCloseButton={false}
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <Sidebar className="flex h-full border-r-0" />
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2">
              <div className="size-6 rounded-md bg-[#161716] text-white flex items-center justify-center font-bold text-[10px] tracking-tight">
                LPU
              </div>
              <span className="text-sm font-bold tracking-tight text-[#1C1D1F] dark:text-white">
                CampusConnect
              </span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Quick Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="size-8 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="size-3.5 text-amber-400" /> : <Moon className="size-3.5" />}
            </button>

            {/* Quick Profile Link */}
            <Link
              href="/profile"
              className={`size-8 rounded-full flex items-center justify-center transition-colors ${
                pathname === "/profile"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
              title="Profile & Settings"
              aria-label="Profile"
            >
              <User className="size-3.5" />
            </Link>
          </div>
        </header>

        {/* ── Main Content Area with Fluid Rubber-Band Overscroll ── */}
        <ScrollContainer
          className="flex-1 overscroll-none pt-3 sm:pt-4 lg:pt-24 px-3 sm:px-4 lg:px-6 pb-8"
          contentClassName="min-h-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="h-full max-w-7xl mx-auto transform-gpu"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </ScrollContainer>
      </div>
    </div>
  );
}

