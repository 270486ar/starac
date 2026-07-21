import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu, X, Moon, Sun, GraduationCap, ChevronDown, User, LogOut,
  LayoutDashboard, BookOpen, Trophy, Phone, Search, XCircle,
  UserCog, Shield, Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Online Tests', path: '/tests' },
  { name: 'Study Materials', path: '/study-materials' },
  { name: 'Results', path: '/leaderboard' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'Contact', path: '/contact' },
];

const loginOptions = [
  { name: 'Student Login', path: '/login', icon: User, color: 'text-brand-600' },
  { name: 'Teacher Login', path: '/login?role=teacher', icon: UserCog, color: 'text-sky-600' },
  { name: 'Admin Login', path: '/login?role=admin', icon: Shield, color: 'text-accent-600' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const loginRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
    setLoginMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) setLoginMenuOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHome = location.pathname === '/';
  const showTransparent = isHome && !scrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-sky-600 text-white text-sm py-2 overflow-hidden">
        <div className="container-padding flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" />
          <span className="font-body font-medium truncate">
            Admissions Open for 2026-27! Early bird discount for first 10 enrollments. Call +919655516285 
          </span>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          showTransparent
            ? 'bg-transparent'
            : 'glass shadow-lg shadow-brand-900/5'
        }`}
      >
        <nav className="container-padding flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-brand-600 to-sky-500 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform`}>
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-display font-bold text-lg lg:text-xl leading-tight ${showTransparent ? 'text-white' : 'text-brand-900 dark:text-white'}`}>
                Stars Academy
              </span>
              <span className={`text-[10px] lg:text-xs font-medium tracking-wide ${showTransparent ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'}`}>
                Karaikal • Est. 2005
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? showTransparent
                        ? 'text-white bg-white/20'
                        : 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40'
                      : showTransparent
                        ? 'text-sky-50 hover:text-white hover:bg-white/15'
                        : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2.5 rounded-lg transition-colors ${showTransparent ? 'text-white hover:bg-white/15' : 'text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800'}`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg transition-colors ${showTransparent ? 'text-white hover:bg-white/15' : 'text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800'}`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative hidden sm:block" ref={userRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-sky-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                    {user.fullName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card shadow-xl p-2 animate-fade-in">
                    <div className="px-3 py-2 border-b border-brand-100 dark:border-slate-700 mb-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/dashboard/bookmarks" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors">
                      <BookOpen className="w-4 h-4" /> Bookmarks
                    </Link>
                    <Link to="/dashboard/certificates" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors">
                      <Trophy className="w-4 h-4" /> Certificates
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950/30 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2" ref={loginRef}>
                {/* Login Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setLoginMenuOpen(!loginMenuOpen)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${showTransparent ? 'text-white hover:bg-white/15' : 'text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-slate-800'}`}
                  >
                    <User className="w-4 h-4" /> Login
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${loginMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {loginMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 glass-card shadow-xl p-2 animate-fade-in">
                      {loginOptions.map((opt) => (
                        <Link
                          key={opt.name}
                          to={opt.path}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <opt.icon className={`w-4 h-4 ${opt.color}`} />
                          {opt.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {/* Register Button */}
                <Link to="/register" className="btn-accent text-sm py-2 px-4">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`xl:hidden p-2.5 rounded-lg transition-colors ${showTransparent ? 'text-white hover:bg-white/15' : 'text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-brand-100 dark:border-slate-700 animate-fade-in">
            <div className="container-padding py-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, tests, study materials..."
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white dark:bg-slate-800 border border-brand-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden glass border-t border-brand-100 dark:border-slate-700 animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="container-padding py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-brand-100 dark:border-slate-700 space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950/30"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  {loginOptions.map((opt) => (
                    <Link key={opt.name} to={opt.path} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800">
                      <opt.icon className={`w-4 h-4 ${opt.color}`} /> {opt.name}
                    </Link>
                  ))}
                  <Link to="/register" className="btn-accent w-full text-sm">
                    Register Now
                  </Link>
                </>
              )}
              <a href="tel:+914362260500" className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800">
                <Phone className="w-4 h-4" /> +919655516285
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
