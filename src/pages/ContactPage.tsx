import { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle,
  Facebook, Twitter, Instagram, Youtube, MessageSquare, Navigation,
} from 'lucide-react';
import { Card, Badge } from '../components/ui/SectionHeader';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['MGJ Nagar, Near New Bus Stand', 'Karaikal Bazaar, Karaikal', 'Puducherry 609602'],
    color: 'brand',
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 4362 260500'],
    color: 'accent',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@starsacademy.org'],
    color: 'success',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Mon–Sat: 9:00 AM – 8:00 PM', 'Sunday: Closed'],
    color: 'warning',
  },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', url: '#' },
  { icon: Twitter, label: 'Twitter', url: '#' },
  { icon: Instagram, label: 'Instagram', url: '#' },
  { icon: Youtube, label: 'YouTube', url: '#' },
];

const badgeColorMap: Record<string, string> = {
  brand: 'bg-brand-100 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400',
  accent: 'bg-accent-100 dark:bg-accent-950/50 text-accent-600 dark:text-accent-400',
  success: 'bg-success-100 dark:bg-success-950/50 text-success-600 dark:text-success-400',
  warning: 'bg-warning-100 dark:bg-warning-950/50 text-warning-600 dark:text-warning-400',
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s\-()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // In a real app, this would send data to a backend
      setSubmitted(true);
      setFormData(initialForm);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.2),transparent_50%)]" />
        </div>
        <div className="container-padding relative z-10 pt-24 pb-16 text-center">
          <Badge color="accent">Get in Touch</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4 text-balance">
            Contact <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">Stars Academy</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Have questions about admissions, courses, or fees? We're here to help. Reach out to us
            through any of the channels below.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-padding">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info) => (
              <Card key={info.title} className="p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${badgeColorMap[info.color]} flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{info.title}</h3>
                <div className="space-y-1">
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-sm text-slate-600 dark:text-slate-400">{line}</p>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Send Us a Message</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">We'll get back to you within 24 hours.</p>
                </div>
              </div>

              {/* Success message */}
              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-success-50 dark:bg-success-950/30 border border-success-200 dark:border-success-900 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-success-800 dark:text-success-300 text-sm">Message sent successfully!</p>
                    <p className="text-success-700 dark:text-success-400 text-sm">Thank you for reaching out. We'll respond shortly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                      errors.name ? 'border-error-300 dark:border-error-700' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-error-600 dark:text-error-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                        errors.email ? 'border-error-300 dark:border-error-700' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-sm text-error-600 dark:text-error-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Phone <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all ${
                        errors.phone ? 'border-error-300 dark:border-error-700' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-sm text-error-600 dark:text-error-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject <span className="text-error-500">*</span>
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all cursor-pointer ${
                      errors.subject ? 'border-error-300 dark:border-error-700' : 'border-slate-200 dark:border-slate-700'
                    } ${!formData.subject && 'text-slate-400'}`}
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="Admission Inquiry">Admission Inquiry</option>
                    <option value="Course Details">Course Details</option>
                    <option value="Fee Structure">Fee Structure</option>
                    <option value="Demo Class Request">Demo Class Request</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1.5 text-sm text-error-600 dark:text-error-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Message <span className="text-error-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us how we can help you..."
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none ${
                      errors.message ? 'border-error-300 dark:border-error-700' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-error-600 dark:text-error-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 text-white font-semibold shadow-lg hover:bg-brand-700 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </Card>

            {/* Map + Social */}
            <div className="space-y-6">
              {/* Google Maps Embed */}
              <Card className="overflow-hidden">
                <div className="flex items-center gap-3 p-6 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-950/50 flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Find Us on the Map</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">MGJ Nagar, Karaikal</p>
                  </div>
                </div>
                <div className="relative h-64 bg-slate-200 dark:bg-slate-800">
                  <iframe
                    title="Stars Academy Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.0!2d79.83!3d11.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKaraikal%2C%20Puducherry%20609602!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
              </Card>

              {/* Quick Address Card */}
              <Card className="p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Our Address</h3>
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p>MGJ Nagar, Near New Bus Stand</p>
                      <p>Karaikal Bazaar, Karaikal</p>
                      <p>Puducherry 609602</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent-500 flex-shrink-0" />
                    <a href="tel:+914362260500" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      +91 4362 260500
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-success-500 flex-shrink-0" />
                    <a href="mailto:info@starsacademy.org" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      info@starsacademy.org
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 dark:hover:text-white transition-all hover:-translate-y-0.5"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
