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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* ── 1. Hero Showcase with Radial Book Wheel ─────────────── */}
      <section className="bg-white border-b border-slate-200 shadow-2xs relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Synced Active Book Information Panel */}
            <div className="lg:col-span-6 xl:col-span-5 z-10">
              <ActiveBookDetail
                book={activeBook}
                interaction={activeBook ? initialUserInteractions[activeBook.id] : undefined}
                isBookmarked={isCurrentBookmarked}
                onToggleBookmark={handleToggleBookmark}
                onOpenReader={(b) => setReaderModalBook(b)}
                searchBar={
                  <CatalogSearchBar
                    books={initialBooksDatabase}
                    featuredBooks={featuredBooks}
                    onSelectBook={(selectedBook) => {
                      setReaderModalBook(selectedBook);
                    }}
                    onJumpToWheelIndex={(wheelIndex) => {
                      setActiveBookIndex(wheelIndex);
                      setIsAutoPlaying(false);
                    }}
                  />
                }
              />
            </div>


            {/* Right Column: Dynamic Radial 3D Book Wheel */}
            <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center relative min-h-[460px] sm:min-h-[520px]">
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
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100 text-xs">
          <div className="p-5 sm:p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">RFID Automated</div>
              <div className="text-slate-500 font-mono text-[11px]">Instant self-checkout kiosks</div>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MonitorUp className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">OPAC Integrated</div>
              <div className="text-slate-500 font-mono text-[11px]">Real-time 4-level shelf tracking</div>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Global E-Vault</div>
              <div className="text-slate-500 font-mono text-[11px]">IEEE, Springer, ScienceDirect</div>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">14-Day Study Streak</div>
              <div className="text-slate-500 font-mono text-[11px]">380 mins logged this week</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Active Study Desk Strip (Bookmarked Favorites) ──── */}
      {deskBooks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight">
                My Active Study Desk ({deskBooks.length} Pinned Volumes)
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Synchronized to Student Profile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deskBooks.map((book) => {
              const interaction = initialUserInteractions[book.id];
              return (
                <div
                  key={book.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-14 h-20 object-cover rounded-lg border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                        {book.department}
                      </span>
                      <h4 className="text-xs font-bold text-slate-950 truncate mt-1">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate font-mono">
                        {book.author}
                      </p>
                    </div>
                  </div>

                  {interaction && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>Progress</span>
                        <span className="font-bold text-slate-700">{interaction.progressPercentage}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${interaction.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setReaderModalBook(book)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Continue</span>
                    </button>
                    <button
                      onClick={() => handleToggleBookmark(book.id)}
                      className="text-[11px] text-slate-400 hover:text-rose-500 font-mono cursor-pointer"
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

      {/* ── 4. Search & Academic Department Filter ─────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, ISBN, or keywords..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
              />
            </div>

            {/* Department Filter Pills */}
            <div className="w-full md:w-auto flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {departments.map((dept) => {
                const isSelected = selectedDepartment === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer select-none",
                      isSelected
                        ? "bg-slate-900 text-white font-bold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    )}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Full Central Catalog Collection Grid ───────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
            Academic Vault Catalog ({filteredCatalog.length} Volumes Available)
          </h2>
          <span className="text-xs font-mono text-slate-500">
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
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-2xs hover:shadow-md hover:border-slate-300 transition-all group"
              >
                {/* Book Cover Banner */}
                <div className="relative h-56 bg-slate-950 overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-900/90 text-white backdrop-blur-xs">
                      {book.department}
                    </span>
                    <button
                      onClick={() => handleToggleBookmark(book.id)}
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs",
                        isBookmarked
                          ? "bg-amber-400 text-slate-950 shadow-md"
                          : "bg-black/40 text-white hover:bg-black/60"
                      )}
                      title={isBookmarked ? "Remove from Desk" : "Bookmark to Desk"}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Rating Pill */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                    <span className="flex items-center gap-1 text-amber-300 font-bold text-[11px]">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {book.rating.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-300 font-medium">
                      {book.pages} Pages
                    </span>
                  </div>
                </div>

                {/* Book Info Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-950 line-clamp-1 leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                      {book.author}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {book.synopsis}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      {book.callNumber || `ISBN ${book.isbn.substring(0, 10)}`}
                    </span>
                    <button
                      onClick={() => setReaderModalBook(book)}
                      className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Read Copy</span>
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

