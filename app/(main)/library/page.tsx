"use client";

import { motion, AnimatePresence } from "motion/react";
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
  Server
} from "lucide-react";
import { cn } from "cn";

const Library = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="min-h-screen bg-slate-50 text-slate-900 pb-20"
      >
        {/* Hero Section */}
        <motion.section
          variants={sectionVariant}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-16 border-b border-slate-200 bg-white"
        >
          {/* Left Column - Copy & Actions */}
          <div className="space-y-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 block">
              LPU Central Library
            </span>

            <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              The Ultimate Knowledge Hub.
            </h1>

            <p className="text-lg text-slate-600 mt-4 max-w-lg">
              Access global e-databases, locate physical volumes across 4 levels, and manage your OPAC automated issues in one seamless workspace.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-slate-950 text-white px-6 py-3 rounded-md font-semibold hover:bg-slate-800 transition-colors">
                Access E-Databases
              </button>
              <button className="bg-transparent border border-slate-300 text-slate-900 px-6 py-3 rounded-md font-semibold hover:bg-slate-50">
                Search OPAC Catalog
              </button>
            </div>
          </div>

          {/* Right Column - Engineered Graphic */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-100 bg-slate-50 rounded-lg p-6 flex flex-col items-center justify-center gap-3">
              <Database className="w-8 h-8 text-slate-400" />
              <div className="text-xs font-mono text-slate-500">DATABASE</div>
            </div>
            <div className="border border-slate-100 bg-slate-50 rounded-lg p-6 flex flex-col items-center justify-center gap-3">
              <Server className="w-8 h-8 text-slate-400" />
              <div className="text-xs font-mono text-slate-500">SERVER</div>
            </div>
            <div className="border border-slate-100 bg-slate-50 rounded-lg p-6 flex flex-col items-center justify-center gap-3">
              <BookOpen className="w-8 h-8 text-slate-400" />
              <div className="text-xs font-mono text-slate-500">LIBRARY</div>
            </div>
            <div className="border border-slate-100 bg-slate-50 rounded-lg p-6 flex flex-col items-center justify-center gap-3">
              <Fingerprint className="w-8 h-8 text-slate-400" />
              <div className="text-xs font-mono text-slate-500">RFID</div>
            </div>
          </div>
        </motion.section>

        {/* Features Strip */}
        <motion.section
          variants={sectionVariant}
          className="grid grid-cols-2 lg:grid-cols-4 bg-white border-b border-slate-200 divide-x divide-y lg:divide-y-0 divide-slate-100"
        >
          <div className="p-6 flex flex-col gap-2">
            <ScanLine className="w-6 h-6 text-slate-600" />
            <div className="font-bold text-sm">RFID Automated</div>
            <div className="text-xs text-slate-500">Instant issue & return</div>
          </div>

          <div className="p-6 flex flex-col gap-2">
            <MonitorUp className="w-6 h-6 text-slate-600" />
            <div className="font-bold text-sm">OPAC Integrated</div>
            <div className="text-xs text-slate-500">Real-time shelf tracking</div>
          </div>

          <div className="p-6 flex flex-col gap-2">
            <Globe className="w-6 h-6 text-slate-600" />
            <div className="font-bold text-sm">Global E-Resources</div>
            <div className="text-xs text-slate-500">IEEE, Springer & more</div>
          </div>

          <div className="p-6 flex flex-col gap-2">
            <Users className="w-6 h-6 text-slate-600" />
            <div className="font-bold text-sm">Study Pods</div>
            <div className="text-xs text-slate-500">Collaborative zones</div>
          </div>
        </motion.section>

        {/* Browse by Floor Level */}
        <motion.section
          variants={sectionVariant}
          className="p-8 lg:p-16 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-extrabold text-slate-950 mb-8">
            Directory by Level
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 - LEVEL 2 */}
            <motion.div variants={sectionVariant} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col">
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
            </motion.div>

            {/* Card 2 - LEVEL 3 */}
            <motion.div variants={sectionVariant} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col">
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
            </motion.div>

            {/* Card 3 - LEVEL 4 */}
            <motion.div variants={sectionVariant} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col">
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
            </motion.div>

            {/* Card 4 - LEVEL 5 */}
            <motion.div variants={sectionVariant} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col">
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
            </motion.div>
          </div>
        </motion.section>

        {/* Featured CSE Collections */}
        <motion.section
          variants={sectionVariant}
          className="p-8 lg:p-16 max-w-7xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-slate-950 mt-16 mb-6">
            Featured B.Tech CSE Texts (Level 4)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Book Card 1 */}
            <motion.div variants={sectionVariant} className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
              <div className="h-48 bg-slate-100 border-b border-slate-200 flex items-center justify-center p-6 text-center">
                <BookOpen className="w-12 h-12 text-slate-400" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-sm text-slate-950 mb-1">Operating System Concepts</h3>
                <p className="text-xs text-slate-600 mb-4">Silberschatz, Galvin</p>
                <div className="text-xs font-mono text-slate-500">Shelf 4B-102</div>
                <button className="mt-auto pt-4 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-slate-600 flex items-center gap-1">
                  Reserve via OPAC <ArrowRight size={14}/>
                </button>
              </div>
            </motion.div>

            {/* Book Card 2 */}
            <motion.div variants={sectionVariant} className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
              <div className="h-48 bg-slate-100 border-b border-slate-200 flex items-center justify-center p-6 text-center">
                <Database className="w-12 h-12 text-slate-400" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-sm text-slate-950 mb-1">Introduction to Algorithms</h3>
                <p className="text-xs text-slate-600 mb-4">Cormen, Leiserson</p>
                <div className="text-xs font-mono text-slate-500">Shelf 4B-105</div>
                <button className="mt-auto pt-4 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-slate-600 flex items-center gap-1">
                  Reserve via OPAC <ArrowRight size={14}/>
                </button>
              </div>
            </motion.div>

            {/* Book Card 3 */}
            <motion.div variants={sectionVariant} className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
              <div className="h-48 bg-slate-100 border-b border-slate-200 flex items-center justify-center p-6 text-center">
                <ScanLine className="w-12 h-12 text-slate-400" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-sm text-slate-950 mb-1">Computer Networking</h3>
                <p className="text-xs text-slate-600 mb-4">Kurose, Ross</p>
                <div className="text-xs font-mono text-slate-500">Shelf 4C-201</div>
                <button className="mt-auto pt-4 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-slate-600 flex items-center gap-1">
                  Reserve via OPAC <ArrowRight size={14}/>
                </button>
              </div>
            </motion.div>

            {/* Book Card 4 */}
            <motion.div variants={sectionVariant} className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
              <div className="h-48 bg-slate-100 border-b border-slate-200 flex items-center justify-center p-6 text-center">
                <MonitorUp className="w-12 h-12 text-slate-400" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-sm text-slate-950 mb-1">Database System Concepts</h3>
                <p className="text-xs text-slate-600 mb-4">Korth, Sudarshan</p>
                <div className="text-xs font-mono text-slate-500">Shelf 4C-204</div>
                <button className="mt-auto pt-4 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-slate-600 flex items-center gap-1">
                  Reserve via OPAC <ArrowRight size={14}/>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Banner */}
        <motion.section
          variants={sectionVariant}
          className="mt-16 bg-slate-950 rounded-2xl p-10 text-white grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800"
        >
          <div className="flex flex-col items-center lg:items-start lg:pl-8 text-center lg:text-left">
            <div className="text-4xl font-extrabold">30 Lakh+</div>
            <div className="text-sm text-slate-400 font-mono mt-2">Volumes & Titles</div>
          </div>

          <div className="flex flex-col items-center lg:items-start lg:pl-8 text-center lg:text-left">
            <div className="text-4xl font-extrabold">4</div>
            <div className="text-sm text-slate-400 font-mono mt-2">Dedicated Levels</div>
          </div>

          <div className="flex flex-col items-center lg:items-start lg:pl-8 text-center lg:text-left">
            <div className="text-4xl font-extrabold">100%</div>
            <div className="text-sm text-slate-400 font-mono mt-2">RFID Enabled</div>
          </div>

          <div className="flex flex-col items-center lg:items-start lg:pl-8 text-center lg:text-left">
            <div className="text-4xl font-extrabold">24/7</div>
            <div className="text-sm text-slate-400 font-mono mt-2">E-Database Access</div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
};

export default Library;
