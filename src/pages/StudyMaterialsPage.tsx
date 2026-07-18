import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Video, BookOpen, ClipboardList, Archive, Download,
  Eye, ArrowRight, BookMarked, Library,
} from 'lucide-react';
import { Card, Badge } from '../components/ui/SectionHeader';
import { studyMaterials } from '../data/content';

type MaterialType = 'All' | 'Notes' | 'PDF' | 'Video' | 'Question Bank' | 'Sample Paper' | 'Previous Year Paper';

const typeFilters: MaterialType[] = ['All', 'Notes', 'PDF', 'Video', 'Question Bank', 'Sample Paper', 'Previous Year Paper'];

const typeIconMap: Record<string, typeof FileText> = {
  FileText,
  Video,
  BookOpen,
  ClipboardList,
  Archive,
};

const typeColorMap: Record<string, string> = {
  Notes: 'brand',
  PDF: 'error',
  Video: 'accent',
  'Question Bank': 'success',
  'Sample Paper': 'warning',
  'Previous Year Paper': 'slate',
};

export default function StudyMaterialsPage() {
  const [typeFilter, setTypeFilter] = useState<MaterialType>('All');

  const filteredMaterials = studyMaterials.filter(
    (material) => typeFilter === 'All' || material.type === typeFilter
  );

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.2),transparent_50%)]" />
        </div>
        <div className="container-padding relative z-10 pt-24 pb-16 text-center">
          <Badge color="accent">Study Materials</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4 text-balance">
            Resources for <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">Every Subject</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Access notes, PDFs, video lectures, question banks, sample papers, and previous year
            papers — all curated by our expert faculty.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>

      {/* Type Filter + Materials */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-padding">
          {/* Type Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {typeFilters.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  typeFilter === type
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-8">
            Showing <strong className="text-slate-900 dark:text-white">{filteredMaterials.length}</strong>{' '}
            {filteredMaterials.length === 1 ? 'resource' : 'resources'}
            {typeFilter !== 'All' && ` • ${typeFilter}`}
          </p>

          {/* Materials Grid */}
          {filteredMaterials.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => {
                const Icon = typeIconMap[material.icon] || FileText;
                const badgeColor = typeColorMap[material.type] || 'brand';
                const isVideo = material.type === 'Video';
                const isPdf = material.type === 'PDF';

                return (
                  <Card
                    key={material.id}
                    className="flex flex-col p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Icon + Type Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        badgeColor === 'brand' ? 'bg-brand-100 dark:bg-brand-950/50' :
                        badgeColor === 'error' ? 'bg-error-100 dark:bg-error-950/50' :
                        badgeColor === 'accent' ? 'bg-accent-100 dark:bg-accent-950/50' :
                        badgeColor === 'success' ? 'bg-success-100 dark:bg-success-950/50' :
                        badgeColor === 'warning' ? 'bg-warning-100 dark:bg-warning-950/50' :
                        'bg-slate-100 dark:bg-slate-800'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          badgeColor === 'brand' ? 'text-brand-600 dark:text-brand-400' :
                          badgeColor === 'error' ? 'text-error-600 dark:text-error-400' :
                          badgeColor === 'accent' ? 'text-accent-600 dark:text-accent-400' :
                          badgeColor === 'success' ? 'text-success-600 dark:text-success-400' :
                          badgeColor === 'warning' ? 'text-warning-600 dark:text-warning-400' :
                          'text-slate-600 dark:text-slate-400'
                        }`} />
                      </div>
                      <Badge color={badgeColor}>{material.type}</Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {material.title}
                    </h3>

                    {/* Class + Subject */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge color="slate">{material.className}</Badge>
                      <Badge color="brand">{material.subject}</Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1">
                      {material.description}
                    </p>

                    {/* Action Button */}
                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          isVideo
                            ? 'bg-accent-600 text-white hover:bg-accent-700'
                            : 'bg-brand-600 text-white hover:bg-brand-700'
                        }`}
                      >
                        {isVideo ? (
                          <><Eye className="w-4 h-4" /> Watch Now</>
                        ) : isPdf ? (
                          <><Eye className="w-4 h-4" /> View PDF</>
                        ) : (
                          <><Download className="w-4 h-4" /> Download</>
                        )}
                      </button>
                      <button
                        className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Bookmark"
                      >
                        <BookMarked className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Library className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-lg">No study materials found for this filter.</p>
              <button
                onClick={() => setTypeFilter('All')}
                className="mt-4 text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                Show all resources
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-padding">
          <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-accent-600 p-12 text-center shadow-2xl">
            <BookOpen className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Want Access to All Resources?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Enrolled students get full access to our complete library of notes, papers, and video
              lectures. Register today to unlock everything.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-700 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Register Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/20 transition-all"
              >
                View Courses <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
