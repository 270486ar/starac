import { useState, useMemo } from 'react';
import {
  Search, Bookmark, BookmarkCheck, ChevronDown, Filter, X,
  CheckCircle2, Award, Plus, Library,
} from 'lucide-react';
import { Card, Badge } from '../components/ui/SectionHeader';
import {
  getQuestionsByFilters,
  type Question,
  type Board,
  type ClassName,
  type Subject,
  type Difficulty,
} from '../data/questions';

const boardOptions: ('All' | Board)[] = ['All', 'CBSE', 'State Board'];
const classOptions: ('All' | ClassName)[] = ['All', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const subjectOptions: ('All' | Subject)[] = [
  'All', 'Mathematics', 'Science', 'Social Science', 'Physics', 'Chemistry',
  'Biology', 'English', 'Tamil', 'Computer Science', 'Commerce', 'Accountancy',
  'Economics', 'Business Maths',
];

const difficultyColor: Record<Difficulty, string> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
};

const PAGE_SIZE = 6;

export default function QuestionBankPage() {
  const [search, setSearch] = useState('');
  const [board, setBoard] = useState<'All' | Board>('All');
  const [className, setClassName] = useState<'All' | ClassName>('All');
  const [subject, setSubject] = useState<'All' | Subject>('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [expandedAnswers, setExpandedAnswers] = useState<Set<string>>(new Set());

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAnswer = (id: string) => {
    setExpandedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredQuestions = useMemo<Question[]>(() => {
    const boardFilter = board === 'All' ? undefined : board;
    const classFilter = className === 'All' ? undefined : className;
    const subjectFilter = subject === 'All' ? undefined : subject;

    let results = getQuestionsByFilters(boardFilter, classFilter, subjectFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (question) =>
          question.question.toLowerCase().includes(q) ||
          question.chapter.toLowerCase().includes(q) ||
          question.subject.toLowerCase().includes(q) ||
          question.options.some((opt) => opt.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search, board, className, subject]);

  // Reset visible count when filters change
  const handleFilterChange = (
    setter: (val: any) => void,
    value: any
  ) => {
    setter(value);
    setVisibleCount(PAGE_SIZE);
  };

  const visibleQuestions = filteredQuestions.slice(0, visibleCount);
  const hasMore = visibleCount < filteredQuestions.length;
  const activeFilterCount =
    (board !== 'All' ? 1 : 0) +
    (className !== 'All' ? 1 : 0) +
    (subject !== 'All' ? 1 : 0);

  const clearFilters = () => {
    setBoard('All');
    setClassName('All');
    setSubject('All');
    setSearch('');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.2),transparent_50%)]" />
        </div>
        <div className="container-padding relative z-10 pt-24 pb-16 text-center">
          <Badge color="accent">Question Bank</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4 text-balance">
            Practice with <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">Real Questions</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Browse our extensive collection of board-level questions with detailed explanations.
            Filter by board, class, and subject to find exactly what you need.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>

      {/* Search + Filters + Questions */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-padding">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleFilterChange(setSearch, e.target.value)}
                placeholder="Search by keyword, chapter, or subject..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
              {search && (
                <button
                  onClick={() => handleFilterChange(setSearch, '')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {/* Board Dropdown */}
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                Board
              </label>
              <div className="relative">
                <select
                  value={board}
                  onChange={(e) => handleFilterChange(setBoard, e.target.value as 'All' | Board)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer min-w-[140px]"
                >
                  {boardOptions.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Class Dropdown */}
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                Class
              </label>
              <div className="relative">
                <select
                  value={className}
                  onChange={(e) => handleFilterChange(setClassName, e.target.value as 'All' | ClassName)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer min-w-[140px]"
                >
                  {classOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Subject Dropdown */}
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                Subject
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => handleFilterChange(setSubject, e.target.value as 'All' | Subject)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer min-w-[160px]"
                >
                  {subjectOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="self-end inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-error-100 dark:bg-error-950/50 text-error-700 dark:text-error-300 text-sm font-medium hover:bg-error-200 dark:hover:bg-error-900/50 transition-colors"
              >
                <X className="w-4 h-4" /> Clear Filters ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto">
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <strong className="text-slate-900 dark:text-white">{filteredQuestions.length}</strong>{' '}
              {filteredQuestions.length === 1 ? 'question' : 'questions'} found
            </p>
            {bookmarks.size > 0 && (
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <BookmarkCheck className="w-4 h-4 text-success-500" />
                {bookmarks.size} bookmarked
              </p>
            )}
          </div>

          {/* Questions List */}
          {visibleQuestions.length > 0 ? (
            <div className="space-y-4 max-w-3xl mx-auto">
              {visibleQuestions.map((question, index) => {
                const isBookmarked = bookmarks.has(question.id);
                const isExpanded = expandedAnswers.has(question.id);
                return (
                  <Card key={question.id} className="p-6 hover:shadow-md transition-shadow">
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 dark:text-white leading-relaxed">
                            {question.question}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleBookmark(question.id)}
                        className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                          isBookmarked
                            ? 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-950/30'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Meta badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 ml-11">
                      <Badge color="brand">{question.board}</Badge>
                      <Badge color="slate">{question.className}</Badge>
                      <Badge color="accent">{question.subject}</Badge>
                      <Badge color={difficultyColor[question.difficulty]}>{question.difficulty}</Badge>
                      <Badge color="slate">{question.type}</Badge>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Award className="w-3.5 h-3.5" /> {question.marks} mark{question.marks > 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Chapter info */}
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-4 ml-11">
                      Chapter: {question.chapter}
                    </p>

                    {/* Options */}
                    <div className="ml-11 space-y-2 mb-4">
                      {question.options.map((option, i) => {
                        const isCorrect = isExpanded && i === question.correctAnswer;
                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
                              isCorrect
                                ? 'bg-success-50 dark:bg-success-950/30 border border-success-200 dark:border-success-900'
                                : 'bg-slate-50 dark:bg-slate-900 border border-transparent'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                              isCorrect
                                ? 'bg-success-500 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}>
                              {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                            </span>
                            <span className={`${
                              isCorrect
                                ? 'text-success-700 dark:text-success-300 font-medium'
                                : 'text-slate-600 dark:text-slate-400'
                            }`}>
                              {option}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Show/Hide Answer + Explanation */}
                    <div className="ml-11">
                      <button
                        onClick={() => toggleAnswer(question.id)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                      >
                        {isExpanded ? (
                          <><X className="w-4 h-4" /> Hide Answer & Explanation</>
                        ) : (
                          <><Plus className="w-4 h-4" /> Show Answer & Explanation</>
                        )}
                      </button>
                      {isExpanded && (
                        <div className="mt-3 p-4 rounded-xl bg-brand-50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-success-500" />
                            Correct Answer: {String.fromCharCode(65 + question.correctAnswer)}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            <strong className="text-slate-700 dark:text-slate-300">Explanation: </strong>
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Library className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-lg">No questions match your filters.</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Try adjusting your search or filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-md"
              >
                <Plus className="w-5 h-5" /> Load More Questions
              </button>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Showing {visibleQuestions.length} of {filteredQuestions.length}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
