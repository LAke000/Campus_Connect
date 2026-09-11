"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Bookmark,
  Check,
  ArrowUpRight,
  FileText
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
    <div className={cn("w-full space-y-4 select-none not-prose", className)}>
      {/* ── 1. Understated Eyebrow / Academic Header ───────────── */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500">
          LPU Central Library
        </span>
        <span className="text-neutral-300">/</span>
        <span className="inline-flex items-center text-xs font-medium text-neutral-600">
          Featured Academic Collection
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3.5"
        >
          {/* ── 2. Refined Inline Metadata Strip ─────────────────── */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-600">
            {/* Discipline Badge */}
            <span className="inline-flex items-center rounded-md border border-neutral-200/80 bg-neutral-50 px-2 py-0.5 font-medium text-neutral-700">
              {book.department}
            </span>

            <span className="text-neutral-300">•</span>

            {/* Academic Rating */}
            <div className="inline-flex items-center gap-1 font-medium text-neutral-800">
              <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{book.rating.toFixed(1)}</span>
              <span className="text-neutral-400 font-normal">/ 5.0</span>
            </div>

            <span className="text-neutral-300">•</span>

            {/* Access Mode */}
            <div className="inline-flex items-center gap-1.5 text-neutral-600 font-medium">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full shrink-0",
                  book.availabilityStatus === "Available"
                    ? "bg-emerald-500"
                    : book.availabilityStatus === "Digital Only"
                    ? "bg-blue-500"
                    : "bg-amber-500"
                )}
              />
              <span>
                {book.availabilityStatus === "Available"
                  ? book.callNumber
                    ? `In Stacks · ${book.callNumber}`
                    : "In Stacks · Central Library"
                  : book.availabilityStatus === "Digital Only"
                  ? "Full Digital Access"
                  : "Checked Out · OPAC Hold"}
              </span>
            </div>
          </div>

          {/* ── 3. Editorial Book Typography ─────────────────────── */}
          <div>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-neutral-950 tracking-tight leading-[1.15]">
              {book.title}
            </h1>
            {book.subtitle && (
              <p className="text-xs sm:text-sm text-neutral-500 font-normal mt-1 leading-normal">
                {book.subtitle}
              </p>
            )}
          </div>

          {/* Author & Publisher Credentials */}
          <div className="text-xs sm:text-sm text-neutral-600 font-normal">
            <span className="text-neutral-400">By </span>
            <span className="text-neutral-900 font-medium">{book.author}</span>
            {book.publisher && (
              <span className="text-neutral-500">
                {" "}· {book.publisher} {book.edition && `(${book.edition})`}
              </span>
            )}
          </div>

          {/* 2-line Synopsis Teaser */}
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2 max-w-xl">
            {book.synopsis}
          </p>

          {/* Metadata Specs (Clean Dot-Delimited Line) */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 pt-0.5 flex-wrap">
            <span>{book.pages.toLocaleString()} pages</span>
            <span className="text-neutral-300">•</span>
            <span>ISBN {book.isbn.substring(0, 13)}</span>
            {book.publishYear && (
              <>
                <span className="text-neutral-300">•</span>
                <span>Published {book.publishYear}</span>
              </>
            )}
          </div>

          {/* Reading Progress Bar (if user has active session) */}
          {interaction && interaction.progressPercentage > 0 && (
            <div className="space-y-1.5 pt-1 max-w-sm">
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span className="font-medium text-neutral-700">Reading Progress</span>
                <span className="font-semibold text-neutral-900">{interaction.progressPercentage}%</span>
              </div>
              <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-900 rounded-full transition-all duration-300"
                  style={{ width: `${interaction.progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* ── 4. Action CTAs & Search Bar ──────────────────────── */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
              {/* Primary Access E-Databases CTA */}
              <button
                onClick={() => onOpenReader?.(book)}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <BookOpen className="w-4 h-4 text-neutral-300" />
                <span>Access E-Databases</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {/* Bookmark to Desk CTA */}
              <button
                onClick={() => onToggleBookmark?.(book.id)}
                className={cn(
                  "px-4 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer select-none active:scale-[0.99]",
                  isBookmarked
                    ? "bg-neutral-100 border-neutral-300 text-neutral-900"
                    : "bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                )}
              >
                {isBookmarked ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-neutral-900" />
                    <span>On Desk</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Add to Desk</span>
                  </>
                )}
              </button>
            </div>

            {/* Expandable Live Catalog Search Bar */}
            {searchBar && <div className="pt-0.5">{searchBar}</div>}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ActiveBookDetail;

