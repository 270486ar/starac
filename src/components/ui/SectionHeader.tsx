import { type ReactNode, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  badge?: string;
  actionLink?: { label: string; path: string };
}

export function SectionHeader({ title, subtitle, centered = true, badge, actionLink }: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-100 to-sky-100 dark:from-brand-950/50 dark:to-sky-950/50 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-200/50 dark:border-brand-800/50">
          {badge}
        </span>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white mb-3 text-balance leading-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`text-slate-600 dark:text-slate-400 text-base lg:text-lg max-w-2xl ${centered ? 'mx-auto' : ''} font-body leading-relaxed`}>
          {subtitle}
        </p>
      )}
      {actionLink && (
        <Link to={actionLink.path} className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold text-sm mt-4 hover:gap-3 transition-all">
          {actionLink.label} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

export function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function Badge({ children, color = 'brand' }: { children: ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    brand: 'bg-brand-100 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300',
    accent: 'bg-accent-100 dark:bg-accent-950/50 text-accent-700 dark:text-accent-300',
    success: 'bg-success-100 dark:bg-success-950/50 text-success-700 dark:text-success-300',
    warning: 'bg-warning-100 dark:bg-warning-950/50 text-warning-700 dark:text-warning-300',
    error: 'bg-error-100 dark:bg-error-950/50 text-error-700 dark:text-error-300',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  };
  return <span className={`badge ${colors[color] || colors.brand}`}>{children}</span>;
}
