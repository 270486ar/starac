import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck,
  Flag, AlertCircle, FileText, Award, ListChecks, Play,
  CheckCircle2, XCircle,
} from 'lucide-react';
import { getTestById } from '../data/tests';
import { getQuestionsByFilters } from '../data/questions';
import type { Question } from '../data/questions';

interface AnswerRecord {
  questionId: string;
  selectedOption: number | null;
  bookmarked: boolean;
  reviewLater: boolean;
}

interface TestResult {
  testId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  timeTaken: number; // seconds
  answers: AnswerRecord[];
  date: string;
}

const ATTEMPTS_KEY = 'test_attempts';

export default function TestPage() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const test = testId ? getTestById(testId) : undefined;
  const questions = useMemo<Question[]>(() => {
    if (!test) return [];
    return getQuestionsByFilters(test.board, test.className, test.subject, test.chapter);
  }, [test]);

  // Phase: 'intro' | 'active' | 'submitting'
  const [phase, setPhase] = useState<'intro' | 'active'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const startTimeRef = useRef<number>(0);
  const submittedRef = useRef(false);

  // Initialize answers when questions are available
  useEffect(() => {
    if (questions.length > 0 && answers.length === 0) {
      setAnswers(
        questions.map((q) => ({
          questionId: q.id,
          selectedOption: null,
          bookmarked: false,
          reviewLater: false,
        }))
      );
    }
  }, [questions, answers.length]);

  // Timer
  useEffect(() => {
    if (phase !== 'active' || !test) return;
    startTimeRef.current = Date.now();
    setTimeLeft(test.duration * 60);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Auto-submit when time runs out
          if (!submittedRef.current) {
            submittedRef.current = true;
            handleSubmit(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, test]);

  // Edge case: test not found
  if (!test) {
    return (
      <div className="section-padding bg-gray-50 dark:bg-slate-950 min-h-screen flex items-center justify-center">
        <div className="container-padding text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-100 dark:bg-error-900/30 mb-4">
            <AlertCircle className="w-8 h-8 text-error-600 dark:text-error-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Test Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The test you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/tests')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Tests
          </button>
        </div>
      </div>
    );
  }

  // Edge case: no questions
  if (questions.length === 0) {
    return (
      <div className="section-padding bg-gray-50 dark:bg-slate-950 min-h-screen flex items-center justify-center">
        <div className="container-padding text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning-100 dark:bg-warning-900/30 mb-4">
            <FileText className="w-8 h-8 text-warning-600 dark:text-warning-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Questions Available</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            There are no questions configured for this test yet. Please try another test.
          </p>
          <button
            onClick={() => navigate('/tests')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Tests
          </button>
        </div>
      </div>
    );
  }

  // ---- Handlers ----
  const startTest = () => {
    setPhase('active');
    setCurrentIndex(0);
  };

  const selectOption = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) =>
      prev.map((a, i) =>
        i === questionIndex ? { ...a, selectedOption: a.selectedOption === optionIndex ? null : optionIndex } : a
      )
    );
  };

  const toggleBookmark = (questionIndex: number) => {
    setAnswers((prev) =>
      prev.map((a, i) => (i === questionIndex ? { ...a, bookmarked: !a.bookmarked } : a))
    );
  };

  const toggleReviewLater = (questionIndex: number) => {
    setAnswers((prev) =>
      prev.map((a, i) => (i === questionIndex ? { ...a, reviewLater: !a.reviewLater } : a))
    );
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  const next = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = (_auto = false) => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    let correctCount = 0;
    let wrongCount = 0;
    let score = 0;

    questions.forEach((q, i) => {
      const ans = answers[i];
      if (ans?.selectedOption === null || ans?.selectedOption === undefined) {
        // unattempted — no marks
        return;
      }
      if (ans.selectedOption === q.correctAnswer) {
        correctCount++;
        score += q.marks;
      } else {
        wrongCount++;
        score -= q.negativeMark;
      }
    });

    // Clamp score to not go below 0
    if (score < 0) score = 0;

    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;
    const timeTaken = startTimeRef.current
      ? Math.round((Date.now() - startTimeRef.current) / 1000)
      : test.duration * 60;

    const result: TestResult = {
      testId: test.id,
      score,
      totalMarks,
      percentage,
      correctCount,
      wrongCount,
      totalQuestions: questions.length,
      timeTaken,
      answers,
      date: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '[]');
      existing.push(result);
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(existing));
    } catch (e) {
      console.error('Failed to save attempt to localStorage', e);
    }

    navigate(`/tests/${test.id}/result`, {
      state: { result, questions, test },
      replace: true,
    });
  };

  // ---- Intro Screen ----
  if (phase === 'intro') {
    return (
      <div className="section-padding bg-gray-50 dark:bg-slate-950 min-h-screen">
        <div className="container-padding max-w-3xl">
          <button
            onClick={() => navigate('/tests')}
            className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Tests
          </button>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 dark:from-slate-800 dark:to-slate-900 p-6 lg:p-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white mb-3">
                {test.type}
              </span>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{test.title}</h1>
              <p className="text-blue-100 text-sm">{test.description}</p>
            </div>

            {/* Stats grid */}
            <div className="p-6 lg:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <StatBox icon={Clock} label="Duration" value={`${test.duration} min`} color="brand" />
                <StatBox icon={Award} label="Total Marks" value={`${test.totalMarks}`} color="accent" />
                <StatBox icon={FileText} label="Questions" value={`${questions.length}`} color="success" />
                <StatBox icon={ListChecks} label="Difficulty" value={test.difficulty} color="warning" />
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  Instructions
                </h2>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 shrink-0" />
                    The test contains <strong>{questions.length} questions</strong> to be attempted in <strong>{test.duration} minutes</strong>.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 shrink-0" />
                    Each question has <strong>4 options</strong> (A, B, C, D). Only one option is correct.
                  </li>
                  {test.negativeMarking && (
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-error-500 mt-0.5 shrink-0" />
                      <span><strong>Negative marking</strong> applies — wrong answers deduct marks (typically 0.25 per 1-mark question).</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 shrink-0" />
                    You can <strong>bookmark</strong> questions or mark them for <strong>review later</strong>.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 shrink-0" />
                    The test <strong>auto-submits</strong> when the timer reaches zero.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 shrink-0" />
                    You can navigate between questions using the question palette.
                  </li>
                </ul>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-2 mb-6 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
                  Board: <strong>{test.board}</strong>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
                  Class: <strong>{test.className}</strong>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
                  Subject: <strong>{test.subject}</strong>
                </span>
                {test.chapter && (
                  <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
                    Chapter: <strong>{test.chapter}</strong>
                  </span>
                )}
              </div>

              <button
                onClick={startTest}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 text-white font-semibold text-base hover:bg-brand-700 transition-colors shadow-lg"
              >
                <Play className="w-5 h-5" /> Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- Active Test Screen ----
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const answeredCount = answers.filter((a) => a.selectedOption !== null).length;
  const progressPct = (answeredCount / questions.length) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeLow = timeLeft <= 60;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="container-padding py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Test in Progress</p>
            <h1 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{test.title}</h1>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg ${timeLow ? 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400 animate-pulse' : 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'}`}>
            <Clock className="w-5 h-5" />
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-100 dark:bg-slate-800">
          <div
            className="h-full bg-brand-600 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="section-padding">
        <div className="container-padding max-w-6xl grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Question area */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-5 lg:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                Q {currentIndex + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(currentIndex)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${currentAnswer?.bookmarked ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
                >
                  {currentAnswer?.bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  {currentAnswer?.bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                  onClick={() => toggleReviewLater(currentIndex)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${currentAnswer?.reviewLater ? 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
                >
                  <Flag className="w-4 h-4" />
                  {currentAnswer?.reviewLater ? 'Reviewing' : 'Review Later'}
                </button>
              </div>
            </div>

            {/* Question text */}
            <div className="mb-6">
              <p className="text-lg text-gray-900 dark:text-white font-medium leading-relaxed">
                {currentQuestion.question}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400">
                  {currentQuestion.type}
                </span>
                <span className="text-xs px-2 py-1 rounded-md bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400">
                  +{currentQuestion.marks} marks
                </span>
                {test.negativeMarking && (
                  <span className="text-xs px-2 py-1 rounded-md bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400">
                    −{currentQuestion.negativeMark}
                  </span>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((opt, i) => {
                const isSelected = currentAnswer?.selectedOption === i;
                return (
                  <button
                    key={i}
                    onClick={() => selectOption(currentIndex, i)}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${isSelected ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 hover:border-brand-300 dark:hover:border-brand-700'}`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${isSelected ? 'bg-brand-600 text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300'}`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-gray-900 dark:text-white text-sm sm:text-base pt-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Nav buttons */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={next}
                  className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => handleSubmit(false)}
                  className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-success-600 text-white text-sm font-semibold hover:bg-success-700 transition-colors"
                >
                  Submit Test <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Question Palette */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Question Palette
              </h3>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-[11px]">
                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <span className="w-3 h-3 rounded bg-success-500" /> Answered
                </span>
                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <span className="w-3 h-3 rounded bg-gray-300 dark:bg-slate-700" /> Not Answered
                </span>
                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <span className="w-3 h-3 rounded bg-accent-500" /> Bookmarked
                </span>
                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <span className="w-3 h-3 rounded border-2 border-brand-500" /> Current
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {questions.map((_, i) => {
                  const a = answers[i];
                  const isCurrent = i === currentIndex;
                  let cls = 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300';
                  if (a?.selectedOption !== null && a?.selectedOption !== undefined) {
                    cls = 'bg-success-500 text-white';
                  }
                  if (a?.bookmarked) {
                    cls = 'bg-accent-500 text-white';
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => goToQuestion(i)}
                      className={`aspect-square rounded-lg text-xs font-bold flex items-center justify-center transition-all ${cls} ${isCurrent ? 'ring-2 ring-brand-500 ring-offset-1 dark:ring-offset-slate-900' : 'hover:scale-105'}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              {/* Counts */}
              <div className="space-y-1.5 text-xs mb-4 border-t border-gray-100 dark:border-slate-800 pt-3">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Answered</span>
                  <span className="font-semibold text-success-600 dark:text-success-400">{answeredCount}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Not Answered</span>
                  <span className="font-semibold text-gray-600 dark:text-gray-300">{questions.length - answeredCount}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Bookmarked</span>
                  <span className="font-semibold text-accent-600 dark:text-accent-400">{answers.filter((a) => a.bookmarked).length}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Review Later</span>
                  <span className="font-semibold text-warning-600 dark:text-warning-400">{answers.filter((a) => a.reviewLater).length}</span>
                </div>
              </div>

              <button
                onClick={() => handleSubmit(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-success-600 text-white text-sm font-semibold hover:bg-success-700 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" /> Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({
  icon: Icon, label, value, color,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  color: 'brand' | 'accent' | 'success' | 'warning';
}) {
  const colorMap = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400',
    accent: 'bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400',
    success: 'bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400',
    warning: 'bg-warning-50 text-warning-600 dark:bg-warning-900/20 dark:text-warning-400',
  };
  return (
    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
      <span className="text-[11px] text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}
