"use client";

import React, { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  CampusLocation,
  CAMPUS_CATEGORIES,
  LPU_CAMPUS_LOCATIONS,
  LocationCategory,
  LPU_CENTER_COORDS,
} from "@/data/lpuCampusData";
import {
  Search,
  MapPin,
  Navigation,
  Footprints,
  Clock,
  Sparkles,
  GraduationCap,
  Scissors,
  Utensils,
  Compass,
  X,
  SlidersHorizontal,
  ChevronRight,
  Building2,
  Layers,
  LocateFixed,
  Map as MapIcon,
  ListFilter,
  CheckCircle2,
  Info,
} from "lucide-react";

// Dynamic import with SSR disabled because Leaflet requires browser window/DOM
const CampusMap = dynamic(
  () => import("@/components/campus-locator/CampusMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[500px] rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-3 animate-pulse">
        <Compass className="size-8 text-slate-400 animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
          Loading LPU Spatial Map Engine...
        </span>
      </div>
    ),
  }
);

export default function CampusLocatorPage() {
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(
    LPU_CAMPUS_LOCATIONS[0]
  );
  const [quickFilter, setQuickFilter] = useState<string | null>(null);

  // Trigger state for smooth Leaflet camera navigation
  const [flyToCoords, setFlyToCoords] = useState<[number, number] | null>(
    LPU_CAMPUS_LOCATIONS[0].coords
  );
  const [flyToZoom, setFlyToZoom] = useState<number>(18);
  const [flyToTrigger, setFlyToTrigger] = useState<number>(Date.now());

  // Mobile drawer view mode toggle ("map" | "list")
  const [mobileTab, setMobileTab] = useState<"map" | "list">("map");

  // Filter locations based on category, search query, and secondary tags
  const filteredLocations = useMemo(() => {
    return LPU_CAMPUS_LOCATIONS.filter((loc) => {
      // 1. Category check
      if (selectedCategory !== "all" && loc.category !== selectedCategory) {
        return false;
      }

      // 2. Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = loc.name.toLowerCase().includes(q);
        const matchesBlock = loc.block.toLowerCase().includes(q);
        const matchesDesc = loc.description.toLowerCase().includes(q);
        const matchesTags = loc.popularFor.some((t) => t.toLowerCase().includes(q));
        const matchesBadge = loc.highlightBadge.toLowerCase().includes(q);

        if (!matchesName && !matchesBlock && !matchesDesc && !matchesTags && !matchesBadge) {
          return false;
        }
      }

      // 3. Quick Tag filter
      if (quickFilter) {
        if (quickFilter === "near-34" && loc.distanceMeters > 150) return false;
        if (quickFilter === "xerox" && loc.category !== "stationery") return false;
        if (quickFilter === "food" && loc.category !== "food") return false;
        if (quickFilter === "late-night" && !loc.operatingHours.includes("11:") && !loc.operatingHours.includes("24/7") && !loc.operatingHours.includes("10:")) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, quickFilter]);

  // Handle location selection with smooth flyTo
  const handleSelectLocation = useCallback((loc: CampusLocation) => {
    setSelectedLocation(loc);
    setFlyToCoords(loc.coords);
    setFlyToZoom(18);
    setFlyToTrigger(Date.now());
    // Auto switch to map on mobile when a card is clicked
    if (window.innerWidth < 1024) {
      setMobileTab("map");
    }
  }, []);

  // Reset to full campus overview
  const handleResetCenter = useCallback(() => {
    setFlyToCoords(LPU_CENTER_COORDS);
    setFlyToZoom(16);
    setFlyToTrigger(Date.now());
  }, []);

  // Category Icon helper
  const getCategoryIcon = (category: LocationCategory) => {
    switch (category) {
      case "academic":
        return <GraduationCap className="size-4 text-blue-600 dark:text-blue-400" />;
      case "stationery":
        return <Scissors className="size-4 text-amber-600 dark:text-amber-400" />;
      case "food":
        return <Utensils className="size-4 text-rose-600 dark:text-rose-400" />;
      case "landmark":
        return <Building2 className="size-4 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] min-h-[650px] space-y-4">
      {/* ── 1. Page Header & Quick Context Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950">
              <Compass className="size-4" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
              Campus Resource Locator
            </h1>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              LPU Spatial Grid
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Interactive guide for Academic Blocks, Tuck Shops, Printing Hubs, Food Courts, and Landmark Arenas.
          </p>
        </div>

        {/* Anchor Telemetry Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleResetCenter}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-xs cursor-pointer"
            title="Recenter Overview"
          >
            <LocateFixed className="size-3.5 text-blue-600 dark:text-blue-400" />
            <span>Block 34 Center</span>
          </button>

          {/* Mobile View Toggle Pills */}
          <div className="flex lg:hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setMobileTab("map")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                mobileTab === "map"
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <MapIcon className="size-3" />
              <span>Map</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("list")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                mobileTab === "list"
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <ListFilter className="size-3" />
              <span>Places ({filteredLocations.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Primary Split-Pane Viewport ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
        {/* ── Left Column: Interactive Quick-Link Control Drawer (5 cols) ── */}
        <div
          className={`lg:col-span-5 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${
            mobileTab === "map" ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Top Control Drawer Bar */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3 shrink-0">
            {/* Live Instant Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Block, Tuck Shop, Cafes, Mac Labs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Category Switcher Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CAMPUS_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Micro-Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              {[
                { id: "near-34", label: "< 2 mins from Block 34" },
                { id: "xerox", label: "Xerox & Print" },
                { id: "food", label: "Food Hubs" },
                { id: "late-night", label: "Open Late (10PM+)" },
              ].map((chip) => {
                const isChipActive = quickFilter === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setQuickFilter(isChipActive ? null : chip.id)}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                      isChipActive
                        ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950 dark:border-blue-700 dark:text-blue-300 font-bold"
                        : "bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {isChipActive ? `✓ ${chip.label}` : chip.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Staggered Scrollable Location Cards Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filteredLocations.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <Compass className="size-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  No campus locations found
                </p>
                <p className="text-xs text-slate-400">
                  Try adjusting your search query or selecting a different category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setQuickFilter(null);
                  }}
                  className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.04 },
                  },
                }}
                className="space-y-2.5"
              >
                {filteredLocations.map((loc) => {
                  const isSelected = selectedLocation?.id === loc.id;

                  return (
                    <motion.div
                      key={loc.id}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0 },
                      }}
                      onClick={() => handleSelectLocation(loc)}
                      className={`group p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                        isSelected
                          ? "bg-blue-50/60 dark:bg-blue-950/30 border-blue-400 dark:border-blue-700 shadow-md ring-2 ring-blue-500/20"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            {getCategoryIcon(loc.category)}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                {loc.block}
                              </span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                {loc.highlightBadge}
                              </span>
                            </div>

                            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug truncate">
                              {loc.name}
                            </h3>

                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {loc.roomOrFloor}
                            </p>
                          </div>
                        </div>

                        {/* Quick Distance Pill */}
                        <div className="text-right shrink-0">
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-lg border border-blue-200 dark:border-blue-800">
                            <Footprints className="size-3" />
                            ~{loc.walkingMinutesFromBlock34}m
                          </span>
                        </div>
                      </div>

                      {/* Tag Preview */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5 truncate pr-2">
                          <Clock className="size-3 shrink-0 text-slate-400" />
                          <span className="truncate">{loc.operatingHours.split("(")[0]}</span>
                        </div>

                        <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0 text-[11px]">
                          Locate
                          <ChevronRight className="size-3" />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Drawer Status Footer */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs font-mono text-slate-500 shrink-0">
            <span>Showing {filteredLocations.length} of {LPU_CAMPUS_LOCATIONS.length} nodes</span>
            <span>Ref: LPU Block 34 Hub</span>
          </div>
        </div>

        {/* ── Right Column: Interactive Leaflet Map Viewport (7 cols) ── */}
        <div
          className={`lg:col-span-7 h-full flex flex-col ${
            mobileTab === "list" ? "hidden lg:flex" : "flex"
          }`}
        >
          <CampusMap
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocation}
            flyToCoords={flyToCoords}
            flyToZoom={flyToZoom}
            flyToTrigger={flyToTrigger}
            onResetCenter={handleResetCenter}
          />
        </div>
      </div>
    </div>
  );
}
