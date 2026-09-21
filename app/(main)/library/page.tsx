"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Search,
  BookOpen,
  Database,
  ScanLine,
  MonitorUp,
  Globe,
  Users,
  ArrowRight,
  Fingerprint,
  Server,
  Bookmark,
  Sparkles,
  Star,
  Check,
  Compass,
  FileText,
  SlidersHorizontal,
  Flame,
  Award,
  Layers,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Book, UserBookInteraction } from "@/types/library";
import {
  initialBooksDatabase,
  getFeaturedBooks,
  getDeskFavorites,
  initialUserInteractions,
  searchBooks
} from "@/data/libraryDatabase";
import { ActiveBookDetail } from "@/components/ActiveBookDetail";
import { RotatingBookWheel } from "@/components/RotatingBookWheel";
import { CatalogSearchBar } from "@/components/CatalogSearchBar";
import { DigitalReaderModal } from "@/components/DigitalReaderModal";


export default function LibraryPage() {
  // ── State Management ──────────────────────────────────────────
  const [featuredBooks] = useState<Book[]>(() => getFeaturedBooks());
  const [activeBookIndex, setActiveBookIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // User Desk Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const initialSet = new Set<string>();
    Object.entries(initialUserInteractions).forEach(([id, interaction]) => {
      if (interaction.isBookmarkedOnDesk) initialSet.add(id);
    });
    return initialSet;
  });

  // Digital Reader Modal State
  const [readerModalBook, setReaderModalBook] = useState<Book | null>(null);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  const activeBook = featuredBooks[activeBookIndex] || featuredBooks[0];
  const isCurrentBookmarked = activeBook ? bookmarkedIds.has(activeBook.id) : false;

  // Toggle bookmark handler
  const handleToggleBookmark = (bookId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      return next;
    });
  };

  // Filtered Catalog
  const filteredCatalog = useMemo(() => {
    return searchBooks(searchQuery, selectedDepartment);
  }, [searchQuery, selectedDepartment]);

  // Desk Books List
  const deskBooks = useMemo(() => {
    return initialBooksDatabase.filter((b) => bookmarkedIds.has(b.id));
  }, [bookmarkedIds]);

  // Departments List
  const departments = [
    "All",
    "CSE",
    "AI & ML",
    "Data Science",
    "ECE",
    "Mechanical",
    "Aerospace",
    "Biotechnology",
    "Civil"
  ];

  const sectionVariant: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 240,
        damping: 24
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-white pb-24">
      {/* ── 1. Hero Showcase with Radial Book Wheel ─────────────── */}
      <section className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs relative overflow-hidden mb-6 mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left Column: Synced Active Book Information Panel */}
            <div className="lg:col-span-6 xl:col-span-5 z-10 flex flex-col justify-center h-full">
              <ActiveBookDetail
                book={activeBook}
                interaction={activeBook ? initialUserInteractions[activeBook.id] : undefined}
                isBookmarked={isCurrentBookmarked}
                onToggleBookmark={handleToggleBookmark}
                onOpenReader={(b) => setReaderModalBook(b)}
              />
            </div>

            {/* Right Column: Dynamic Radial 3D Book Wheel */}
            <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center relative min-h-[360px] sm:min-h-[460px] md:min-h-[520px]">
              <RotatingBookWheel
                books={featuredBooks}
                activeIndex={activeBookIndex}
                onSelectBook={(idx) => setActiveBookIndex(idx)}
                isAutoPlaying={isAutoPlaying}
                onToggleAutoPlay={() => setIsAutoPlaying((prev) => !prev)}
                radius={205}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Library Infrastructure Features Strip ───────────── */}
      <section className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs mb-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-neutral-100 dark:divide-neutral-800 text-xs">
          <div className="p-5 sm:p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-neutral-900 text-sm">RFID Automated</div>
              <div className="text-neutral-500 text-[11px]">Instant self-checkout kiosks</div>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
              <MonitorUp className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-neutral-900 text-sm">OPAC Integrated</div>
              <div className="text-neutral-500 text-[11px]">Real-time 4-level shelf tracking</div>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-neutral-900 text-sm">Global E-Vault</div>
              <div className="text-neutral-500 text-[11px]">IEEE, Springer, ScienceDirect</div>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="font-bold text-neutral-900 text-sm">14-Day Study Streak</div>
              <div className="text-neutral-500 text-[11px]">380 mins logged this week</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Active Study Desk Strip (Bookmarked Favorites) ──── */}
      {deskBooks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
              <h2 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
                My Study Desk ({deskBooks.length} Pinned Volumes)
              </h2>
            </div>
            <span className="text-xs text-neutral-400 font-mono">
              Synchronized to Profile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deskBooks.map((book) => {
              const interaction = initialUserInteractions[book.id];
              return (
                <div
                  key={book.id}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-4 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-12 h-18 object-cover rounded-md border border-neutral-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded border border-neutral-200 bg-neutral-50 text-neutral-700 uppercase">
                        {book.department}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-950 truncate mt-1">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 truncate">
                        {book.author}
                      </p>
                    </div>
                  </div>

                  {interaction && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                        <span>Progress</span>
                        <span className="font-medium text-neutral-700">{interaction.progressPercentage}%</span>
                      </div>
                      <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-900 rounded-full"
                          style={{ width: `${interaction.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => setReaderModalBook(book)}
                      className="font-medium text-neutral-900 hover:text-neutral-600 flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Continue</span>
                    </button>
                    <button
                      onClick={() => handleToggleBookmark(book.id)}
                      className="text-[11px] text-neutral-400 hover:text-neutral-700 cursor-pointer font-mono"
                      title="Remove from Desk"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 4. Search & Academic Department Filter Strip (Emil Kowalski Polish) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="bg-white border border-neutral-200/80 rounded-[28px] p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Bar Harmonized to Top Global Search Bar */}
            <div className="relative w-full lg:max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search OPAC catalog by title, author, or ISBN..."
                className="w-full pl-11 pr-4 h-11 rounded-full bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 dark:focus:ring-white/10 transition-all outline-none"
              />
            </div>

            {/* Department Filter Pills with Emil Kowalski Gliding Spring */}
            <div className="w-full lg:w-auto overflow-x-auto scrollbar-none pb-1">
              <div className="relative bg-neutral-100/80 p-1 rounded-full flex items-center gap-1 min-w-max">
                {departments.map((dept) => {
                  const isSelected = selectedDepartment === dept;
                  return (
                    <motion.button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      whileTap={{ scale: 0.94 }}
                      whileHover={{ y: -1 }}
                      layout
                      className={cn(
                        "relative px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer select-none transition-colors duration-200 z-10",
                        isSelected
                          ? "text-neutral-950 font-semibold"
                          : "text-neutral-600 hover:text-neutral-900"
                      )}
                    >
                      {/* Animated Floating Background Pill */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeFilterPill"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          className="absolute inset-0 bg-white rounded-full shadow-xs border border-neutral-200/60 z-[-1]"
                        />
                      )}
                      <span>{dept}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 5. Full Central Catalog Collection Grid ───────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
            Academic Vault Catalog ({filteredCatalog.length} Volumes Available)
          </h2>
          <span className="text-xs text-neutral-500">
            LPU Central Library System
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCatalog.map((book) => {
            const isBookmarked = bookmarkedIds.has(book.id);

            return (
              <motion.div
                key={book.id}
                variants={sectionVariant}
                className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden flex flex-col shadow-xs hover:shadow-md hover:border-neutral-300 transition-all group"
              >
                {/* Book Cover Banner */}

                <div className="relative h-52 bg-neutral-950 overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-xs">
                      {book.department}
                    </span>
                    <button
                      onClick={() => handleToggleBookmark(book.id)}
                      className={cn(
                        "w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs",
                        isBookmarked
                          ? "bg-amber-400 text-neutral-950 shadow-xs"
                          : "bg-black/50 text-white hover:bg-black/70"
                      )}
                      title={isBookmarked ? "Remove from Desk" : "Bookmark to Desk"}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Rating Pill */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-1 font-medium text-[11px]">
                      <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{book.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[10px] text-neutral-300">
                      {book.pages} Pages
                    </span>
                  </div>
                </div>

                {/* Book Info Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-neutral-950 line-clamp-1 leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-normal mt-0.5 truncate">
                      {book.author}
                    </p>
                    <p className="text-xs text-neutral-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {book.synopsis}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-neutral-400">
                      {book.callNumber || `ISBN ${book.isbn.substring(0, 10)}`}
                    </span>
                    <button
                      onClick={() => setReaderModalBook(book)}
                      className="font-medium text-neutral-900 hover:text-neutral-600 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* ── 6. Directory by Floor Level (Levels 2 to 5) ───────── */}
      <section className="p-8 lg:p-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-950 mb-8">
          Directory by Level
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 - LEVEL 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-slate-950 mb-2">LEVEL 2</h3>
            <p className="text-sm text-slate-600 mb-6">General Reading & Periodicals</p>
            <div className="flex flex-wrap">
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Competitive Exams</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Reasoning and Aptitude</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Language ability</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Biography</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Fiction</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Novels</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Journals</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Magazines</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Newspapers</span>
            </div>
          </div>

          {/* Card 2 - LEVEL 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-slate-950 mb-2">LEVEL 3</h3>
            <p className="text-sm text-slate-600 mb-6">Core Sciences</p>
            <div className="flex flex-wrap">
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Physics</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Chemistry</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Mathematics</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Biology</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Zoology</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Botany</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Biotechnology</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Biochemistry</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Microbiology</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Agriculture</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Environmental Sciences</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Reference Books</span>
            </div>
          </div>

          {/* Card 3 - LEVEL 4 */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-slate-950 mb-2">LEVEL 4</h3>
            <p className="text-sm text-slate-600 mb-6">Engineering & Technology</p>
            <div className="flex flex-wrap">
              <span className="inline-block px-2 py-1 bg-slate-900 text-white font-mono text-[10px] uppercase tracking-wider rounded mr-2 mb-2">Computer Science & Engineering</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Electrical Engineering</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Electronics & Communication</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Mechanical</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Civil</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Environmental Sciences</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Chemical</span>
            </div>
          </div>

          {/* Card 4 - LEVEL 5 */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-slate-950 mb-2">LEVEL 5</h3>
            <p className="text-sm text-slate-600 mb-6">Advanced & Humanities</p>
            <div className="flex flex-wrap">
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Management</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Medicine</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Law</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Scriptures</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Accounting</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Education</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Languages</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Sociology</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Psychology</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Fashion</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Economics</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Applied Arts</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Text Reference Books</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Thesis & Dissertations</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Rare Books</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Conference Proceedings</span>
              <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-mono text-[10px] uppercase tracking-wider rounded border border-slate-200 mr-2 mb-2">Bound Journals</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Stats Banner ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-slate-950 rounded-3xl p-8 sm:p-12 text-white grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 border border-slate-800">
          <div className="flex flex-col items-center lg:items-start lg:pl-6 text-center lg:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">30 Lakh+</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Volumes & Print Titles</div>
          </div>

          <div className="flex flex-col items-center lg:items-start lg:pl-6 text-center lg:text-left pt-4 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">4</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Dedicated Library Levels</div>
          </div>

          <div className="flex flex-col items-center lg:items-start lg:pl-6 text-center lg:text-left pt-4 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">100%</div>
            <div className="text-xs text-slate-400 font-mono mt-1">RFID Automated Kiosks</div>
          </div>

          <div className="flex flex-col items-center lg:items-start lg:pl-6 text-center lg:text-left pt-4 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">24/7</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Global E-Vault Access</div>
          </div>
        </div>
      </section>

      {/* ── 8. Interactive Digital Reader Modal ───────────────── */}
      <DigitalReaderModal
        book={readerModalBook}
        isOpen={Boolean(readerModalBook)}
        onClose={() => setReaderModalBook(null)}
        isBookmarked={readerModalBook ? bookmarkedIds.has(readerModalBook.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}

