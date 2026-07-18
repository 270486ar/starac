import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock, FileText, Award, BookOpen, Search, Filter,
  ChevronRight, Layers, GraduationCap, Play,
} from 'lucide-react';
import { availableTests, getTestsByFilters } from '../data/tests';
import type { TestInfo } from '../data/tests';

const BOARDS = ['All', 'CBSE', 'State Board'] as const;
const CLASSES = ['All', 'Class 9', 'Class 10', 'Class 11', 'Class 12'] as const;
const TYPES = ['All', 'Chapter Test', 'Full Length', 'Mock Exam', 'Practice Test'] as const;

const difficultyColors: Record<string, string> = {
  Easy: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
  Medium: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
  Hard: 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400',
  Mixed: 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400',
};

const typeColors: Record<string, string> = {
  'Chapter Test': 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400',
  'Full Length': 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400',
  'Mock Exam': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'Practice Test': 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
};

export default function TestsPage() {
  const [board, setBoard] = useState<string>('All');
  const [className, setClassName] = useState<string>('All');
  const [subject, setSubject] = useState<string>('All');
  const [type, setType] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  // Derive subjects from the tests that match the current board+class filters
  const subjects = useMemo(() => {
    const filtered = getTestsByFilters(
      board === 'All' ? undefined : board,
      className === 'All' ? undefined : className
    );
    return ['All', ...Array.from(new Set(filtered.map((t) => t.subject)))];
  }, [board, className]);

  const filteredTests = useMemo(() => {
    let tests = getTestsByFilters(
      board === 'All' ? undefined : board,
      className === 'All' ? undefined : className,
      subject === 'All' ? undefined : subject
    );
    if (type !== 'All') {
      tests = tests.filter((t) => t.type === type);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      tests = tests.filter((t) => t.title.toLowerCase().includes(q));
    }
    return tests;
  }, [board, className, subject, type, search]);

  const resetFilters = () => {
    setBoard('All');
    setClassName('All');
    setSubject('All');
    setType('All');
    setSearch('');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 dark:from-slate-900 dark:to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.2),transparent_50%)]" />
        <div className="container-padding relative z-10 py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-5">
              <Play className="w-4 h-4 text-accent-400" />
              <span className="text-sm font-medium text-white">Online Test Series</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Online Tests
            </h1>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl">
              Practice with chapter-wise tests, full-length mocks, and practice exams designed
              for CBSE and State Board students from Class 9 to 12. Track your progress and
              improve your scores.
            </p>
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-400" />
                <span className="font-semibold">{availableTests.length}+</span>
                <span className="text-blue-200 text-sm">Tests Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent-400" />
                <span className="font-semibold">4</span>
                <span className="text-blue-200 text-sm">Test Types</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-accent-400" />
                <span className="font-semibold">Class 9-12</span>
                <span className="text-blue-200 text-sm">Coverage</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-slate-950 to-transparent" />
      </section>

      {/* Filters + Grid */}
      <section className="section-padding bg-gray-50 dark:bg-slate-950">
        <div className="container-padding">
          {/* Filter Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-5 lg:p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Tests</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Board */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Board</label>
                <select
                  value={board}
                  onChange={(e) => { setBoard(e.target.value); setSubject('All'); }}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                >
                  {BOARDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              {/* Class */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Class</label>
                <select
                  value={className}
                  onChange={(e) => { setClassName(e.target.value); setSubject('All'); }}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                >
                  {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                >
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {/* Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                >
                  {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Search + Reset */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tests by title..."
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 pl-10 pr-3 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                />
              </div>
              <button
                onClick={resetFilters}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredTests.length}</span> test{filteredTests.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Test Grid */}
          {filteredTests.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tests found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search terms.</p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function TestCard({ test }: { test: TestInfo }) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden transition-all hover:-translate-y-1 flex flex-col">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${typeColors[test.type]}`}>
            {test.type}
          </span>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${difficultyColors[test.difficulty]}`}>
            {test.difficulty}
          </span>
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-2 line-clamp-2">
          {test.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{test.description}</p>
      </div>

      {/* Meta tags */}
      <div className="px-5 pb-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-xs text-gray-600 dark:text-gray-300">
          <GraduationCap className="w-3 h-3" /> {test.board}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-xs text-gray-600 dark:text-gray-300">
          <BookOpen className="w-3 h-3" /> {test.className}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-xs text-gray-600 dark:text-gray-300">
          <Layers className="w-3 h-3" /> {test.subject}
        </span>
      </div>

      {/* Stats */}
      <div className="px-5 pb-4 grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-slate-800 pt-3">
        <div className="flex flex-col items-center text-center">
          <Clock className="w-4 h-4 text-brand-500 mb-1" />
          <span className="text-xs font-semibold text-gray-900 dark:text-white">{test.duration} min</span>
          <span className="text-[10px] text-gray-400">Duration</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Award className="w-4 h-4 text-accent-500 mb-1" />
          <span className="text-xs font-semibold text-gray-900 dark:text-white">{test.totalMarks}</span>
          <span className="text-[10px] text-gray-400">Marks</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <FileText className="w-4 h-4 text-success-500 mb-1" />
          <span className="text-xs font-semibold text-gray-900 dark:text-white">{test.questionCount}</span>
          <span className="text-[10px] text-gray-400">Questions</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800">
        <Link
          to={`/tests/${test.id}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors group-hover:bg-brand-700"
        >
          Start Test <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
