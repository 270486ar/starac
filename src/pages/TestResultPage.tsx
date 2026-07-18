import { useState, useMemo } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Trophy, Award, Clock, CheckCircle2, XCircle, MinusCircle,
  RotateCcw, ListChecks, Home, AlertCircle, Target, TrendingUp,
  Bookmark, ChevronDown, ChevronUp,
} from 'lucide-react';
import { getTestById } from '../data/tests';
import type { TestInfo } from '../data/tests';
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
  timeTaken: number;
  answers: AnswerRecord[];
  date: string;
}

interface LocationState {
  result?: TestResult;
  questions?: Question[];
  test?: TestInfo;
}

const ATTEMPTS_KEY = 'test_attempts';

function getGrade(percentage: number): { grade: string; color: string; label: string } {
  if (percentage >= 90) return { grade: 'A+', color: 'text-success-600 dark:text-success-400', label: 'Outstanding' };
  if (percentage >= 80) return { grade: 'A', color: 'text-success-600 dark:text-success-400', label: 'Excellent' };
  if (percentage >= 70) return { grade: 'B', color: 'text-brand-600 dark:text-brand-400', label: 'Very Good' };
  if (percentage >= 60) return { grade: 'C', color: 'text-accent-600 dark:text-accent-400', label: 'Good' };
  if (percentage >= 50) return { grade: 'D', color: 'text-warning-600 dark:text-warning-400', label: 'Pass' };
  return { grade: 'F', color: 'text-error-600 dark:text-error-400', label: 'Needs Improvement' };
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default function TestResultPage() {
  const { testId } = useParams<{ testId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedQ, setExpandedQ] = useState<number | null>(0);

  const state = location.state as LocationState | null;

  // Resolve result, questions, test — from location.state or localStorage fallback
  const { result, questions, test } = useMemo(() => {
    if (state?.result) {
      const t = state.test ?? (testId ? getTestById(testId) : undefined);
      const qs = state.questions ?? (t ? getQuestionsByFilters(t.board, t.className, t.subject, t.chapter) : []);
      return { result: state.result, questions: qs, test: t };
    }
    // Fallback: read from localStorage
    if (testId) {
      try {
        const all = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '[]');
        const latest = [...all].reverse().find((r: TestResult) => r.testId === testId);
        if (latest) {
          const t = getTestById(testId);
          const qs = t ? getQuestionsByFilters(t.board, t.className, t.subject, t.chapter) : [];
          return { result: latest, questions: qs, test: t };
        }
      } catch (e) {
        console.error('Failed to read attempts', e);
      }
    }
    return { result: undefined, questions: [], test: undefined };
  }, [state, testId]);

  // No result found
  if (!result) {
    return (
      <div className="section-padding bg-gray-50 dark:bg-slate-950 min-h-screen flex items-center justify-center">
        <div className="container-padding text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning-100 dark:bg-warning-900/30 mb-4">
            <AlertCircle className="w-8 h-8 text-warning-600 dark:text-warning-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Result Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            We couldn't find any result for this test. You may not have attempted it yet, or your session has expired.
          </p>
          <Link
            to="/tests"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
          >
            <Home className="w-4 h-4" /> Back to Tests
          </Link>
        </div>
      </div>
    );
  }

  const { grade, color, label } = getGrade(result.percentage);
  const unattempted = result.totalQuestions - result.correctCount - result.wrongCount;
  const passStatus = result.percentage >= 50;

  return (
    <div className="section-padding bg-gray-50 dark:bg-slate-950 min-h-screen">
      <div className="container-padding max-w-4xl">
        {/* Back link */}
        <button
          onClick={() => navigate('/tests')}
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4 transition-colors"
        >
          <Home className="w-4 h-4" /> Back to Tests
        </button>

        {/* Score Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden mb-6">
          <div className={`bg-gradient-to-br ${passStatus ? 'from-success-600 to-success-800 dark:from-slate-800 dark:to-slate-900' : 'from-error-600 to-error-800 dark:from-slate-800 dark:to-slate-900'} p-6 lg:p-8 text-center`}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mb-3">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <p className="text-white/80 text-sm mb-1">Test Completed</p>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
              {test?.title ?? 'Test'}
            </h1>
            <p className="text-white/70 text-xs mb-4">
              {test?.board} • {test?.className} • {test?.subject}
            </p>

            {/* Score */}
            <div className="inline-flex flex-col items-center">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl lg:text-6xl font-bold text-white">{result.score}</span>
                <span className="text-2xl text-white/70">/ {result.totalMarks}</span>
              </div>
              <p className="text-white/80 text-sm mt-1">marks scored</p>
            </div>

            {/* Grade + Percentage */}
            <div className="flex items-center justify-center gap-6 mt-5">
              <div className="text-center">
                <p className={`text-4xl font-bold ${color.replace('text-', 'text-').replace('dark:text-', 'dark:text-')}`} style={{ color: 'white' }}>
                  {result.percentage}%
                </p>
                <p className="text-white/70 text-xs">Percentage</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-4xl font-bold text-white">{grade}</p>
                <p className="text-white/70 text-xs">{label}</p>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="p-5 lg:p-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatBox icon={CheckCircle2} label="Correct" value={result.correctCount} color="success" />
            <StatBox icon={XCircle} label="Wrong" value={result.wrongCount} color="error" />
            <StatBox icon={MinusCircle} label="Unattempted" value={unattempted} color="gray" />
            <StatBox icon={Clock} label="Time Taken" value={formatTime(result.timeTaken)} color="brand" />
          </div>
        </div>

        {/* Performance bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-5 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            Performance Breakdown
          </h3>
          <div className="flex h-4 rounded-full overflow-hidden bg-gray-100 dark:bg-slate-800">
            <div
              className="bg-success-500 flex items-center justify-center"
              style={{ width: `${(result.correctCount / result.totalQuestions) * 100}%` }}
            />
            <div
              className="bg-error-500 flex items-center justify-center"
              style={{ width: `${(result.wrongCount / result.totalQuestions) * 100}%` }}
            />
            <div
              className="bg-gray-300 dark:bg-slate-700 flex items-center justify-center"
              style={{ width: `${(unattempted / result.totalQuestions) * 100}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <span className="w-3 h-3 rounded bg-success-500" /> Correct ({result.correctCount})
            </span>
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <span className="w-3 h-3 rounded bg-error-500" /> Wrong ({result.wrongCount})
            </span>
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <span className="w-3 h-3 rounded bg-gray-300 dark:bg-slate-700" /> Unattempted ({unattempted})
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            to={`/tests/${result.testId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retake Test
          </Link>
          <Link
            to="/tests"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-600 text-white font-semibold text-sm hover:bg-accent-700 transition-colors"
          >
            <ListChecks className="w-4 h-4" /> View All Tests
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>

        {/* Question-by-question review */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-5 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            Detailed Review
          </h3>

          {questions.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
              Question details are no longer available for review.
            </p>
          ) : (
            <div className="space-y-3">
              {questions.map((q, i) => {
                const ans = result.answers?.[i];
                const isExpanded = expandedQ === i;
                const isCorrect = ans?.selectedOption === q.correctAnswer;
                const isUnattempted = ans?.selectedOption === null || ans?.selectedOption === undefined;
                const isWrong = !isUnattempted && !isCorrect;

                let statusColor = 'border-gray-200 dark:border-slate-700';
                let statusIcon = <MinusCircle className="w-4 h-4 text-gray-400" />;
                let statusLabel = 'Unattempted';

                if (isCorrect) {
                  statusColor = 'border-success-200 dark:border-success-900/50 bg-success-50/50 dark:bg-success-900/10';
                  statusIcon = <CheckCircle2 className="w-4 h-4 text-success-500" />;
                  statusLabel = 'Correct';
                } else if (isWrong) {
                  statusColor = 'border-error-200 dark:border-error-900/50 bg-error-50/50 dark:bg-error-900/10';
                  statusIcon = <XCircle className="w-4 h-4 text-error-500" />;
                  statusLabel = 'Wrong';
                }

                return (
                  <div key={q.id} className={`rounded-xl border ${statusColor} overflow-hidden transition-all`}>
                    <button
                      onClick={() => setExpandedQ(isExpanded ? null : i)}
                      className="w-full flex items-center justify-between gap-3 p-4 text-left"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 shrink-0">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{q.question}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {statusIcon}
                            <span className="text-xs text-gray-500 dark:text-gray-400">{statusLabel}</span>
                            {ans?.bookmarked && (
                              <span className="flex items-center gap-0.5 text-xs text-accent-500">
                                <Bookmark className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-100 dark:border-slate-800 pt-3">
                        {/* Options */}
                        <div className="space-y-2 mb-3">
                          {q.options.map((opt, oi) => {
                            const isUserAnswer = ans?.selectedOption === oi;
                            const isCorrectAnswer = q.correctAnswer === oi;
                            let optCls = 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-gray-600 dark:text-gray-300';
                            if (isCorrectAnswer) {
                              optCls = 'border-success-300 dark:border-success-700 bg-success-50 dark:bg-success-900/20 text-success-800 dark:text-success-300';
                            } else if (isUserAnswer && isWrong) {
                              optCls = 'border-error-300 dark:border-error-700 bg-error-50 dark:bg-error-900/20 text-error-800 dark:text-error-300';
                            }
                            return (
                              <div key={oi} className={`flex items-start gap-2 p-2.5 rounded-lg border text-sm ${optCls}`}>
                                <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 bg-white/50 dark:bg-slate-900/50">
                                  {String.fromCharCode(65 + oi)}
                                </span>
                                <span className="flex-1 pt-0.5">{opt}</span>
                                {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0 mt-0.5" />}
                                {isUserAnswer && isWrong && <XCircle className="w-4 h-4 text-error-500 shrink-0 mt-0.5" />}
                              </div>
                            );
                          })}
                        </div>

                        {/* User answer + correct answer summary */}
                        <div className="grid sm:grid-cols-2 gap-2 mb-3 text-xs">
                          <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800">
                            <p className="text-gray-500 dark:text-gray-400 mb-0.5">Your Answer</p>
                            <p className={`font-semibold ${isUnattempted ? 'text-gray-400' : isCorrect ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>
                              {isUnattempted ? 'Not attempted' : `${String.fromCharCode(65 + (ans?.selectedOption ?? 0))}. ${q.options[ans?.selectedOption ?? 0]}`}
                            </p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800">
                            <p className="text-gray-500 dark:text-gray-400 mb-0.5">Correct Answer</p>
                            <p className="font-semibold text-success-600 dark:text-success-400">
                              {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}
                            </p>
                          </div>
                        </div>

                        {/* Explanation */}
                        <div className="p-3 rounded-lg bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/30">
                          <p className="text-xs font-semibold text-brand-700 dark:text-brand-400 mb-1 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5" /> Explanation
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{q.explanation}</p>
                        </div>

                        {/* Marks */}
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="text-success-600 dark:text-success-400 font-medium">+{q.marks} for correct</span>
                          <span className="text-error-600 dark:text-error-400 font-medium">−{q.negativeMark} for wrong</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom action buttons */}
        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          <Link
            to={`/tests/${result.testId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retake Test
          </Link>
          <Link
            to="/tests"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ListChecks className="w-4 h-4" /> Back to Tests
          </Link>
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
  value: string | number;
  color: 'brand' | 'accent' | 'success' | 'warning' | 'error' | 'gray';
}) {
  const colorMap: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400',
    accent: 'bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400',
    success: 'bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400',
    warning: 'bg-warning-50 text-warning-600 dark:bg-warning-900/20 dark:text-warning-400',
    error: 'bg-error-50 text-error-600 dark:bg-error-900/20 dark:text-error-400',
    gray: 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-300',
  };
  return (
    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-base font-bold text-gray-900 dark:text-white">{value}</span>
      <span className="text-[11px] text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}
