import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ClipboardList, Bookmark, Award, User,
  TrendingUp, Target, Star, Trophy, Clock, CheckCircle2,
  XCircle, Calendar, BarChart3, PieChart, LineChart as LineChartIcon,
  Edit, Save, LogOut, ChevronRight, BookOpen, Download,
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, BarElement, Tooltip, Legend, Filler,
} from 'chart.js';
import { Card, Badge } from '../components/ui/SectionHeader';
import { useAuth } from '../context/AuthContext';
import { availableTests, type TestInfo } from '../data/tests';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend, Filler);

type TabId = 'overview' | 'my-tests' | 'bookmarks' | 'certificates' | 'profile';

interface TestAttempt {
  testId: string;
  testTitle: string;
  subject: string;
  board: string;
  className: string;
  score: number;
  totalMarks: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  duration: number;
  completedAt: string;
}

interface BookmarkedQuestion {
  id: string;
  question: string;
  subject: string;
  options: string[];
  correctAnswer: number;
  difficulty: string;
  bookmarkedAt: string;
}

interface Certificate {
  id: string;
  title: string;
  description: string;
  earnedDate: string;
  icon: string;
  color: string;
}

const sidebarItems: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'my-tests', label: 'My Tests', icon: ClipboardList },
  { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'profile', label: 'Profile', icon: User },
];

// Chart colors
const chartColors = {
  brand: '#0ea5e9',
  accent: '#06b6d4',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  teal: '#14b8a6',
  cyan: '#06b6d4',
};

const subjectColors = [
  chartColors.brand,
  chartColors.accent,
  chartColors.success,
  chartColors.warning,
  chartColors.teal,
  chartColors.cyan,
];

function getTestAttempts(): TestAttempt[] {
  try {
    const stored = localStorage.getItem('test_attempts');
    if (!stored) return [];
    return JSON.parse(stored) as TestAttempt[];
  } catch {
    return [];
  }
}

function getBookmarkedQuestions(): BookmarkedQuestion[] {
  try {
    const stored = localStorage.getItem('bookmarked_questions');
    if (!stored) return [];
    return JSON.parse(stored) as BookmarkedQuestion[];
  } catch {
    return [];
  }
}

