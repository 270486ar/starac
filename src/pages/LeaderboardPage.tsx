import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Medal, Crown, Star, TrendingUp, Users, Target,
  Award, ChevronRight, Search,
} from 'lucide-react';
import { SectionHeader, Card, Badge } from '../components/ui/SectionHeader';
import { topRankers, type Ranker } from '../data/content';
import { useAuth } from '../context/AuthContext';
import { getImage } from '../data/images';

type RankingTab = 'Overall' | 'Subject Ranking' | 'Weekly' | 'Monthly' | 'Class Ranking';

const rankingTabs: RankingTab[] = ['Overall', 'Subject Ranking', 'Weekly', 'Monthly', 'Class Ranking'];

const subjects = ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology', 'Social Science', 'English', 'Commerce'];
const classes = ['Class 9', 'Class 10', 'Class 11', 'Class 12'];

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  className: string;
  board: string;
  score: number;
  testsCompleted: number;
  bestPercentage: number;
  subject: string;
  image?: string;
  isCurrentUser?: boolean;
}

// Generate additional mock leaderboard entries for a fuller table
const mockNames = [
  'Vignesh R', 'Ananya S', 'Karthik M', 'Priya D', 'Suresh K',
  'Bhavani T', 'Arun V', 'Deepika R', 'Ganesh S', 'Lakshmi P',
  'Mohan R', 'Saranya K', 'Dinesh T', 'Kavya S', 'Rahul M',
  'Sneha R', 'Vijay K', 'Aishwarya P', 'Praveen S', 'Nithya K',
];

const mockClasses = ['Class 9', 'Class 10', 'Class 11', 'Class 12'];
const mockBoards = ['CBSE', 'State Board'];

function generateMockEntries(count: number, startRank: number): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = [];
  for (let i = 0; i < count; i++) {
    const name = mockNames[i % mockNames.length];
    const className = mockClasses[i % mockClasses.length];
    const board = mockBoards[i % mockBoards.length];
    const subject = subjects[i % subjects.length];
    // Scores decrease gradually from startRank
    const score = Math.max(100, 960 - (startRank + i - 4) * 15 + Math.floor(Math.random() * 10));
    const testsCompleted = 8 + Math.floor(Math.random() * 20);
    const bestPercentage = Math.min(100, Math.max(60, 96 - (startRank + i - 4) + Math.floor(Math.random() * 5)));
    entries.push({
      id: `mock-${i}`,
      rank: startRank + i,
      name,
      className,
      board,
      score,
      testsCompleted,
      bestPercentage,
      subject,
    });
  }
  return entries;
}

function rankerToEntry(ranker: Ranker, userId?: string): LeaderboardEntry {
  const isCurrentUser = !!userId && ranker.name === userId;
  return {
    id: ranker.id,
    rank: ranker.rank,
    name: ranker.name,
    className: ranker.className,
    board: ranker.board,
    score: Math.round(parseFloat(ranker.percentage) * 10),
    testsCompleted: 15 + Math.floor(Math.random() * 10),
    bestPercentage: parseFloat(ranker.percentage),
    subject: ranker.subject,
    image: ranker.image,
    isCurrentUser,
  };
}

