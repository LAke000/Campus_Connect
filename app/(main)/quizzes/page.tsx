"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import {
  Calculator,
  Terminal,
  Cpu,
  Beaker,
  BookOpen,
  Code,
  Brain,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { cn } from "cn";

const Questions = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] // Custom cubic bezier for spring physics
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const textColumnVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const graphicColumnVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.3
      }
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.5
      }
    }
  };

  const subjectCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <AnimatePresence>
      {mounted && (
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="min-h-screen bg-slate-50"
        >
          {/* Hero Section */}
          <motion.section
            variants={heroVariants}
            className="relative bg-slate-50 border-b border-slate-200"
          >
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Column - Text Content */}
                <motion.div variants={textColumnVariants} className="space-y-6">
                  <motion.div
                    variants={itemVariants}
                    className="inline-block bg-slate-900 text-white font-mono text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider"
                  >
                    DYNAMIC EXAM ENGINE
                  </motion.div>

                  <motion.h1
                    variants={itemVariants}
                    className="text-4xl font-extrabold tracking-tight text-slate-950 mt-4 leading-tight"
                  >
                    Practice Quizzes & CBT Simulators
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="text-slate-600 mt-2 text-lg leading-relaxed"
                  >
                    Sharpen your speed, accuracy, and concepts with targeted chapter-wise assessments and full-length mock exams.
                  </motion.p>

                  <motion.div variants={itemVariants} className="mt-8">
                    <button className="bg-slate-900 text-white px-6 py-3 font-semibold text-sm uppercase tracking-wider rounded-sm hover:bg-slate-800 transition-colors">
                      Generate Custom Test
                    </button>
                  </motion.div>
                </motion.div>

                {/* Right Column - Engineered Visual Element */}
                <motion.div variants={graphicColumnVariants} className="relative">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-sm">
                        <Terminal className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="font-mono text-xs text-slate-500">IDE TERMINAL</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="font-mono text-xs text-slate-400">Ready for session</div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 font-mono text-xs text-slate-600">
                        <div className="text-slate-400 mb-2">$ initialize-quiz-engine</div>
                        <div className="text-slate-500">Loading assessments...</div>
                        <div className="text-blue-600 mt-2">✓ Engineering Mathematics</div>
                        <div className="text-green-600 mt-1">✓ Programming in C</div>
                        <div className="text-purple-600 mt-1">✓ Digital Logic</div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full">
                            <div className="w-10 h-2 bg-slate-900 rounded-full"></div>
                          </div>
                          <span className="font-mono text-xs text-slate-500">68%</span>
                        </div>
                        <div className="text-xs text-slate-600">Session Active</div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-slate-900/5 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-slate-900/5 rounded-full blur-2xl"></div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Navigation Pills */}
          <motion.section
            variants={navVariants}
            className="bg-white border-y border-slate-200 sticky top-0 z-40 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-6 py-3">
              <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  JUMP TO:
                </div>
                <div className="flex gap-2">
                  {[
                    "B.Tech CSE - Year 1",
                    "Core Electives",
                    "Lab Practicals",
                    "Full Papers"
                  ].map((item, index) => (
                    <motion.button
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 whitespace-nowrap",
                        index === 0
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Content Sections */}
          <motion.section
            variants={containerVariants}
            className="max-w-7xl mx-auto px-6 py-16"
          >
            {/* Section Header for B.Tech CSE - Year 1 */}
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">B.Tech CSE - Year 1</h2>
              <p className="text-sm text-slate-500 mt-2">Subject-wise chapter tests — Engineering Mathematics, Physics, and C Programming</p>
            </motion.div>

            {/* Subject Cards Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Engineering Mathematics Card */}
              <motion.div
                variants={subjectCardVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-sm">
                    <Calculator className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="font-mono text-xs text-slate-400">120 Tests</div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-4">Engineering Mathematics</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Advanced calculus, differential equations, and mathematical modeling for engineering applications.
                </p>

                <div className="mt-4">
                  <a href="#" className="text-slate-900 font-semibold text-sm hover:underline mt-4 inline-block">
                    Start Quiz →
                  </a>
                </div>
              </motion.div>

              {/* Programming in C Card */}
              <motion.div
                variants={subjectCardVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-sm">
                    <Terminal className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="font-mono text-xs text-slate-400">85 Tests</div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-4">Programming in C</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Fundamental programming concepts, control structures, functions, and memory management in C.
                </p>

                <div className="mt-4">
                  <a href="#" className="text-slate-900 font-semibold text-sm hover:underline mt-4 inline-block">
                    Start Quiz →
                  </a>
                </div>
              </motion.div>

              {/* Digital Logic Card */}
              <motion.div
                variants={subjectCardVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-sm">
                    <Cpu className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="font-mono text-xs text-slate-400">60 Tests</div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-4">Digital Logic</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Logic gates, boolean algebra, combinational and sequential circuit design and analysis.
                </p>

                <div className="mt-4">
                  <a href="#" className="text-slate-900 font-semibold text-sm hover:underline mt-4 inline-block">
                    Start Quiz →
                  </a>
                </div>
              </motion.div>

              {/* Data Structures Card */}
              <motion.div
                variants={subjectCardVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-sm">
                    <BookOpen className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="font-mono text-xs text-slate-400">92 Tests</div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-4">Data Structures</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Arrays, linked lists, stacks, queues, trees, graphs, and their algorithmic applications.
                </p>

                <div className="mt-4">
                  <a href="#" className="text-slate-900 font-semibold text-sm hover:underline mt-4 inline-block">
                    Start Quiz →
                  </a>
                </div>
              </motion.div>

              {/* Algorithm Analysis Card */}
              <motion.div
                variants={subjectCardVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-sm">
                    <Brain className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="font-mono text-xs text-slate-400">78 Tests</div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-4">Algorithm Analysis</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Complexity analysis, sorting algorithms, searching techniques, and optimization strategies.
                </p>

                <div className="mt-4">
                  <a href="#" className="text-slate-900 font-semibold text-sm hover:underline mt-4 inline-block">
                    Start Quiz →
                  </a>
                </div>
              </motion.div>

              {/* Database Management Card */}
              <motion.div
                variants={subjectCardVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-sm">
                    <BarChart3 className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="font-mono text-xs text-slate-400">54 Tests</div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-4">Database Management</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Relational database concepts, SQL queries, transactions, and data normalization techniques.
                </p>

                <div className="mt-4">
                  <a href="#" className="text-slate-900 font-semibold text-sm hover:underline mt-4 inline-block">
                    Start Quiz →
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Questions;