function generateCertificates(attempts: TestAttempt[]): Certificate[] {
  const certs: Certificate[] = [];
  const now = new Date().toISOString();

  if (attempts.length === 0) return certs;

  const totalTests = attempts.length;
  const avgScore = attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length;

  // Score Champion - any test > 90%
  if (attempts.some((a) => a.percentage > 90)) {
    certs.push({
      id: 'cert-score-champion',
      title: 'Score Champion',
      description: 'Achieved above 90% in a test',
      earnedDate: attempts.find((a) => a.percentage > 90)?.completedAt || now,
      icon: 'Trophy',
      color: 'from-accent-500 to-accent-700',
    });
  }

  // Test Master - completed 10+ tests
  if (totalTests >= 10) {
    certs.push({
      id: 'cert-test-master',
      title: 'Test Master',
      description: 'Completed 10 or more tests',
      earnedDate: attempts[9]?.completedAt || now,
      icon: 'Award',
      color: 'from-brand-500 to-brand-700',
    });
  }

  // Consistent Performer - average above 75%
  if (avgScore >= 75) {
    certs.push({
      id: 'cert-consistent',
      title: 'Consistent Performer',
      description: 'Maintained an average score above 75%',
      earnedDate: now,
      icon: 'TrendingUp',
      color: 'from-success-500 to-success-700',
    });
  }

  // Perfect Score - 100% in any test
  if (attempts.some((a) => a.percentage === 100)) {
    certs.push({
      id: 'cert-perfect',
      title: 'Perfect Score',
      description: 'Scored 100% in a test',
      earnedDate: attempts.find((a) => a.percentage === 100)?.completedAt || now,
      icon: 'Star',
      color: 'from-warning-500 to-accent-600',
    });
  }

  // Dedicated Learner - completed 5+ tests
  if (totalTests >= 5) {
    certs.push({
      id: 'cert-dedicated',
      title: 'Dedicated Learner',
      description: 'Completed 5 or more tests',
      earnedDate: attempts[4]?.completedAt || now,
      icon: 'BookOpen',
      color: 'from-teal-500 to-sky-700',
    });
  }

  return certs;
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<BookmarkedQuestion[]>([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '',
    board: '',
    className: '',
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Load test attempts and bookmarks from localStorage
  useEffect(() => {
    setTestAttempts(getTestAttempts());
    setBookmarkedQuestions(getBookmarkedQuestions());
  }, []);

  // Initialize profile form when user loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || '',
        phone: user.phone || '',
        board: user.board || '',
        className: user.className || '',
      });
    }
  }, [user]);

  // Compute stats
  const stats = useMemo(() => {
    if (testAttempts.length === 0) {
      return { testsTaken: 0, avgScore: 0, bestScore: 0, rank: 0 };
    }
    const testsTaken = testAttempts.length;
    const avgScore = Math.round(testAttempts.reduce((sum, a) => sum + a.percentage, 0) / testsTaken);
    const bestScore = Math.max(...testAttempts.map((a) => a.percentage));
    // Simulate rank based on score (lower rank = better)
    const rank = Math.max(1, Math.round((100 - avgScore) * 5));
    return { testsTaken, avgScore, bestScore, rank };
  }, [testAttempts]);

  // Line chart: Marks Trend (last 5 test scores)
  const marksTrendData = useMemo(() => {
    const last5 = testAttempts.slice(-5);
    return {
      labels: last5.map((a) => {
        const date = new Date(a.completedAt);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      }),
      datasets: [
        {
          label: 'Score %',
          data: last5.map((a) => a.percentage),
          borderColor: chartColors.brand,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: chartColors.brand,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };
  }, [testAttempts]);

  // Doughnut chart: Subject-wise Performance
  const subjectPerformanceData = useMemo(() => {
    const subjectMap: Record<string, number> = {};
    testAttempts.forEach((a) => {
      subjectMap[a.subject] = (subjectMap[a.subject] || 0) + a.percentage;
    });
    const subjects = Object.keys(subjectMap);
    return {
      labels: subjects.length > 0 ? subjects : ['No data'],
      datasets: [
        {
          data: subjects.length > 0 ? Object.values(subjectMap) : [1],
          backgroundColor: subjects.map((_, i) => subjectColors[i % subjectColors.length]),
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.5)',
        },
      ],
    };
  }, [testAttempts]);

  // Bar chart: Accuracy by Subject
  const accuracyBySubjectData = useMemo(() => {
    const subjectMap: Record<string, { correct: number; total: number }> = {};
    testAttempts.forEach((a) => {
      if (!subjectMap[a.subject]) {
        subjectMap[a.subject] = { correct: 0, total: 0 };
      }
      subjectMap[a.subject].correct += a.correctAnswers;
      subjectMap[a.subject].total += a.totalQuestions;
    });
    const subjects = Object.keys(subjectMap);
    const accuracy = subjects.map((s) => {
      const { correct, total } = subjectMap[s];
      return total > 0 ? Math.round((correct / total) * 100) : 0;
    });
    return {
      labels: subjects.length > 0 ? subjects : ['No data'],
      datasets: [
        {
          label: 'Accuracy %',
          data: subjects.length > 0 ? accuracy : [0],
          backgroundColor: subjects.map((_, i) => subjectColors[i % subjectColors.length]),
          borderRadius: 8,
          barThickness: 'flex' as const,
          maxBarThickness: 50,
        },
      ],
    };
  }, [testAttempts]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 16,
          font: { size: 12 },
          color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#475569',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#475569',
          font: { size: 11 },
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(148, 163, 184, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#475569',
          font: { size: 11 },
        },
        grid: { display: false },
      },
    },
  };

  // Completed test IDs
  const completedTestIds = useMemo(
    () => new Set(testAttempts.map((a) => a.testId)),
    [testAttempts]
  );

  // Pending/available tests (not yet completed)
  const availableTestsForUser = useMemo(
    () => availableTests.filter((t) => !completedTestIds.has(t.id)),
    [completedTestIds]
  );

  // Certificates
  const certificates = useMemo(() => generateCertificates(testAttempts), [testAttempts]);

  // Recent test attempts (last 5, newest first)
  const recentAttempts = useMemo(
    () => [...testAttempts].reverse().slice(0, 5),
    [testAttempts]
  );

  const handleSaveProfile = () => {
    // Profile editing is local-only (auth-managed fields come from Supabase)
    setEditingProfile(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 lg:pt-20">
      <div className="container-padding py-8">
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-4">
              {/* User Info */}
              <div className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950/30 dark:to-accent-950/30">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-lg font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white truncate">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>

              {/* Nav Items */}
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/25'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 mt-4 rounded-xl text-sm font-semibold text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950/30 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="min-w-0">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                {/* Welcome Message */}
                <div className="relative overflow-hidden rounded-2xl hero-gradient p-6 lg:p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.3),transparent_50%)]" />
                  <div className="relative z-10">
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      Welcome back, {user.fullName.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-blue-100">
                      Here's an overview of your performance and progress.
                    </p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stats.testsTaken}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Tests Taken</p>
                  </Card>

                  <Card className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-950/50 flex items-center justify-center">
                        <Target className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stats.avgScore}%
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Avg Score</p>
                  </Card>

                  <Card className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-success-100 dark:bg-success-950/50 flex items-center justify-center">
                        <Star className="w-5 h-5 text-success-600 dark:text-success-400" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-success-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stats.bestScore}%
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Best Score</p>
                  </Card>

                  <Card className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-warning-100 dark:bg-warning-950/50 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      #{stats.rank}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Rank</p>
                  </Card>
                </div>

                {/* Charts */}
                {testAttempts.length > 0 ? (
                  <>
                    {/* Marks Trend - Line Chart */}
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
                          <LineChartIcon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white">Marks Trend</h3>
                          <p className="text-xs text-slate-500">Your last 5 test scores</p>
                        </div>
                      </div>
                      <div className="h-64">
                        <Line data={marksTrendData} options={chartOptions} />
                      </div>
                    </Card>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Subject-wise Performance - Doughnut Chart */}
                      <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-950/50 flex items-center justify-center">
                            <PieChart className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">Subject-wise Performance</h3>
                            <p className="text-xs text-slate-500">Score distribution by subject</p>
                          </div>
                        </div>
                        <div className="h-64">
                          <Doughnut
                            data={subjectPerformanceData}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  position: 'bottom' as const,
                                  labels: {
                                    padding: 16,
                                    font: { size: 12 },
                                    color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#475569',
                                  },
                                },
                              },
                            }}
                          />
                        </div>
                      </Card>

                      {/* Accuracy by Subject - Bar Chart */}
                      <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-success-100 dark:bg-success-950/50 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-success-600 dark:text-success-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">Accuracy by Subject</h3>
                            <p className="text-xs text-slate-500">Correct answer percentage</p>
                          </div>
                        </div>
                        <div className="h-64">
                          <Bar data={accuracyBySubjectData} options={chartOptions} />
                        </div>
                      </Card>
                    </div>
                  </>
                ) : (
                  <Card className="p-12 text-center">
                    <BarChart3 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      No Test Data Yet
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                      Take your first test to see performance charts and analytics here.
                    </p>
                    <Link to="/tests" className="btn-primary">
                      Take a Test <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Card>
                )}

                {/* Recent Test Attempts */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Recent Test Attempts</h3>
                    <button
                      onClick={() => setActiveTab('my-tests')}
                      className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2 inline-flex items-center gap-1 transition-all"
                    >
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  {recentAttempts.length > 0 ? (
                    <div className="space-y-3">
                      {recentAttempts.map((attempt, i) => (
                        <div
                          key={`${attempt.testId}-${i}`}
                          className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              attempt.percentage >= 75
                                ? 'bg-success-100 dark:bg-success-950/50 text-success-600 dark:text-success-400'
                                : attempt.percentage >= 50
                                ? 'bg-warning-100 dark:bg-warning-950/50 text-warning-600 dark:text-warning-400'
                                : 'bg-error-100 dark:bg-error-950/50 text-error-600 dark:text-error-400'
                            }`}
                          >
                            {attempt.percentage >= 50 ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <XCircle className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                              {attempt.testTitle}
                            </p>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                              <span>{attempt.subject}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(attempt.completedAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900 dark:text-white">
                              {attempt.percentage}%
                            </p>
                            <p className="text-xs text-slate-500">
                              {attempt.score}/{attempt.totalMarks}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-500 dark:text-slate-400">
                        No tests attempted yet. Start your first test now!
                      </p>
                      <Link to="/tests" className="btn-primary mt-4">
                        Browse Tests <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* My Tests Tab */}
            {activeTab === 'my-tests' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">My Tests</h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Track your completed tests and discover new ones to take.
                  </p>
                </div>

                {/* Completed Tests */}
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success-500" />
                    Completed Tests ({testAttempts.length})
                  </h3>
                  {testAttempts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {testAttempts.reverse().map((attempt, i) => (
                        <Card key={`${attempt.testId}-${i}`} className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <Badge color="brand">{attempt.subject}</Badge>
                            <div
                              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                attempt.percentage >= 75
                                  ? 'bg-success-100 dark:bg-success-950/50 text-success-700 dark:text-success-300'
                                  : attempt.percentage >= 50
                                  ? 'bg-warning-100 dark:bg-warning-950/50 text-warning-700 dark:text-warning-300'
                                  : 'bg-error-100 dark:bg-error-950/50 text-error-700 dark:text-error-300'
                              }`}
                            >
                              {attempt.percentage}%
                            </div>
                          </div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                            {attempt.testTitle}
                          </h4>
                          <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              {attempt.score}/{attempt.totalMarks} marks
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {attempt.correctAnswers}/{attempt.totalQuestions} correct
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {attempt.duration} min
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {new Date(attempt.completedAt).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric',
                            })}
                          </p>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center">
                      <ClipboardList className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-500 dark:text-slate-400 mb-4">
                        You haven't completed any tests yet.
                      </p>
                      <Link to="/tests" className="btn-primary">
                        Browse Tests <ChevronRight className="w-4 h-4" />
                      </Link>
                    </Card>
                  )}
                </div>

                {/* Available Tests */}
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-500" />
                    Available Tests ({availableTestsForUser.length})
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {availableTestsForUser.slice(0, 8).map((test: TestInfo) => (
                      <Card key={test.id} className="p-5 hover:-translate-y-1 transition-transform">
                        <div className="flex items-start justify-between mb-3">
                          <Badge color="accent">{test.type}</Badge>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {test.duration} min
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                          {test.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                          <span>{test.board}</span> • <span>{test.className}</span> • <span>{test.subject}</span>
                        </div>
                        <Link to={`/tests/${test.id}`} className="btn-primary w-full text-sm py-2.5">
                          Start Test <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Card>
                    ))}
                  </div>
                  {availableTestsForUser.length > 8 && (
                    <div className="text-center mt-4">
                      <Link to="/tests" className="btn-outline">
                        View All Tests <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bookmarks Tab */}
            {activeTab === 'bookmarks' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Bookmarks</h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Questions you've saved for later review.
                  </p>
                </div>

                {bookmarkedQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {bookmarkedQuestions.map((q, i) => (
                      <Card key={`${q.id}-${i}`} className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge color="brand">{q.subject}</Badge>
                            <Badge color="slate">{q.difficulty}</Badge>
                          </div>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(q.bookmarkedAt).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short',
                            })}
                          </span>
                        </div>
                        <p className="font-medium text-slate-900 dark:text-white mb-3">
                          {q.question}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((opt, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center gap-3 p-2.5 rounded-lg text-sm ${
                                idx === q.correctAnswer
                                  ? 'bg-success-50 dark:bg-success-950/30 text-success-700 dark:text-success-300 font-medium'
                                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              {opt}
                              {idx === q.correctAnswer && (
                                <CheckCircle2 className="w-4 h-4 ml-auto text-success-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-12 text-center">
                    <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      No Bookmarked Questions
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                      While taking tests, bookmark questions you want to revisit later. They'll appear here.
                    </p>
                    <Link to="/tests" className="btn-primary">
                      Browse Tests <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Card>
                )}
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Certificates</h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Achievements earned through your test performance.
                  </p>
                </div>

                {certificates.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certificates.map((cert) => (
                      <Card key={cert.id} className="overflow-hidden hover:-translate-y-1 transition-transform">
                        <div className={`h-28 bg-gradient-to-br ${cert.color} relative flex items-center justify-center`}>
                          <div className="absolute inset-0 bg-black/10" />
                          <Award className="w-12 h-12 text-white relative z-10" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                            {cert.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(cert.earnedDate).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric',
                              })}
                            </span>
                            <button className="text-xs font-semibold text-brand-600 dark:text-brand-400 inline-flex items-center gap-1 hover:gap-2 transition-all">
                              <Download className="w-3 h-3" /> Download
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-12 text-center">
                    <Award className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      No Certificates Yet
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                      Earn certificates by performing well in tests! Score above 90% to become a
                      "Score Champion", complete 10+ tests to become a "Test Master", and more.
                    </p>
                    <Link to="/tests" className="btn-primary">
                      Start Earning <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Card>
                )}

                {/* Available Certificates Info */}
                <Card className="p-6">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                    Available Certificates
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { title: 'Score Champion', desc: 'Score above 90% in any test', icon: Trophy },
                      { title: 'Test Master', desc: 'Complete 10 or more tests', icon: Award },
                      { title: 'Consistent Performer', desc: 'Maintain avg score above 75%', icon: TrendingUp },
                      { title: 'Perfect Score', desc: 'Score 100% in any test', icon: Star },
                      { title: 'Dedicated Learner', desc: 'Complete 5 or more tests', icon: BookOpen },
                    ].map((c) => {
                      const Icon = c.icon;
                      const earned = certificates.some((cert) => cert.title === c.title);
                      return (
                        <div
                          key={c.title}
                          className={`flex items-center gap-3 p-3 rounded-xl ${
                            earned
                              ? 'bg-success-50 dark:bg-success-950/30 border border-success-200 dark:border-success-800'
                              : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              earned
                                ? 'bg-success-100 dark:bg-success-950/50 text-success-600 dark:text-success-400'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-slate-900 dark:text-white">
                              {c.title}
                            </p>
                            <p className="text-xs text-slate-500">{c.desc}</p>
                          </div>
                          {earned && <CheckCircle2 className="w-5 h-5 text-success-500" />}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Profile</h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Manage your account information.
                  </p>
                </div>

                <Card className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {user.fullName}
                      </h3>
                      <p className="text-sm text-slate-500">{user.email}</p>
                      <Badge color="brand">Student</Badge>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                        disabled={!editingProfile}
                        className="input disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="input opacity-60 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        disabled={!editingProfile}
                        placeholder="Enter phone number"
                        className="input disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Board
                      </label>
                      <select
                        value={profileForm.board}
                        onChange={(e) => setProfileForm({ ...profileForm, board: e.target.value })}
                        disabled={!editingProfile}
                        className="input disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <option value="">Select Board</option>
                        <option value="CBSE">CBSE</option>
                        <option value="State Board">State Board</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Class
                      </label>
                      <select
                        value={profileForm.className}
                        onChange={(e) => setProfileForm({ ...profileForm, className: e.target.value })}
                        disabled={!editingProfile}
                        className="input disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <option value="">Select Class</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        value="Student"
                        disabled
                        className="input opacity-60 cursor-not-allowed capitalize"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    {editingProfile ? (
                      <>
                        <button onClick={handleSaveProfile} className="btn-primary">
                          <Save className="w-4 h-4" /> Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setEditingProfile(false);
                            setProfileForm({
                              fullName: user.fullName || '',
                              phone: user.phone || '',
                              board: user.board || '',
                              className: user.className || '',
                            });
                          }}
                          className="btn-outline"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditingProfile(true)}
                        className="btn-outline"
                      >
                        <Edit className="w-4 h-4" /> Edit Profile
                      </button>
                    )}
                  </div>
                </Card>

                {/* Account Stats */}
                <Card className="p-6">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Account Summary</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <ClipboardList className="w-6 h-6 text-brand-500 mx-auto mb-2" />
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.testsTaken}</p>
                      <p className="text-xs text-slate-500">Tests Taken</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <Award className="w-6 h-6 text-accent-500 mx-auto mb-2" />
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{certificates.length}</p>
                      <p className="text-xs text-slate-500">Certificates</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <Bookmark className="w-6 h-6 text-success-500 mx-auto mb-2" />
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{bookmarkedQuestions.length}</p>
                      <p className="text-xs text-slate-500">Bookmarks</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <Trophy className="w-6 h-6 text-warning-500 mx-auto mb-2" />
                      <p className="text-xl font-bold text-slate-900 dark:text-white">#{stats.rank}</p>
                      <p className="text-xs text-slate-500">Rank</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
