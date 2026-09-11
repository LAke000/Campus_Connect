"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Clock,
  Sparkles,
  HelpCircle,
  Code2,
  BookOpen,
  Award,
  Zap,
  Check,
  ChevronRight,
  TrendingUp,
  Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Chapter, Subject, QuizQuestion } from "@/types/curriculum";

export interface QuizRunnerProps {
  chapter: Chapter;
  subject?: Subject;
  onExit?: () => void;
  onComplete?: (results: {
    totalQuestions: number;
    correctCount: number;
    incorrectCount: number;
    accuracyPercentage: number;
    timeSpentSeconds: number;
  }) => void;
}

interface UserAnswerState {
  selectedIndex: number; // 0, 1, 2, 3
  isCorrect: boolean;
  timeSpentSeconds?: number;
}

export function QuizRunner({
  chapter,
  subject,
  onExit,
  onComplete
}: QuizRunnerProps) {
  const questions: QuizQuestion[] = chapter.quizQuestions || [];
  const totalQuestions = questions.length;

  // ── State Management ──────────────────────────────────────────
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, UserAnswerState>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);

  // Timer interval
  useEffect(() => {
    if (!isTimerRunning || isQuizCompleted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isQuizCompleted]);

  // Format timer string MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];
  const isCurrentAnswered = currentAnswer !== undefined;

  // ── Summary Metrics ───────────────────────────────────────────
  const summaryMetrics = useMemo(() => {
    const answeredEntries = Object.values(userAnswers);
    const correctCount = answeredEntries.filter((a) => a.isCorrect).length;
    const incorrectCount = answeredEntries.length - correctCount;
    const accuracyPercentage =
      totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      answeredCount: answeredEntries.length,
      correctCount,
      incorrectCount,
      accuracyPercentage,
      timeSpentSeconds: timerSeconds
    };
  }, [userAnswers, totalQuestions, timerSeconds]);

  // Handle Option Click
  const handleSelectOption = (optionIndex: number) => {
    if (isCurrentAnswered && !isReviewMode) return; // Prevent changing after selection
    if (!currentQuestion) return;

    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        selectedIndex: optionIndex,
        isCorrect
      }
    }));
  };

  // Handle Finish Quiz
  const handleFinishQuiz = () => {
    setIsQuizCompleted(true);
    setIsTimerRunning(false);
    onComplete?.({
      totalQuestions,
      correctCount: summaryMetrics.correctCount,
      incorrectCount: summaryMetrics.incorrectCount,
      accuracyPercentage: summaryMetrics.accuracyPercentage,
      timeSpentSeconds: timerSeconds
    });
  };

  // Handle Next
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  // Handle Previous
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Handle Retry
  const handleRetryQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setTimerSeconds(0);
    setIsQuizCompleted(false);
    setIsReviewMode(false);
    setIsTimerRunning(true);
  };

  // Fallback if no questions are configured
  if (totalQuestions === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-200">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-3" />
        <h3 className="text-xl font-bold text-slate-900">No Questions Configured</h3>
        <p className="text-slate-500 text-sm max-w-md mt-1 mb-6">
          This unit has not been populated with practice assessment items yet.
        </p>
        <button
          onClick={onExit}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
        >
          ← Return to Curriculum
        </button>
      </div>
    );
  }

  // ── Summary Screen View ───────────────────────────────────────
  if (isQuizCompleted && !isReviewMode) {
    const isPassing = summaryMetrics.accuracyPercentage >= 70;
    const isMastery = summaryMetrics.accuracyPercentage >= 90;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6"
      >
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Decorative Top Accent Glow */}
          <div
            className={cn(
              "absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl opacity-20 pointer-events-none",
              isMastery
                ? "bg-emerald-500"
                : isPassing
                ? "bg-blue-500"
                : "bg-amber-500"
            )}
          />

          {/* Celebration Header */}
          <div className="text-center space-y-3 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-white shadow-lg mx-auto mb-2">
              <Trophy
                className={cn(
                  "w-8 h-8",
                  isMastery
                    ? "text-yellow-400 animate-bounce"
                    : isPassing
                    ? "text-blue-400"
                    : "text-amber-400"
                )}
              />
            </div>

            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
              Diagnostic Assessment Complete
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {isMastery
                ? "Outstanding Mastery! 🎉"
                : isPassing
                ? "Great Job! You Passed! 🏆"
                : "Good Effort! Keep Practicing 📚"}
            </h2>

            <p className="text-slate-600 text-sm max-w-lg mx-auto">
              Unit {chapter.chapterNumber}: {chapter.title}
              {subject && ` • [${subject.code}] ${subject.name}`}
            </p>
          </div>

          {/* Score Matrix Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-8 relative z-10">
            {/* Score */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                Final Score
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-950">
                {summaryMetrics.correctCount}{" "}
                <span className="text-sm font-semibold text-slate-400">
                  / {totalQuestions}
                </span>
              </div>
            </div>

            {/* Accuracy */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                Accuracy
              </span>
              <div
                className={cn(
                  "text-2xl sm:text-3xl font-black",
                  summaryMetrics.accuracyPercentage >= 70
                    ? "text-emerald-600"
                    : "text-amber-600"
                )}
              >
                {summaryMetrics.accuracyPercentage}%
              </div>
            </div>

            {/* Total Time */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                Time Taken
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                {formatTime(timerSeconds)}
              </div>
            </div>

            {/* Avg Speed */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                Avg / Question
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                {totalQuestions > 0
                  ? Math.round(timerSeconds / totalQuestions)
                  : 0}
                s
              </div>
            </div>
          </div>

          {/* Detailed Question Review Matrix */}
          <div className="border-t border-slate-100 pt-6 my-6 relative z-10">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
              Performance Breakdown by Question
            </h4>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((q, idx) => {
                const ans = userAnswers[idx];
                const isCorrect = ans?.isCorrect;
                const isAnswered = ans !== undefined;

                return (
                  <button
                    key={q.id || idx}
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      setIsReviewMode(true);
                    }}
                    className={cn(
                      "h-10 rounded-xl font-mono text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer border",
                      isCorrect
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                        : isAnswered
                        ? "bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    )}
                  >
                    <span>{idx + 1}</span>
                    <span className="text-[9px] scale-90">
                      {isCorrect ? "✓" : isAnswered ? "✕" : "-"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 relative z-10">
            <button
              onClick={onExit}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Exit to Curriculum</span>
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  setIsReviewMode(true);
                  setCurrentQuestionIndex(0);
                }}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Review Explanations</span>
              </button>

              <button
                onClick={handleRetryQuiz}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Active Question Taking Engine ─────────────────────────────
  const progressPercentage =
    totalQuestions > 0
      ? Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)
      : 0;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* ── 1. Top Bar: Chapter Title, Counter, Timer, Progress Bar ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer shrink-0"
              title="Exit Assessment"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                {subject && (
                  <span className="font-mono text-[10px] font-extrabold bg-slate-900 text-white px-2 py-0.5 rounded-sm">
                    {subject.code}
                  </span>
                )}
                <span className="text-xs font-bold text-slate-800">
                  Unit {chapter.chapterNumber}: {chapter.title}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Live Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatTime(timerSeconds)}</span>
            </div>

            {/* Question Counter */}
            <div className="px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-xs font-bold text-blue-700 font-mono">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
          </div>
        </div>

        {/* Live Smooth Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Progress: {Object.keys(userAnswers).length} answered</span>
            <span>{progressPercentage}% Complete</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-slate-900 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* ── 2. Quick Nav Bar: 1-to-N / 1-to-20 Bubble Grid ────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono font-bold uppercase text-slate-400">
            Quick Navigation Palette
          </span>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Correct
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span> Incorrect
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-300"></span> Unanswered
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pb-1">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentQuestionIndex;
            const ans = userAnswers[idx];
            const isAnswered = ans !== undefined;
            const isCorrect = ans?.isCorrect;

            return (
              <button
                key={q.id || idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={cn(
                  "w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-mono text-xs font-bold transition-all duration-150 flex items-center justify-center shrink-0 cursor-pointer border",
                  isCurrent
                    ? "ring-2 ring-slate-900 ring-offset-2 border-slate-900 bg-slate-900 text-white shadow-sm"
                    : isCorrect
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                    : isAnswered
                    ? "bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                )}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. Question Card & Instant Feedback Options ─────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
        >
          {/* Question Header & Difficulty Tag */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded bg-slate-100 text-slate-800">
                Q.{currentQuestionIndex + 1}
              </span>
              <span
                className={cn(
                  "font-mono text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wide",
                  currentQuestion.difficulty === "Easy"
                    ? "bg-emerald-100 text-emerald-800"
                    : currentQuestion.difficulty === "Medium"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-rose-100 text-rose-800"
                )}
              >
                {currentQuestion.difficulty}
              </span>
            </div>

            {isReviewMode && (
              <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded font-semibold border border-blue-200">
                Review Mode
              </span>
            )}
          </div>

          {/* Question Statement */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-950 leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Optional Syntax Highlighted Code Snippet Block */}
            {currentQuestion.codeSnippet && (
              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-md">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 font-mono text-[11px] text-slate-400">
                      Code Specification
                    </span>
                  </div>
                  <Code2 className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <pre className="p-4 text-emerald-400 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                  <code>{currentQuestion.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>

          {/* 4 Option Buttons with Hover Scale & Instant Answer Reveal */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block mb-1">
              Select One Option:
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              {currentQuestion.options.map((optionText, optionIdx) => {
                const isSelected =
                  currentAnswer?.selectedIndex === optionIdx;
                const isTheCorrectOption =
                  optionIdx === currentQuestion.correctAnswerIndex;

                let optionStyle =
                  "bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-800";
                let badgeStyle = "bg-slate-200 text-slate-700";

                if (isCurrentAnswered) {
                  if (isSelected) {
                    if (currentAnswer.isCorrect) {
                      optionStyle =
                        "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500 shadow-sm";
                      badgeStyle = "bg-emerald-600 text-white";
                    } else {
                      optionStyle =
                        "bg-rose-50 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-500 shadow-sm";
                      badgeStyle = "bg-rose-600 text-white";
                    }
                  } else if (isTheCorrectOption) {
                    // Show where the correct answer was if user picked wrong
                    optionStyle =
                      "bg-emerald-50/60 border-emerald-300 text-emerald-900 border-dashed font-medium";
                    badgeStyle = "bg-emerald-200 text-emerald-800";
                  } else {
                    optionStyle =
                      "bg-slate-50/40 border-slate-200 text-slate-400 opacity-60";
                    badgeStyle = "bg-slate-100 text-slate-400";
                  }
                }

                return (
                  <motion.button
                    key={optionIdx}
                    whileHover={{ scale: isCurrentAnswered ? 1 : 1.01 }}
                    whileTap={{ scale: isCurrentAnswered ? 1 : 0.99 }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    onClick={() => handleSelectOption(optionIdx)}
                    disabled={isCurrentAnswered && !isReviewMode}
                    className={cn(
                      "w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer",
                      optionStyle
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors",
                          badgeStyle
                        )}
                      >
                        {String.fromCharCode(65 + optionIdx)}
                      </span>
                      <span className="text-xs sm:text-sm">{optionText}</span>
                    </div>

                    {isCurrentAnswered && (
                      <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono font-bold">
                        {isSelected && currentAnswer.isCorrect && (
                          <span className="flex items-center gap-1 text-emerald-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Correct
                          </span>
                        )}
                        {isSelected && !currentAnswer.isCorrect && (
                          <span className="flex items-center gap-1 text-rose-600">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            Incorrect
                          </span>
                        )}
                        {!isSelected && isTheCorrectOption && (
                          <span className="text-[11px] bg-emerald-600 text-white px-2 py-0.5 rounded font-mono font-semibold">
                            Correct Answer
                          </span>
                        )}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Detailed Technical Explanation Box Animated In */}
          <AnimatePresence>
            {isCurrentAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div
                  className={cn(
                    "p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-2 mt-2",
                    currentAnswer.isCorrect
                      ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                      : "bg-blue-50/70 border-blue-200 text-blue-950"
                  )}
                >
                  <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Technical Concept & Logic Breakdown</span>
                  </div>

                  <p className="leading-relaxed text-slate-700 text-xs sm:text-sm font-normal">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls: Previous, Next / Finish */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 gap-3">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={cn(
                "px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                currentQuestionIndex === 0
                  ? "opacity-40 cursor-not-allowed bg-slate-50 text-slate-400"
                  : "bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {isReviewMode && (
                <button
                  onClick={() => setIsReviewMode(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Back to Summary
                </button>
              )}

              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
              >
                <span>
                  {currentQuestionIndex === totalQuestions - 1
                    ? "Finish & View Results"
                    : "Next Question"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default QuizRunner;
