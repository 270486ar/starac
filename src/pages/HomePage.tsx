import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, Star, Award, Users, Building2, TrendingUp,
  HeartHandshake, BookOpen, Smile, Smartphone, ChevronRight,
  Quote, Calendar, Clock, Trophy, Zap, Target, Flame,
  Sparkles, GraduationCap, CheckCircle2, CalendarDays, BookMarked,
  BarChart3, Medal, UserCheck, ClipboardList, FileText,
} from 'lucide-react';
import { SectionHeader, Card, Badge, AnimatedCounter } from '../components/ui/SectionHeader';
import {
  courses, faculty, testimonials, topRankers, announcements,
  newsItems, galleryImages, challenges, stats, whyChooseUs,
} from '../data/content';
import { getQuestionOfTheDay } from '../data/questions';
import { availableTests } from '../data/tests';
import { KaraikalSkyline } from '../components/illustrations/KaraikalLandmarks';

const iconMap: Record<string, typeof Award> = {
  Award, Users, Building2, TrendingUp, HeartHandshake, BookOpen, Smile, Smartphone,
};

const featureStrip = [
  { icon: Target, title: 'Daily Practice', desc: 'Fresh questions every day', color: 'from-brand-500 to-brand-600' },
  { icon: Zap, title: 'Instant Results', desc: 'Get scores immediately', color: 'from-sky-500 to-sky-600' },
  { icon: UserCheck, title: 'Expert Faculty', desc: 'Learn from the best', color: 'from-accent-500 to-accent-600' },
  { icon: BarChart3, title: 'Performance Tracking', desc: 'Monitor your progress', color: 'from-success-500 to-success-600' },
  { icon: Medal, title: 'Rank & Compete', desc: 'Climb the leaderboard', color: 'from-brand-600 to-sky-500' },
];

const whyChooseChecklist = [
  { icon: ClipboardList, text: 'Chapter-wise Tests' },
  { icon: BookMarked, text: 'Full Syllabus Tests' },
  { icon: UserCheck, text: 'Expert Faculty' },
  { icon: FileText, text: 'Previous Year Papers' },
  { icon: Zap, text: 'Instant Results' },
  { icon: BookOpen, text: 'Detailed Solutions' },
  { icon: BarChart3, text: 'Performance Reports' },
  { icon: GraduationCap, text: 'Board Exam Focus' },
];

const allStats = [
  { label: 'Students', value: 1000, suffix: '+', icon: Users },
  { label: 'Teachers', value: 50, suffix: '+', icon: GraduationCap },
  { label: 'Tests Conducted', value: 5000, suffix: '+', icon: ClipboardList },
  { label: 'Success Rate', value: 95, suffix: '%', icon: TrendingUp },
  { label: 'Years of Excellence', value: 10, suffix: '+', icon: Award },
];

