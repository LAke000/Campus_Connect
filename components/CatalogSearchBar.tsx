"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Command,
  CornerDownLeft,
  GraduationCap,
  Star,
  CheckCircle2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Book } from "@/types/library";

export interface CatalogSearchBarProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onJumpToWheelIndex?: (index: number) => void;
  featuredBooks?: Book[];
  placeholder?: string;
  className?: string;
}

export function CatalogSearchBar({
  books,
  onSelectBook,
  onJumpToWheelIndex,
  featuredBooks = [],
  placeholder = "Search OPAC Catalog & E-Vault...",
  className
}: CatalogSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
  }, []);

  // Global shortcut handler (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live Query Matching
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Show top 4 featured suggestions when query is empty but search bar is focused
      return books.slice(0, 4);
    }

    return books.filter((book) => {
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchSubtitle = book.subtitle?.toLowerCase().includes(q);
      const matchAuthor = book.author.toLowerCase().includes(q);
      const matchIsbn = book.isbn.toLowerCase().includes(q);
      const matchDepartment = book.department.toLowerCase().includes(q);
      const matchTags = book.tags?.some((t) => t.toLowerCase().includes(q));

      return matchTitle || matchSubtitle || matchAuthor || matchIsbn || matchDepartment || matchTags;
    });
  }, [books, query]);

  // Keyboard navigation within dropdown
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredResults.length === 0) {
      if (e.key === "ArrowDown") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const targetBook = filteredResults[selectedIndex];
      if (targetBook) {
        handleSelectBookResult(targetBook);
      }
    }
  };

  const handleSelectBookResult = (book: Book) => {
    setIsOpen(false);
    setQuery("");

    // Check if book exists in featured rotating wheel
    if (featuredBooks.length > 0 && onJumpToWheelIndex) {
      const wheelIdx = featuredBooks.findIndex((b) => b.id === book.id);
      if (wheelIdx !== -1) {
        onJumpToWheelIndex(wheelIdx);
      }
    }

    onSelectBook(book);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedIndex(0);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-lg select-none", className)}>
      {/* ── Search Input Container ─────────────────────────────── */}
      <div
        className={cn(
          "relative flex items-center bg-white border rounded-xl transition-all duration-200 shadow-2xs",
          isOpen
            ? "border-slate-900 ring-2 ring-slate-900/15 shadow-md"
            : "border-slate-300/80 hover:border-slate-400"
        )}
      >
        <Search
          className={cn(
            "w-4 h-4 absolute left-3.5 transition-colors pointer-events-none",
            isOpen ? "text-slate-900" : "text-slate-400"
          )}
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-24 py-2.5 sm:py-3 rounded-xl bg-transparent text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />

        {/* Right Adornments: Clear Button & Shortcut Indicator */}
        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-0.5 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-500 font-semibold shadow-3xs">
              {isMac ? (
                <>
                  <span>⌘</span>
                  <span>K</span>
                </>
              ) : (
                <>
                  <span>Ctrl</span>
                  <span>K</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Animated Dropdown Results Menu ─────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 divide-y divide-slate-100"
          >
            {/* Header Tag */}
            <div className="px-4 py-2.5 bg-slate-50/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="font-semibold uppercase tracking-wider">
                {query ? `Search Results (${filteredResults.length})` : "Featured Suggestions"}
              </span>
              <span className="hidden sm:flex items-center gap-1 text-[10px]">
                <span>Navigate</span>
                <span className="px-1 py-0.2 rounded bg-slate-200 text-slate-700 font-bold">↑↓</span>
                <span>Select</span>
                <CornerDownLeft className="w-2.5 h-2.5" />
              </span>
            </div>

            {/* Results List */}
            {filteredResults.length > 0 ? (
              <div className="max-h-80 overflow-y-auto p-1.5 space-y-1 scrollbar-thin">
                {filteredResults.map((book, idx) => {
                  const isSelected = idx === selectedIndex;
                  const isFeatured = featuredBooks.some((b) => b.id === book.id);

                  return (
                    <div
                      key={book.id}
                      onClick={() => handleSelectBookResult(book)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-150 gap-3",
                        isSelected
                          ? "bg-neutral-900 text-white shadow-xs"
                          : "hover:bg-neutral-100 text-neutral-800"
                      )}
                    >
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded-md border border-neutral-200 shrink-0 shadow-2xs"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span
                              className={cn(
                                "text-[10px] font-medium px-1.5 py-0.2 rounded shrink-0",
                                isSelected
                                  ? "bg-neutral-800 text-neutral-200 border border-neutral-700"
                                  : "bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                              )}
                            >
                              {book.department}
                            </span>
                            {isFeatured && (
                              <span
                                className={cn(
                                  "text-[10px] font-medium flex items-center gap-0.5",
                                  isSelected ? "text-amber-300" : "text-amber-600"
                                )}
                              >
                                <span>★</span> Featured
                              </span>
                            )}
                          </div>

                          <h4
                            className={cn(
                              "text-xs sm:text-sm font-bold truncate leading-tight",
                              isSelected ? "text-white" : "text-neutral-950"
                            )}
                          >
                            {book.title}
                          </h4>
                          <p
                            className={cn(
                              "text-[11px] truncate font-normal",
                              isSelected ? "text-neutral-400" : "text-neutral-500"
                            )}
                          >
                            {book.author}
                          </p>
                        </div>
                      </div>

                      {/* Right: Availability Status & Jump Arrow */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium">
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
                          <span className={isSelected ? "text-neutral-300" : "text-neutral-600"}>
                            {book.availabilityStatus === "Available"
                              ? "In Stacks"
                              : book.availabilityStatus === "Digital Only"
                              ? "Digital Access"
                              : "Checked Out"}
                          </span>
                        </div>

                        <div
                          className={cn(
                            "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
                            isSelected
                              ? "bg-white/20 text-white"
                              : "text-neutral-400 group-hover:text-neutral-700"
                          )}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ── Empty State ───────────────────────────────────── */
              <div className="p-8 text-center space-y-2">
                <BookOpen className="w-8 h-8 text-neutral-300 mx-auto" />
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-800">
                  No physical or digital volumes found in the catalog.
                </h4>
                <p className="text-[11px] text-neutral-500 max-w-xs mx-auto">
                  Try searching by author name, department acronym (e.g. CSE, ECE), or standard ISBN code.
                </p>
              </div>
            )}

            {/* Bottom Footer Tip */}
            <div className="px-4 py-2 bg-neutral-50 text-[10px] text-neutral-400 flex items-center justify-between">
              <span>LPU Central Library OPAC Catalog Database</span>
              <span className="hidden sm:inline">Press ESC to dismiss</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default CatalogSearchBar;
