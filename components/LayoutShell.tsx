"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
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

import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#eef2f6]">
      {/* ── Desktop Sidebar (Floating Glassmorphism) ──── */}
      <Sidebar className="hidden lg:flex shrink-0 m-4 mr-0 rounded-[28px] bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60" />

      {/* ── Main Canvas area ──────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Top Navbar */}
        <header className="hidden lg:flex h-20 items-center justify-between px-8 absolute top-0 left-0 right-0 z-10 w-full mt-4">
          <div className="flex-1 px-4">
             <div className="relative max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
               <Input 
                 placeholder="Search for poolables..." 
                 className="w-full pl-11 bg-white/50 backdrop-blur-md border-white/80 shadow-sm rounded-full h-11 focus-visible:ring-1 focus-visible:ring-slate-300"
               />
             </div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <button className="relative p-2.5 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-sm text-slate-600 hover:bg-white/80 transition-colors">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2.5 size-2 rounded-full bg-blue-500 ring-2 ring-white" />
            </button>
            <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-sm hover:bg-white/80 transition-colors">
              <div className="size-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <User className="size-4 text-blue-700" />
              </div>
              <span className="text-sm font-semibold text-slate-700">Profile</span>
            </button>
          </div>
        </header>

        {/* Mobile Header + Sheet */}
        <header className="flex h-14 items-center gap-3 border-b border-white/50 bg-white/40 backdrop-blur-md px-4 lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              >
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 p-0 bg-white/80 backdrop-blur-xl border-r border-white/60"
              showCloseButton={false}
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Sidebar className="flex h-full border-r-0" />
            </SheetContent>
          </Sheet>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            CampusConnect
          </span>
        </header>

        {/* ── Main Content Area ────────────────────────── */}
        <main className="flex-1 overflow-y-auto scroll-smooth pt-2 lg:pt-28 px-4 lg:px-8 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
