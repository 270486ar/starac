import { Link } from 'react-router-dom';
import {
  ArrowRight, Target, Eye, Award, Users, Building2, TrendingUp,
  HeartHandshake, BookOpen, Smile, Smartphone, MapPin, Calendar,
  GraduationCap, AirVent, Wifi, Presentation, Library,
  ShieldCheck, Lightbulb,
} from 'lucide-react';
import { SectionHeader, Card, Badge, AnimatedCounter } from '../components/ui/SectionHeader';
import { faculty, stats, whyChooseUs } from '../data/content';
import { getImage } from '../data/images';

const iconMap: Record<string, typeof Award> = {
  Award, Users, Building2, TrendingUp, HeartHandshake, BookOpen, Smile, Smartphone,
};

const infrastructure = [
  { icon: AirVent, title: 'Air-Conditioned Classrooms', description: 'Spacious, fully air-conditioned classrooms for a comfortable learning environment.' },
  { icon: Presentation, title: 'Digital Smart Boards', description: 'Modern digital teaching aids and smart boards for interactive learning.' },
  { icon: Library, title: 'Study Library', description: 'A well-stocked library with reference books, sample papers, and study materials.' },
  { icon: Wifi, title: 'High-Speed Internet', description: 'Campus-wide Wi-Fi for online tests, research, and digital learning resources.' },
  { icon: ShieldCheck, title: 'Safe & Secure Campus', description: 'A safe, monitored environment giving parents peace of mind.' },
  { icon: Lightbulb, title: 'Doubt Clearing Sessions', description: 'Dedicated doubt-clearing time with faculty outside regular class hours.' },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.2),transparent_50%)]" />
        </div>
        <div className="container-padding relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">

              <Badge color="accent">About Stars Academy</Badge>

  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-6 mt-4 text-balance">
    Two Decades of{" "}
    <span className="bg-gradient-to-r from-accent-400 via-accent-300 to-yellow-300 bg-clip-text text-transparent">
      Educational Excellence
    </span>
  </h1>

  <p className="text-lg text-blue-100 mb-6 max-w-xl leading-relaxed">
  Founded in <strong className="text-white">2005</strong> by
  <strong className="text-white"> Mr. S. Jeyaseelan</strong>,
  Stars Academy has been one of Karaikal's most trusted coaching institutions
  for over two decades. We provide comprehensive coaching for
  <strong className="text-white"> CBSE Classes VI–XII</strong> along with
  specialized training for
  <strong className="text-white"> JEE, NEET, and other competitive examinations</strong>.
  Our disciplined academic environment, experienced faculty, and
  student-centered approach have helped thousands of students achieve
  academic excellence and lifelong success.
</p>

  <div className="flex flex-wrap gap-4 text-sm text-blue-100">
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
      <Calendar className="w-4 h-4" />
      Established 2005
    </span>

    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
      <MapPin className="w-4 h-4" />
      MGJ Nagar, Karaikal
    </span>
  </div>

</div>
            <div className="hidden lg:block">
              <div className="glass-card rounded-3xl p-8 shadow-2xl bg-white/10 border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-4xl font-bold text-white mb-1">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-blue-100 text-sm text-center italic">
                    "Building strong foundations for lifelong success."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>
{/* About Us */}
<section className="section-padding bg-white dark:bg-slate-950">
  <div className="container-padding max-w-5xl mx-auto">

    <SectionHeader
      badge="Our Story"
      title="About Stars Academy"
      subtitle="A legacy of excellence in education since 2005."
    />

    <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">

      <p>
        Stars Academy was founded in <strong>2005</strong> by
        <strong> Mr. S. Jeyaseelan</strong> in Karaikal with a vision of
        providing quality education that empowers students to achieve
        academic excellence and lifelong success.
      </p>

      <p>
        For over two decades, Stars Academy has been one of the most trusted
        coaching institutions in the Karaikal region, known for its disciplined
        academic environment, experienced faculty, and student-centered
        approach. We offer comprehensive coaching for CBSE students from
        Classes VI to XII, along with specialized training for JEE, NEET,
        and other competitive examinations.
      </p>

      <p>
        Our commitment to excellence is reflected in the outstanding
        achievements of our students. Stars Academy proudly produced a
        <strong> State First Rank holder during the 2023–24 academic year</strong>
        and has consistently guided numerous JEE aspirants to secure admissions
        in reputed engineering institutions across India. Many of our students
        have also secured School First positions in schools throughout the
        Karaikal region.
      </p>

      <p>
        At Stars Academy, we believe that education extends beyond examination
        success. Through conceptual learning, regular assessments,
        personalized mentoring, and value-based education, we prepare every
        student to excel in higher education, build successful careers,
        and become confident, responsible citizens.
      </p>

      <p className="font-semibold text-brand-600 dark:text-brand-400">
        Our mission is simple: Every student who enters Stars Academy should
        leave with the knowledge, confidence, skills, and values to excel in
        higher studies and succeed in life.
      </p>

    </div>
  </div>
</section>
      {/* Mission & Vision */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-padding">
          <SectionHeader
            badge="Our Purpose"
            title="Mission & Vision"
            subtitle="Guided by clear principles that shape every decision we make for our students."
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To provide high-quality, concept-first coaching that empowers students from Class 9 to 12
                to excel in CBSE and State Board examinations. We are committed to making learning
                accessible, stress-free, and result-oriented through personalized attention and modern
                teaching methods.
              </p>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-accent-100 dark:bg-accent-950/50 flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To be the most trusted coaching center in Karaikal and the surrounding region, known for
                producing confident, knowledgeable, and well-rounded students. We envision a future where
                every child—regardless of background—has access to excellent education and the opportunity
                to achieve their full potential.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-padding">
          <SectionHeader
            badge="Why Choose Us"
            title="The Stars Academy Advantage"
            subtitle="Eight reasons why parents and students have trusted us for over 20 years."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => {
              const Icon = iconMap[item.icon] || Award;
              return (
                <Card key={item.title} className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-padding">
          <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-brand-800 dark:from-brand-800 dark:to-brand-950 p-12 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-blue-100 text-sm sm:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-padding">
          <SectionHeader
            badge="Our Faculty"
            title="Meet Our Expert Teachers"
            subtitle="Highly qualified and experienced educators dedicated to your child's success."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={getImage(member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-brand-600 dark:text-brand-400 font-medium text-sm mb-3">{member.designation}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.subjects.map((subject) => (
                      <Badge key={subject} color="brand">{subject}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm border-t border-slate-200 dark:border-slate-800 pt-4">
                    <span className="text-slate-500 dark:text-slate-400">{member.qualification}</span>
                    <Badge color="accent">{member.experience}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section-padding bg-white dark:bg-slate-950">
        <div className="container-padding">
          <SectionHeader
            badge="Infrastructure"
            title="Modern Facilities for Modern Learning"
            subtitle="Our campus is equipped with everything needed for a comfortable and effective learning experience."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructure.map((item) => (
              <Card key={item.title} className="p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent-100 dark:bg-accent-950/50 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-padding">
          <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-accent-600 p-12 text-center shadow-2xl">
            <GraduationCap className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Join the Stars Academy Family?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Admissions are open for the 2026-27 academic year. Explore our courses or get in touch
              with us to learn more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-700 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Explore Courses <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/20 transition-all"
              >
                Contact Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
