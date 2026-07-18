import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, GraduationCap, ArrowRight,
  AlertCircle, Loader2, Trophy, TrendingUp, Users, Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);

    if (signInError) {
      setError(signInError);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding / Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.2),transparent_50%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-white block leading-tight">Stars Academy</span>
              <span className="text-xs text-blue-200">Karaikal • Est. 2005</span>
            </div>
          </Link>

          {/* Hero Content */}
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent-400" />
              <span className="text-sm font-medium">Welcome back, student!</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Learn • Practice<br />
              <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                Score • Succeed
              </span>
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Sign in to access your personalized dashboard, track your progress, take tests,
              and climb the leaderboard.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Track Your Progress</p>
                  <p className="text-sm text-blue-200">Monitor scores and performance trends</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Climb the Leaderboard</p>
                  <p className="text-sm text-blue-200">Compete with peers and earn certificates</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Expert-Crafted Tests</p>
                  <p className="text-sm text-blue-200">Practice with CBSE & State Board patterns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-bold text-white">5000+</p>
              <p className="text-sm text-blue-200">Students</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-sm text-blue-200">Pass Rate</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-bold text-white">20+</p>
              <p className="text-sm text-blue-200">Years</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-slate-950">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 dark:text-white block leading-tight">Stars Academy</span>
              <span className="text-xs text-slate-500">Karaikal • Est. 2005</span>
            </div>
          </Link>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Sign in to your account
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Forgot Password Message */}
          {forgotPassword && (
            <div className="mb-6 p-4 rounded-xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 flex items-start gap-3 animate-fade-in">
              <Mail className="w-5 h-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-brand-900 dark:text-brand-200">
                  Password Reset
                </p>
                <p className="text-sm text-brand-700 dark:text-brand-300 mt-1">
                  Please contact the academy administrator at{' '}
                  <a href="tel:+914362260500" className="font-semibold underline">
                    +91 4362 260500
                  </a>{' '}
                  or visit the office to reset your password.
                </p>
                <button
                  onClick={() => setForgotPassword(false)}
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-2 hover:underline"
                >
                  Back to login
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error-50 dark:bg-error-950/30 border border-error-200 dark:border-error-800 flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-error-600 dark:text-error-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error-700 dark:text-error-300">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="input pl-12"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="input pl-12 pr-12"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Register here
            </Link>
          </p>

          {/* Back to Home */}
          <p className="text-center mt-4">
            <Link to="/" className="text-sm text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
