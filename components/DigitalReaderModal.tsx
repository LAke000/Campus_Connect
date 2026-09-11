"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Bookmark,
  Check,
  Share2,
  FileText,
  Clock,
  Sparkles,
  Download,
  Search,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Book } from "@/types/library";

export interface DigitalReaderModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (bookId: string) => void;
}

export function DigitalReaderModal({
  book,
  isOpen,
  onClose,
  isBookmarked = false,
  onToggleBookmark
}: DigitalReaderModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen || !book) return null;

  const totalPages = book.pages || 400;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl h-[88vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden select-none"
        >
          {/* Top Reader Navbar */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold truncate leading-tight">{book.title}</h3>
                <p className="text-[11px] text-slate-400 font-mono truncate">
                  {book.author} • {book.edition || "Academic Edition"}
                </p>
              </div>
            </div>

            {/* Center Reader Navigation */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Reader Tools */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark?.(book.id)}
                className={cn(
                  "p-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer",
                  isBookmarked
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                )}
                title="Bookmark to Desk"
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden md:inline">{isBookmarked ? "On Desk" : "Save"}</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                title="Close Reader"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reader Body: Simulated Digital Reading Canvas */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-100 flex justify-center">
            <div
              className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-lg p-8 sm:p-12 space-y-6 text-slate-800 transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs font-mono text-slate-400">
                <span>{book.isbn}</span>
                <span>LPU Digital E-Vault • Secure Reader</span>
                <span>Page {currentPage}</span>
              </div>

              <div className="space-y-4">
                <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider block">
                  Chapter Overview & Synopsis
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  {book.title}
                </h2>
                <p className="text-sm text-slate-600 font-medium">By {book.author}</p>
                <div className="h-0.5 w-16 bg-slate-900 rounded" />
              </div>

              <p className="text-sm leading-relaxed text-slate-700 font-serif">
                {book.synopsis}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="font-mono font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Prescribed Curriculum Mapping
                </div>
                <p className="text-slate-600 leading-relaxed">
                  This academic text is indexed under the Department of <strong>{book.department}</strong>. Available for offline checkouts at Central Library Shelf <strong>{book.callNumber || "Level 4 Section A"}</strong>.
                </p>
              </div>

              <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Lovely Professional University Library System</span>
                <span>All Rights Reserved</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default DigitalReaderModal;
