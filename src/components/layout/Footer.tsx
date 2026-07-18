import { Link } from 'react-router-dom';
import {
  GraduationCap, MapPin, Phone, Mail, Clock, Facebook, Instagram,
  Youtube, Send, Heart, MessageCircle, Map, ChevronRight, Sparkles,
} from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Online Tests', path: '/tests' },
  { name: 'Study Materials', path: '/study-materials' },
  { name: 'Question Bank', path: '/question-bank' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'Contact', path: '/contact' },
];

const courses = [
  { name: 'Class 9 Foundation', path: '/courses' },
  { name: 'Class 10 Board Excellence', path: '/courses' },
  { name: 'Class 11 Science Stream', path: '/courses' },
  { name: 'Class 12 Board + Competitive', path: '/courses' },
  { name: 'State Board Programs', path: '/courses' },
  { name: 'Commerce Stream', path: '/courses' },
];

const resources = [
  { name: 'Study Materials', path: '/study-materials' },
  { name: 'Previous Year Papers', path: '/study-materials' },
  { name: 'Sample Papers', path: '/study-materials' },
  { name: 'Online Test Platform', path: '/tests' },
  { name: 'Student Dashboard', path: '/dashboard' },
  { name: 'Register Now', path: '/register' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-brand-950 via-brand-900 to-sky-950 text-sky-100 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-sky-400 to-accent-400" />

      <div className="container-padding relative z-10 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-sky-500 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white">Stars Academy</span>
                <p className="text-xs text-sky-300 font-medium">Karaikal • Est. 2005</p>
              </div>
            </Link>
            <p className="text-sm text-sky-200/70 leading-relaxed mb-5 max-w-sm font-body">
              Learn • Practice • Score • Succeed. A premier coaching center in Karaikal
              dedicated to academic excellence since 2005. Building bright futures, one student at a time.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 mb-5">
              <a
                href="https://wa.me/914362260500"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-success-500 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-brand-600 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-pink-500 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-error-600 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://maps.google.com/?q=Stars+Academy+Karaikal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-accent-500 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg"
                aria-label="Google Maps"
              >
                <Map className="w-5 h-5" />
              </a>
            </div>

            {/* Contact info */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3 text-sky-200/70">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>MGJ Nagar, Near New Bus Stand, Karaikal Bazaar, Karaikal, Puducherry 609602</span>
              </div>
              <div className="flex items-center gap-3 text-sky-200/70">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="tel:+914362260500" className="hover:text-sky-300 transition-colors">+91 4362 260500</a>
              </div>
              <div className="flex items-center gap-3 text-sky-200/70">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:info@starsacademy.org" className="hover:text-sky-300 transition-colors">info@starsacademy.org</a>
              </div>
              <div className="flex items-start gap-3 text-sky-200/70">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM • Sunday: Closed</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-sky-400" />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-sky-200/70 hover:text-sky-300 transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-sky-500 group-hover:w-3 group-hover:h-0.5 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-sky-400" />
              Courses
            </h3>
            <ul className="space-y-2.5">
              {courses.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-sky-200/70 hover:text-sky-300 transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-sky-500 group-hover:w-3 group-hover:h-0.5 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-sky-400" />
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-sky-200/70 hover:text-sky-300 transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-sky-500 group-hover:w-3 group-hover:h-0.5 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glassmorphism-dark rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white">Stay Updated</h3>
                <p className="text-sm text-sky-200/70">Get notifications about new tests, results, and announcements.</p>
              </div>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-sky-300/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <Send className="w-4 h-4" /> Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sky-300/60">
            © {new Date().getFullYear()} Stars Academy Karaikal. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-sky-300/60">
            <Link to="/about" className="hover:text-sky-300 transition-colors">Privacy Policy</Link>
            <span className="w-1 h-1 rounded-full bg-sky-500/50" />
            <Link to="/about" className="hover:text-sky-300 transition-colors">Terms of Service</Link>
            <span className="w-1 h-1 rounded-full bg-sky-500/50" />
            <Link to="/contact" className="hover:text-sky-300 transition-colors">Support</Link>
          </div>
          <p className="text-sm text-sky-300/60 flex items-center gap-1.5">
            Made with <Heart className="w-4 h-4 text-error-500 fill-error-500" /> for education
          </p>
        </div>
      </div>
    </footer>
  );
}
