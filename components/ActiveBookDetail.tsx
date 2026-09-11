"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Bookmark,
  Check,
  Star,
  Layers,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  FileText,
  Clock,
  Building,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Book, UserBookInteraction } from "@/types/library";

export interface ActiveBookDetailProps {
  book: Book;
  interaction?: UserBookInteraction;
  isBookmarked?: boolean;
  onToggleBookmark?: (bookId: string) => void;
  onOpenReader?: (book: Book) => void;
  onAccessDatabases?: () => void;
  searchBar?: React.ReactNode;
  className?: string;
}

export function ActiveBookDetail({
  book,
  interaction,
  isBookmarked = false,
  onToggleBookmark,
  onOpenReader,
  onAccessDatabases,
  searchBar,
  className
}: ActiveBookDetailProps) {
  if (!book) return null;

  return (
    <div className={cn("w-full space-y-5 select-none", className)}>
      {/* Top Pre-title Pill Bar */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-widest bg-slate-900 text-white px-2.5 py-1 rounded shadow-2xs">
          LPU Central Vault
        </span>
        <span className="text-[11px] font-mono text-slate-500 font-semibold flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Featured Academic Collection
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Department Badge & Rating Strip */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-mono font-bold">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              {book.department}
            </span>

            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/80">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{book.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal font-mono">/ 5.0</span>
            </div>

            <span
              className={cn(
                "text-[10px] font-mono uppercase font-extrabold px-2.5 py-1 rounded-full border",
                book.availabilityStatus === "Available"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : book.availabilityStatus === "Digital Only"
                  ? "bg-purple-50 text-purple-700 border-purple-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              )}
            >
              {book.availabilityStatus}
            </span>
          </div>

          {/* Book Main Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
              {book.title}
            </h1>
            {book.subtitle && (
              <p className="text-xs sm:text-sm font-semibold text-slate-500 font-mono mt-1.5 line-clamp-1">
                {book.subtitle}
              </p>
            )}
          </div>

          {/* Author & Publisher Credentials */}
          <div className="text-xs sm:text-sm text-slate-700 font-medium">
            <span className="text-slate-500">By </span>
            <strong className="text-slate-900">{book.author}</strong>
            {book.publisher && (
              <span className="text-slate-500">
                {" "}• {book.publisher} {book.edition && `(${book.edition})`}
              </span>
            )}
          </div>

          {/* 2-line Synopsis Teaser */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 max-w-xl">
            {book.synopsis}
          </p>

          {/* Metadata Specs Pills */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono text-slate-500 pt-0.5 flex-wrap">
            <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded">
              <FileText className="w-3 h-3 text-slate-400" />
              {book.pages.toLocaleString()} Pages
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded">
              ISBN: {book.isbn.substring(0, 13)}
            </span>
            {book.callNumber && (
              <span className="hidden sm:inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded text-slate-700 font-semibold">
                Shelf: {book.callNumber}
              </span>
            )}
          </div>

          {/* Reading Progress Bar (if user has read this book) */}
          {interaction && interaction.progressPercentage > 0 && (
            <div className="space-y-1.5 pt-1 max-w-sm">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="font-semibold text-slate-700">Reading Progress</span>
                <span className="font-bold text-slate-900">{interaction.progressPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${interaction.progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* ── Action CTAs & Live Catalog Search Bar ───────────── */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
              {/* Primary Access E-Databases / Read Digital Copy CTA */}
              <button
                onClick={() => onOpenReader?.(book)}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Access E-Databases</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Bookmark to Desk CTA */}
              <button
                onClick={() => onToggleBookmark?.(book.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer select-none active:scale-[0.98]",
                  isBookmarked
                    ? "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                )}
              >
                {isBookmarked ? (
                  <>
                    <Check className="w-4 h-4 text-amber-600" />
                    <span>On Desk</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-slate-400" />
                    <span>Add to Desk</span>
                  </>
                )}
              </button>
            </div>

            {/* Expandable Live Catalog Search Bar */}
            {searchBar && <div className="pt-1">{searchBar}</div>}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


export default ActiveBookDetail;