const podiumStyles = [
  {
    // Gold - 1st
    badge: 'bg-gradient-to-br from-accent-400 to-accent-600',
    ring: 'ring-accent-400',
    glow: 'shadow-accent-500/40',
    label: 'text-accent-600 dark:text-accent-400',
    icon: Crown,
    iconColor: 'text-accent-500',
    height: 'lg:h-64',
    order: 'order-2 lg:order-1',
    medal: '🥇',
  },
  {
    // Silver - 2nd
    badge: 'bg-gradient-to-br from-slate-300 to-slate-500',
    ring: 'ring-slate-400',
    glow: 'shadow-slate-400/40',
    label: 'text-slate-500 dark:text-slate-300',
    icon: Medal,
    iconColor: 'text-slate-400',
    height: 'lg:h-56',
    order: 'order-1 lg:order-2',
    medal: '🥈',
  },
  {
    // Bronze - 3rd
    badge: 'bg-gradient-to-br from-sky-400 to-sky-600',
    ring: 'ring-sky-400',
    glow: 'shadow-sky-400/40',
    label: 'text-sky-600 dark:text-sky-400',
    icon: Award,
    iconColor: 'text-sky-500',
    height: 'lg:h-48',
    order: 'order-3',
    medal: '🥉',
  },
];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<RankingTab>('Overall');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Build the full leaderboard: top rankers + mock entries
  const fullLeaderboard = useMemo<LeaderboardEntry[]>(() => {
    const topEntries = topRankers.map((r) => rankerToEntry(r, user?.fullName));
    const mockEntries = generateMockEntries(20, topRankers.length + 1);
    return [...topEntries, ...mockEntries];
  }, [user]);

  // Filter based on active tab
  const filteredLeaderboard = useMemo(() => {
    let entries = [...fullLeaderboard];

    if (activeTab === 'Subject Ranking') {
      entries = entries.filter((e) => e.subject === selectedSubject || e.subject === 'All Subjects');
    } else if (activeTab === 'Class Ranking') {
      entries = entries.filter((e) => e.className === selectedClass);
    } else if (activeTab === 'Weekly') {
      // Simulate weekly ranking with slightly different scores
      entries = entries
        .map((e, i) => ({
          ...e,
          score: Math.max(50, e.score - Math.floor(Math.random() * 100)),
          rank: i + 1,
        }))
        .sort((a, b) => b.score - a.score)
        .map((e, i) => ({ ...e, rank: i + 1 }));
    } else if (activeTab === 'Monthly') {
      // Simulate monthly ranking
      entries = entries
        .map((e, i) => ({
          ...e,
          score: Math.max(80, e.score - Math.floor(Math.random() * 50)),
          rank: i + 1,
        }))
        .sort((a, b) => b.score - a.score)
        .map((e, i) => ({ ...e, rank: i + 1 }));
    }

    // Re-rank after filtering
    if (activeTab === 'Subject Ranking' || activeTab === 'Class Ranking') {
      entries = entries
        .sort((a, b) => b.score - a.score)
        .map((e, i) => ({ ...e, rank: i + 1 }));
    }

    // Apply search
    if (searchQuery.trim()) {
      entries = entries.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    return entries;
  }, [fullLeaderboard, activeTab, selectedSubject, selectedClass, searchQuery]);

  // Top 3 for podium
  const podiumEntries = filteredLeaderboard.slice(0, 3);

  // Table entries (exclude top 3 if on Overall, or show all for filtered)
  const tableEntries = filteredLeaderboard.slice(3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.2),transparent_50%)]" />
        <div className="container-padding relative z-10 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in">
            <Trophy className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-medium text-white">Hall of Fame</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
            Student{' '}
            <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto mb-8 animate-fade-in-up animate-delay-200">
            Celebrating excellence! See where you stand among the brightest minds at Stars Academy.
            Keep practicing to climb the ranks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up animate-delay-300">
            <div className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5 text-accent-400" />
              <span className="text-sm font-medium">5000+ Students</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <TrendingUp className="w-5 h-5 text-success-400" />
              <span className="text-sm font-medium">Updated Daily</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Award className="w-5 h-5 text-accent-400" />
              <span className="text-sm font-medium">150+ Toppers</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>

      {/* Ranking Type Tabs */}
      <section className="container-padding -mt-6 relative z-20">
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {rankingTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/25'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 py-2.5 text-sm"
              />
            </div>
          </div>
          {/* Conditional filters */}
          {activeTab === 'Subject Ranking' && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedSubject === subject
                      ? 'bg-accent-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          )}
          {activeTab === 'Class Ranking' && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-2">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedClass === cls
                      ? 'bg-accent-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          )}
        </Card>
      </section>

      {/* Top 3 Podium */}
      {podiumEntries.length >= 3 && (
        <section className="section-padding pb-8">
          <div className="container-padding">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
              {podiumEntries.map((entry, index) => {
                const style = podiumStyles[index];
                const Icon = style.icon;
                return (
                  <div
                    key={entry.id}
                    className={`${style.order} ${style.height} flex flex-col items-center animate-fade-in-up`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Avatar & Info */}
                    <div className="text-center mb-4">
                      <div className="relative inline-block mb-3">
                        <div
                          className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full ring-4 ${style.ring} ${style.glow} shadow-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br ${style.badge} text-white text-3xl font-bold`}
                        >
                          {entry.image ? (
                            <img
                              src={getImage(entry.image)}
                              alt={entry.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            entry.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div
                          className={`absolute -top-2 -right-2 w-9 h-9 rounded-full ${style.badge} flex items-center justify-center shadow-lg`}
                        >
                          <Icon className={`w-5 h-5 ${style.iconColor}`} />
                        </div>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        {entry.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {entry.className} • {entry.board}
                      </p>
                      {entry.isCurrentUser && (
                        <span className="inline-block mt-1 badge bg-brand-100 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 text-xs">
                          You
                        </span>
                      )}
                    </div>
                    {/* Podium Block */}
                    <div
                      className={`w-full ${style.height} rounded-t-2xl bg-gradient-to-b ${style.badge} flex flex-col items-center justify-center pt-6 shadow-xl relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/10" />
                      <div className="relative z-10 text-center">
                        <div className="text-4xl mb-2">{style.medal}</div>
                        <div className={`text-5xl font-bold ${style.label === 'text-accent-600 dark:text-accent-400' ? 'text-white' : 'text-white'}`}>
                          #{entry.rank}
                        </div>
                        <div className="text-2xl font-bold text-white mt-1">
                          {entry.score}
                        </div>
                        <div className="text-xs text-white/80 font-medium uppercase tracking-wide">
                          Points
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Full Ranking Table */}
      <section className="section-padding pt-4">
        <div className="container-padding">
          <SectionHeader
            badge="Full Rankings"
            title="Complete Leaderboard"
            subtitle="Full ranking of all students by their performance"
            centered={false}
          />

          {tableEntries.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                No students found matching your search.
              </p>
            </Card>
          ) : (
            <Card className="overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Board
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Tests Completed
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Best %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {tableEntries.map((entry) => (
                      <tr
                        key={entry.id}
                        className={`transition-colors ${
                          entry.isCurrentUser
                            ? 'bg-brand-50 dark:bg-brand-950/30 border-l-4 border-brand-500'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className={`flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm ${
                            entry.rank <= 3
                              ? 'bg-accent-100 dark:bg-accent-950/50 text-accent-700 dark:text-accent-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}>
                            {entry.rank}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                              {entry.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white">
                                {entry.name}
                                {entry.isCurrentUser && (
                                  <span className="ml-2 badge bg-brand-100 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 text-xs">
                                    You
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-slate-500">{entry.subject}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {entry.className}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge color={entry.board === 'CBSE' ? 'brand' : 'accent'}>
                            {entry.board}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
                            <span className="font-bold text-slate-900 dark:text-white">
                              {entry.score}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                            {entry.testsCompleted}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  entry.bestPercentage >= 90
                                    ? 'bg-success-500'
                                    : entry.bestPercentage >= 75
                                    ? 'bg-brand-500'
                                    : 'bg-warning-500'
                                }`}
                                style={{ width: `${entry.bestPercentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              {entry.bestPercentage}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                {tableEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`p-4 ${entry.isCurrentUser ? 'bg-brand-50 dark:bg-brand-950/30 border-l-4 border-brand-500' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-sm ${
                        entry.rank <= 3
                          ? 'bg-accent-100 dark:bg-accent-950/50 text-accent-700 dark:text-accent-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        {entry.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {entry.name}
                          {entry.isCurrentUser && (
                            <span className="ml-2 badge bg-brand-100 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 text-xs">
                              You
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500">
                          {entry.className} • {entry.board}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
                          <span className="font-bold text-slate-900 dark:text-white">
                            {entry.score}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 pl-13">
                      <span>{entry.testsCompleted} tests completed</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Best: {entry.bestPercentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* CTA */}
          {!user && (
            <div className="mt-10 text-center">
              <Card className="p-8 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950/30 dark:to-accent-950/30 border-brand-200 dark:border-brand-800">
                <Target className="w-10 h-10 text-brand-600 dark:text-brand-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Want to See Your Name Here?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                  Register today, take tests, and climb the leaderboard. Compete with the best students at Stars Academy!
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/register" className="btn-primary">
                    Register Now <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link to="/tests" className="btn-outline">
                    Take a Test
                  </Link>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
