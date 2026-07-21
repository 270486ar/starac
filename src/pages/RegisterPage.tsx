import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, User, Phone, GraduationCap,
  ArrowRight, AlertCircle, Loader2, CheckCircle2, BookOpen,
  Trophy, TrendingUp, Sparkles, Building2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const boards = ['CBSE', 'State Board'] as const;
const classes = ['Class 9', 'Class 10', 'Class 11', 'Class 12'] as const;

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  board?: string;
  className?: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    board: '',
    className: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name - required
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    // Email - required + format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password - required
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    // Confirm Password - must match
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Phone - required
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    // Board - required
    if (!formData.board) {
      newErrors.board = 'Please select a board.';
    }

    // Class - required
    if (!formData.className) {
      newErrors.className = 'Please select a class.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    const { error: signUpError } = await signUp(
      formData.email,
      formData.password,
      {
        fullName: formData.fullName,
        role: 'student',
        className: formData.className,
        board: formData.board,
        phone: formData.phone,
      }
    );
    setLoading(false);

    if (signUpError) {
      setError(signUpError);
    } else {
      navigate('/dashboard');
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear field error on change
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
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
              <span className="text-sm font-medium">Join 5000+ students!</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Start your<br />
              <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                success journey
              </span>
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Create your account to access online tests, study materials, performance tracking,
              and compete on the leaderboard.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Comprehensive Study Materials</p>
                  <p className="text-sm text-blue-200">Notes, question banks & video lectures</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Performance Analytics</p>
                  <p className="text-sm text-blue-200">Track progress with charts & insights</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Earn Certificates</p>
                  <p className="text-sm text-blue-200">Get rewarded for your achievements</p>
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
              <p className="text-2xl font-bold text-white">150+</p>
              <p className="text-sm text-blue-200">Toppers</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-sm text-blue-200">Pass Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-slate-950 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
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
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Create your account
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Join Stars Academy and start your journey to success.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error-50 dark:bg-error-950/30 border border-error-200 dark:border-error-800 flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-error-600 dark:text-error-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error-700 dark:text-error-300">{error}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Full Name <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className={`input pl-12 ${errors.fullName ? 'border-error-400 focus:ring-error-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-error-600 dark:text-error-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email Address <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="reg-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`input pl-12 ${errors.email ? 'border-error-400 focus:ring-error-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-error-600 dark:text-error-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Phone Number <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+919655516285"
                  className={`input pl-12 ${errors.phone ? 'border-error-400 focus:ring-error-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-error-600 dark:text-error-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>

            {/* Board & Class - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="board" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Board <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <select
                    id="board"
                    value={formData.board}
                    onChange={(e) => handleChange('board', e.target.value)}
                    className={`input pl-12 ${errors.board ? 'border-error-400 focus:ring-error-500' : ''}`}
                    disabled={loading}
                  >
                    <option value="">Select Board</option>
                    {boards.map((board) => (
                      <option key={board} value={board}>{board}</option>
                    ))}
                  </select>
                </div>
                {errors.board && (
                  <p className="text-xs text-error-600 dark:text-error-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.board}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="className" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Class <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <select
                    id="className"
                    value={formData.className}
                    onChange={(e) => handleChange('className', e.target.value)}
                    className={`input pl-12 ${errors.className ? 'border-error-400 focus:ring-error-500' : ''}`}
                    disabled={loading}
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                {errors.className && (
                  <p className="text-xs text-error-600 dark:text-error-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.className}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Password <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className={`input pl-12 pr-12 ${errors.password ? 'border-error-400 focus:ring-error-500' : ''}`}
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
              {errors.password && (
                <p className="text-xs text-error-600 dark:text-error-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Confirm Password <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className={`input pl-12 pr-12 ${errors.confirmPassword ? 'border-error-400 focus:ring-error-500' : ''}`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword ? (
                <p className="text-xs text-error-600 dark:text-error-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                </p>
              ) : (
                formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-xs text-success-600 dark:text-success-400 mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Passwords match
                  </p>
                )
              )}
            </div>

            {/* Role (hidden - defaults to student) */}
            <input type="hidden" value="student" />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Sign in here
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