export default function HomePage() {
  const questionOfTheDay = getQuestionOfTheDay();
  const upcomingTests = availableTests.slice(0, 4);
  const popularCourses = courses.filter((c) => c.popular).slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92vh] flex items-center pt-20">
        {/* Background */}
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute inset-0 grid-pattern opacity-20" />
        </div>

        {/* Floating decorative shapes */}
        <div className="absolute top-32 right-10 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl animate-drift" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-brand-300/20 rounded-full blur-3xl animate-drift" style={{ animationDelay: '3s' }} />

        <div className="container-padding relative z-10 pt-12 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 mb-6 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                <span className="text-sm font-medium">Admissions Open for 2026-27</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-6 text-balance animate-fade-in-up text-shadow-lg">
                Shaping Bright Futures<br />
                <span className="bg-gradient-to-r from-sky-300 via-sky-200 to-accent-300 bg-clip-text text-transparent">
                  in Karaikal
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-sky-100 mb-3 max-w-xl animate-fade-in-up animate-delay-200 leading-relaxed font-body">
                Premium Coaching for CBSE & Tamil Nadu State Board
              </p>
              <p className="text-base text-sky-200 mb-8 max-w-xl animate-fade-in-up animate-delay-200 font-body">
                Classes 9–12 • Expert faculty • Proven results since 2005
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
                <Link to="/tests" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold shadow-xl shadow-accent-500/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                  Start Free Test <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/courses" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/25 transition-all">
                  <Play className="w-5 h-5" /> Explore Courses
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-10 animate-fade-in-up animate-delay-500">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                  <p className="text-sm text-sky-100">4.8/5 Rating</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-2xl font-bold">5000+</p>
                  <p className="text-sm text-sky-100">Students Trained</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-sky-100">Pass Rate</p>
                </div>
              </div>
            </div>

          {/* Right side - Hero Image */}
           <img
            src="/hero-banner.jpg"
            alt="Stars Academy"
            className="w-full h-auto object-cover"
            loading="lazy"
             />
         </div>
              {/* Floating QOTD badge over illustration */}
              <div className="absolute -bottom-6 -left-6 glassmorphism rounded-2xl p-4 shadow-xl w-56 animate-float">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">Daily Streak</span>
                </div>
                <p className="text-white/80 text-xs">Keep practicing every day to maintain your streak!</p>
              </div>
              <div className="absolute -top-4 -right-4 glassmorphism rounded-2xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent-300" />
                  <span className="text-white font-bold text-sm">Top Ranked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>

      {/* ===== FEATURE STRIP ===== */}
      <section className="container-padding -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featureStrip.map((feature, i) => (
            <div
              key={i}
              className="card-premium p-6 text-center hover:-translate-y-2 group cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-1">{feature.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATISTICS COUNTER ===== */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allStats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-brand-50 to-sky-50 dark:from-slate-800/40 dark:to-slate-900/40 border border-brand-100 dark:border-slate-700/50 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-sky-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-500/20">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR COURSES ===== */}
      <section className="section-padding bg-gradient-to-b from-brand-50/50 to-white dark:from-slate-900/30 dark:to-slate-950">
        <div className="container-padding">
          <SectionHeader
            badge="Our Programs"
            title="Popular Courses"
            subtitle="Comprehensive coaching programs designed for board exam success"
            actionLink={{ label: 'All Courses', path: '/courses' }}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {popularCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:-translate-y-2 group">
                <div className="h-36 bg-gradient-to-br from-brand-500 to-sky-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <Badge color="slate">{course.board}</Badge>
                    <h3 className="text-xl font-display font-bold text-white mt-2">{course.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-body">{course.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.subjects.slice(0, 4).map((s) => (
                      <span key={s} className="badge bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-xs">
                        {s}
                      </span>
                    ))}
                    {course.subjects.length > 4 && (
                      <span className="badge bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs">
                        +{course.subjects.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {course.subjects.length} subjects</span>
                  </div>
                  <Link to="/courses" className="btn-primary w-full text-sm py-2.5">
                    Explore <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUESTION OF THE DAY & UPCOMING TESTS ===== */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Question of the Day */}
            <Card className="p-6 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center shadow-lg shadow-accent-500/20">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-900 dark:text-white">Question of the Day</h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4 font-body">
                {questionOfTheDay.question}
              </p>
              <div className="space-y-2 mb-4">
                {questionOfTheDay.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-brand-50 dark:bg-slate-800/60 text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <span className="w-6 h-6 rounded-lg bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                <Badge color="brand">{questionOfTheDay.subject}</Badge>
                <Badge color="slate">{questionOfTheDay.difficulty}</Badge>
              </div>
              <Link to="/tests" className="btn-accent w-full text-sm py-2.5">
                Submit Answer <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>

            {/* Upcoming Tests */}
            <div className="lg:col-span-2">
              <SectionHeader title="Upcoming Tests" badge="Get Ready" centered={false} actionLink={{ label: 'All Tests', path: '/tests' }} />
              <div className="grid sm:grid-cols-2 gap-4">
                {upcomingTests.map((test) => (
                  <Card key={test.id} className="p-5 hover:-translate-y-1 group">
                    <div className="flex items-center justify-between mb-3">
                      <Badge color="accent">{test.type}</Badge>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {test.duration} min
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {test.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                      <span>{test.board}</span> • <span>{test.className}</span> • <span>{test.subject}</span>
                    </div>
                    <Link to={`/tests/${test.id}`} className="btn-primary w-full text-sm py-2.5">
                      Enroll Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE STARS ACADEMY ===== */}
      <section className="section-padding bg-gradient-to-b from-sky-50/50 to-white dark:from-slate-900/30 dark:to-slate-950">
        <div className="container-padding">
          <SectionHeader
            badge="Our Strengths"
            title="Why Choose Stars Academy?"
            subtitle="Two decades of educational excellence with proven results"
          />
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Checklist */}
            <div className="grid sm:grid-cols-2 gap-3">
              {whyChooseChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800/40 border border-brand-100 dark:border-slate-700/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-sky-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-500/20">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-body font-semibold text-slate-700 dark:text-slate-200 text-sm">{item.text}</span>
                  <CheckCircle2 className="w-5 h-5 text-success-500 ml-auto flex-shrink-0" />
                </div>
              ))}
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4">
              {whyChooseUs.slice(0, 4).map((item, i) => {
                const Icon = iconMap[item.icon] || Award;
                return (
                  <Card key={i} className="p-6 hover:-translate-y-1 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-brand-500/25">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-body">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOP RANKERS ===== */}
      <section className="section-padding">
        <div className="container-padding">
          <SectionHeader
            badge="Our Pride"
            title="Top Rankers"
            subtitle="Celebrating the achievements of our outstanding students"
            actionLink={{ label: 'Full Leaderboard', path: '/leaderboard' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topRankers.map((ranker, i) => (
              <Card key={ranker.id} className="p-5 hover:-translate-y-1 group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={ranker.image}
                      alt={ranker.name}
                      className="w-16 h-16 rounded-xl object-cover ring-2 ring-brand-200 dark:ring-brand-800"
                      loading="lazy"
                    />
                    <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      i === 0 ? 'bg-accent-500' : i === 1 ? 'bg-brand-500' : i === 2 ? 'bg-sky-500' : 'bg-slate-500'
                    }`}>
                      {ranker.rank}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-slate-900 dark:text-white">{ranker.name}</h3>
                    <p className="text-sm text-slate-500">{ranker.className} • {ranker.board}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-display font-bold gradient-text">{ranker.percentage}</span>
                      <Badge color="slate">{ranker.subject}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-gradient-to-b from-brand-50/50 to-white dark:from-slate-900/30 dark:to-slate-950">
        <div className="container-padding">
          <SectionHeader
            badge="Student Voices"
            title="Testimonials"
            subtitle="What our students and parents say about Stars Academy"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 hover:-translate-y-1">
                <Quote className="w-8 h-8 text-brand-200 dark:text-brand-800 mb-3" />
                <p className="text-sm text-slate-700 dark:text-slate-200 mb-4 leading-relaxed font-body">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-brand-100 dark:border-slate-700">
                  <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="font-display font-semibold text-sm text-slate-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST ANNOUNCEMENTS ===== */}
      <section className="section-padding">
        <div className="container-padding">
          <SectionHeader
            badge="Stay Informed"
            title="Latest Announcements"
            subtitle="Important updates and news from Stars Academy"
            actionLink={{ label: 'View All', path: '/about' }}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.slice(0, 6).map((ann) => (
              <Card key={ann.id} className="p-5 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <Badge color={ann.important ? 'error' : 'brand'}>{ann.category}</Badge>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(ann.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2">{ann.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 font-body">{ann.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHALLENGES ===== */}
      <section className="section-padding bg-gradient-to-b from-sky-50/50 to-white dark:from-slate-900/30 dark:to-slate-950">
        <div className="container-padding">
          <SectionHeader badge="Challenges" title="Weekly & Monthly Challenges" subtitle="Push your limits and earn badges" />
          <div className="grid md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="p-5 hover:-translate-y-1 group">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      challenge.type === 'Weekly'
                        ? 'bg-gradient-to-br from-brand-500 to-brand-600'
                        : 'bg-gradient-to-br from-accent-500 to-accent-600'
                    } shadow-lg`}>
                      {challenge.type === 'Weekly' ? <Zap className="w-6 h-6 text-white" /> : <Trophy className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-slate-900 dark:text-white">{challenge.title}</h3>
                        <Badge color={challenge.type === 'Weekly' ? 'brand' : 'accent'}>{challenge.type}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-body">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-slate-900 dark:text-white">{challenge.questionCount}</p>
                      <p className="text-xs text-slate-500">Questions</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-900 dark:text-white">{challenge.duration}</p>
                      <p className="text-xs text-slate-500">Duration</p>
                    </div>
                    <Link to="/tests" className="btn-accent text-sm py-2 px-4">
                      Join <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FACULTY ===== */}
      <section className="section-padding">
        <div className="container-padding">
          <SectionHeader
            badge="Meet Our Team"
            title="Expert Faculty"
            subtitle="Dedicated and experienced teachers committed to your success"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:-translate-y-2 group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display font-bold text-white text-lg">{member.name}</h3>
                    <p className="text-sky-200 text-sm">{member.designation}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {member.subjects.map((s) => (
                      <span key={s} className="badge bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 font-body">{member.bio}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {member.qualification}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {member.experience}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section-padding bg-gradient-to-b from-brand-50/50 to-white dark:from-slate-900/30 dark:to-slate-950">
        <div className="container-padding">
          <SectionHeader
            badge="Campus Life"
            title="Our Gallery"
            subtitle="A glimpse into life at Stars Academy"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img) => (
              <div key={img.id} className="relative group rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-2xl transition-all">
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <Badge color="brand">{img.category}</Badge>
                    <p className="text-white font-display font-semibold mt-1">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STUDY SCENE / MODERN LEARNING BANNER ===== */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="relative rounded-3xl overflow-hidden hero-gradient p-8 lg:p-16 shadow-2xl">
            <div className="absolute inset-0 hero-pattern" />
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-white">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> Modern Learning
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 text-balance">
                  A Learning Environment Designed for Success
                </h2>
                <p className="text-sky-100 text-lg mb-6 leading-relaxed font-body">
                  Our air-conditioned classrooms, digital teaching aids, and well-stocked library
                  create the perfect atmosphere for focused learning. Small batch sizes ensure
                  every student gets the personal attention they deserve.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'Air-conditioned classrooms with digital smart boards',
                    'Comprehensive library with reference materials',
                    'Small batch sizes for personalized attention',
                    'Regular doubt-clearing and mentorship sessions',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-sky-50 font-body">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-700 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                  Learn More About Us <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="hidden lg:block">
                <KaraikalSkyline className="w-full h-auto rounded-2xl shadow-xl ring-1 ring-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LATEST NEWS ===== */}
      <section className="section-padding bg-gradient-to-b from-sky-50/50 to-white dark:from-slate-900/30 dark:to-slate-950">
        <div className="container-padding">
          <SectionHeader
            badge="News & Updates"
            title="Latest News"
            subtitle="Stay updated with the latest happenings at Stars Academy"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {newsItems.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:-translate-y-1 group">
                <div className="h-40 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(news.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 font-body">{news.excerpt}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="section-padding">
        <div className="container-padding">
          <div className="relative rounded-3xl overflow-hidden hero-gradient p-8 lg:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 hero-pattern" />
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4 text-balance text-shadow-lg">
                Ready to Start Your Success Journey?
              </h2>
              <p className="text-lg text-sky-100 mb-8 max-w-2xl mx-auto font-body">
                Join Stars Academy today and experience the difference that quality education makes.
                Admissions open for 2026-27 academic year.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/register" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent-500 text-white font-bold shadow-xl shadow-accent-500/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                  Register Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/25 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
