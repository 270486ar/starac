import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock, BookOpen, CheckCircle2, ArrowRight, Star, GraduationCap,
  ClipboardList, PencilRuler,
} from 'lucide-react';
import { Card, Badge } from '../components/ui/SectionHeader';
import { courses } from '../data/content';
import type { Board, ClassName } from '../data/questions';

const boardFilters: ('All' | Board)[] = ['All', 'CBSE', 'State Board'];
const classFilters: ('All' | ClassName)[] = ['All', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

export default function CoursesPage() {
  const [boardFilter, setBoardFilter] = useState<'All' | Board>('All');
  const [classFilter, setClassFilter] = useState<'All' | ClassName>('All');

  const filteredCourses = courses.filter((course) => {
    const boardMatch = boardFilter === 'All' || course.board === boardFilter;
    const classMatch = classFilter === 'All' || course.className === classFilter;
    return boardMatch && classMatch;
  });

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.2),transparent_50%)]" />
        </div>
        <div className="container-padding relative z-10 pt-24 pb-16 text-center">
          <Badge color="accent">Our Courses</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4 text-balance">
            Coaching Programs for <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">Classes 9–12</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Expert coaching for CBSE and State Board students. Choose the program that fits your
            academic goals and start your journey to excellence.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>

      {/* Filters + Courses */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-padding">
          {/* Board Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 mr-2">Board:</span>
              {boardFilters.map((board) => (
                <button
                  key={board}
                  onClick={() => setBoardFilter(board)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    boardFilter === board
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {board}
                </button>
              ))}
            </div>
            {/* Class Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 mr-2">Class:</span>
              {classFilters.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setClassFilter(cls)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    classFilter === cls
                      ? 'bg-accent-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-8">
            Showing <strong className="text-slate-900 dark:text-white">{filteredCourses.length}</strong>{' '}
            {filteredCourses.length === 1 ? 'course' : 'courses'}
            {boardFilter !== 'All' && ` • ${boardFilter}`}
            {classFilter !== 'All' && ` • ${classFilter}`}
          </p>

          {/* Course Cards Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  className="flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Header gradient */}
                  <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge color={course.board === 'CBSE' ? 'brand' : 'accent'}>{course.board}</Badge>
                        <Badge color="slate">{course.className}</Badge>
                      </div>
                      {course.popular && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 dark:text-accent-400">
                          <Star className="w-4 h-4 fill-accent-500 text-accent-500" /> Popular
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{course.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{course.description}</p>

                    {/* Subjects */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> Subjects
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {course.subjects.map((subject) => (
                          <Badge key={subject} color="slate">{subject}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-brand-500" /> {course.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <PencilRuler className="w-4 h-4 text-accent-500" /> {course.subjects.length} Subjects
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6 flex-1">
                      {course.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-auto">
                      <Link
                        to="/tests"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
                      >
                        <ClipboardList className="w-4 h-4" /> Start Test
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <GraduationCap className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-lg">No courses match your selected filters.</p>
              <button
                onClick={() => { setBoardFilter('All'); setClassFilter('All'); }}
                className="mt-4 text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-padding">
          <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-accent-600 p-12 text-center shadow-2xl">
            <GraduationCap className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Enroll?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Admissions for the 2025-26 academic year are now open. Register today to secure your seat
              and get an early bird discount.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-700 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Register Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/20 transition-all"
              >
                Contact Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
