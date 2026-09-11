"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, User } from "lucide-react";

export function DoubtSessionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      }}
      className="flex w-full max-w-sm flex-col gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold tracking-wider text-slate-700 hover:bg-slate-200 border-transparent uppercase"
          >
            CS201
          </Badge>
          <Badge
            variant="outline"
            className="rounded-md border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 shadow-sm"
          >
            <span className="relative mr-1.5 flex size-1.5 shrink-0 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-600" />
            </span>
            Live Now
          </Badge>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-slate-900 leading-snug">
          Binary Trees Recursion
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium tracking-tight">
          <User className="size-3.5 shrink-0" />
          <span>
            Hosted by{" "}
            <span className="font-semibold text-slate-700">Riya Sharma</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="sm"
          className="w-full bg-slate-900 text-white hover:bg-slate-800 font-semibold rounded-md shadow-sm transition-colors"
        >
          <Video className="size-3.5 shrink-0 mr-1.5" />
          Join Session
        </Button>
      </div>
    </motion.div>
  );
}
