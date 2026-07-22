import type { Board, ClassName, Subject } from './questions';
import { images } from './images';

export interface Course {
  id: string;
  title: string;
  board: Board;
  className: ClassName;
  subjects: Subject[];
  duration: string;
  description: string;
  features: string[];
  popular: boolean;
  color: string;
}

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Class 9 Foundation Program',
    board: 'CBSE',
    className: 'Class 9',
    subjects: ['Mathematics', 'Science', 'Social Science', 'English'],
    duration: '10 Months',
    description: 'Build a rock-solid foundation in core subjects with conceptual clarity and regular practice tests.',
    features: ['Concept-first teaching', 'Weekly chapter tests', 'Doubt clearing sessions', 'NCERT-aligned'],
    popular: true,
    color: 'from-brand-500 to-brand-700',
  },
  {
    id: 'c2',
    title: 'Class 10 Board Excellence',
    board: 'CBSE',
    className: 'Class 10',
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Tamil'],
    duration: '10 Months',
    description: 'Comprehensive CBSE Class 10 preparation with focus on board exam excellence and high scores.',
    features: ['Full board syllabus coverage', 'Previous year papers', 'Mock board exams', 'Performance tracking'],
    popular: true,
    color: 'from-accent-500 to-accent-700',
  },
  {
    id: 'c3',
    title: 'Class 11 Science Stream',
    board: 'CBSE',
    className: 'Class 11',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    duration: '10 Months',
    description: 'Specialized coaching for Science stream students with deep conceptual understanding in PCM and PCB.',
    features: ['PCM & PCB tracks', 'Lab-based learning', 'Competitive exam foundation', 'Regular assessments'],
    popular: true,
    color: 'from-success-500 to-success-700',
  },
  {
    id: 'c4',
    title: 'Class 12 Board + Competitive',
    board: 'CBSE',
    className: 'Class 12',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    duration: '10 Months',
    description: 'Dual-focus program preparing students for both CBSE board exams and entrance tests.',
    features: ['Board + JEE/NEET prep', 'Chapter-wise tests', 'Full-length mock exams', 'Revision marathons'],
    popular: true,
    color: 'from-brand-600 to-accent-600',
  },
  {
    id: 'c5',
    title: 'Class 9 State Board',
    board: 'State Board',
    className: 'Class 9',
    subjects: ['Mathematics', 'Science', 'Social Science', 'Tamil', 'English'],
    duration: '10 Months',
    description: 'Tamil Nadu State Board curriculum with bilingual support and exam-oriented coaching.',
    features: ['Samacheer Kalvi aligned', 'Tamil & English medium', 'Quarterly exam prep', 'Subject specialists'],
    popular: false,
    color: 'from-brand-500 to-brand-700',
  },
  {
    id: 'c6',
    title: 'Class 10 State Board SSLC',
    board: 'State Board',
    className: 'Class 10',
    subjects: ['Mathematics', 'Science', 'Social Science', 'Tamil', 'English'],
    duration: '10 Months',
    description: 'Intensive SSLC preparation with Tamil Nadu State Board pattern and high-scoring strategies.',
    features: ['SSLC pattern tests', 'Model examinations', 'Revision schedules', 'Result analysis'],
    popular: false,
    color: 'from-accent-500 to-accent-700',
  },
  {
    id: 'c7',
    title: 'Class 11 Commerce Stream',
    board: 'CBSE',
    className: 'Class 11',
    subjects: ['Accountancy', 'Commerce', 'Economics', 'Business Maths'],
    duration: '10 Months',
    description: 'Comprehensive Commerce stream coaching with practical accounting and business studies.',
    features: ['Accountancy practice', 'Business case studies', 'Economics analysis', 'Regular tests'],
    popular: false,
    color: 'from-success-500 to-success-700',
  },
  {
    id: 'c8',
    title: 'Class 12 Commerce Board',
    board: 'CBSE',
    className: 'Class 12',
    subjects: ['Accountancy', 'Commerce', 'Economics', 'Business Maths'],
    duration: '10 Months',
    description: 'Score high in Class 12 Commerce board exams with structured preparation and mock tests.',
    features: ['Board pattern tests', 'Accountancy problem sets', 'Economics model papers', 'Business studies'],
    popular: false,
    color: 'from-brand-600 to-accent-600',
  },
];

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  subjects: string[];
  experience: string;
  qualification: string;
  image: string;
  bio: string;
}

export const faculty: Faculty[] = [
  {
    id: 'f1',
    name: 'Dr. Rahulgandh',
    designation: 'Mathematics Head | Academic Mentor',
    subjects: ['Advanced Mathematics', 'CBSE Board Preparation', 'Competitive Exam Mentoring', 'Concept-Based Learning'],
    experience: '10 Years',
    qualification: 'Ph.D. (NIT), M.Tech. (Wireless Communications), B.Tech. (ECE)',
    image: images.faculty.Rahulgandh,
    bio: '"Mathematics becomes easy when concepts are understood clearly. I encourage logical thinking, problem-solving, and consistent practice to build confidence." Achievements: Ph.D. from NIT; 10 years of teaching and mentoring excellence.',
  },
  {
    id: 'f2',
    name: 'Dr. Rajasri',
    designation: 'Physics Head | Academic Mentor',
    subjects: ['Physics', 'Conceptual & Numerical Problem Solving', 'Competitive Exam Preparation', 'Experimental Learning'],
    experience: '10 Years',
    qualification: 'Ph.D. (NIT), M.Tech. (Wireless Communications), B.Tech. (ECE)',
    image: images.faculty.Rajasri,
    bio: '"Physics is best understood through concepts and real-life applications. My goal is to inspire scientific thinking and analytical reasoning." Achievements: Ph.D. from NIT; Expert in CBSE and competitive exam mentoring.',
  },
  {
    id: 'f3',
    name: 'Dr. Rajiv',
    designation: 'JEE/NEET Physics Faculty',
    subjects: ['JEE & NEET Physics', 'Advanced Problem Solving', 'Higher Secondary Physics'],
    experience: '25 Years',
    qualification: 'M.Sc., Ph.D.',
    image: images.faculty.Rajiv,
    bio: '"Success in competitive exams comes from conceptual clarity, disciplined practice, and smart problem-solving." Achievements: 25 years of coaching experience.',
  },
  {
    id: 'f4',
    name: 'Mr. S. Jeyaseelan',
    designation: 'Founder | Chemistry Head',
    subjects: ['Chemistry', 'Educational Psychology', 'Academic Leadership', 'Student Mentoring'],
    experience: '22 Years',
    qualification: 'M.Sc. (Organic Chemistry), M.Sc. (Psychology), M.Ed.',
    image: images.faculty.Jeyaseelan,
    bio: '"Education nurtures confident, disciplined and responsible individuals through scientific understanding and personal guidance." Achievements: Founder of Stars Academy; 22 years of academic leadership.',
  },
  {
    id: 'f5',
    name: 'Mr. Jeyaseelan',
    designation: 'Senior Faculty – Mathematics',
    subjects: ['Mathematics', 'Board Preparation', 'Higher Mathematics'],
    experience: '28 Years',
    qualification: 'M.Sc., M.Ed.',
    image: images.faculty.Jeyaseelan,
    bio: '"Strong mathematical foundations are built through understanding, patience and regular practice." Achievements: 28 years of teaching excellence.',
  },
  {
    id: 'f6',
    name: 'Mr. Mohan',
    designation: 'Senior Faculty – Chemistry',
    subjects: ['Chemistry', 'Practical Applications', 'Board Preparation'],
    experience: '12 Years',
    qualification: 'M.Sc.',
    image: images.faculty.Mohan,
    bio: '"Chemistry becomes enjoyable when concepts connect with everyday life." Achievements: 12 years of teaching experience.',
  },
  {
    id: 'f7',
    name: 'Mr. S. Vinoth',
    designation: 'Senior Faculty – Chemistry',
    subjects: ['Chemistry', 'Board Preparation', 'Student Mentoring'],
    experience: '22 Years',
    qualification: 'M.Sc., M.Ed.',
    image: images.faculty.Vinoth,
    bio: '"Simple explanations and systematic revision are the keys to mastering chemistry." Achievements: 22 years of teaching excellence.',
  },
  {
    id: 'f8',
    name: 'Mrs. S. Nivetha',
    designation: 'Senior Faculty – Physics',
    subjects: ['Physics', 'Concept Building', 'Numerical Problem Solving'],
    experience: '5 Years',
    qualification: 'M.Sc., B.Ed.',
    image: images.faculty.lakshmiRajasekaran,
    bio: '"Every concept should be understood before it is memorized." Achievements: Dedicated CBSE Physics mentor.',
  },
  {
    id: 'f9',
    name: 'Mr. Murugavel',
    designation: 'Senior Faculty – Biology',
    subjects: ['Biology', 'NEET Foundation', 'Conceptual Learning'],
    experience: '5 Years',
    qualification: 'M.Sc., B.Ed.',
    image: images.faculty.Murugavel,
    bio: '"Biology is best learned by understanding nature and real-life observations." Achievements: Passionate Biology mentor.',
  },
  {
    id: 'f10',
    name: 'Ms. S. Monicaminu',
    designation: 'Senior Faculty – Biology',
    subjects: ['Biology', 'Board Preparation'],
    experience: '5 Years',
    qualification: 'M.Sc., B.Ed.',
    image: images.faculty.Monicaminu,
    bio: '"I encourage curiosity and scientific thinking." Achievements: Experienced CBSE Biology educator.',
  },
  {
    id: 'f11',
    name: 'Ms. P. Krishnaveni',
    designation: 'Senior Faculty – Mathematics',
    subjects: ['Mathematics', 'Logical Reasoning', 'Exam Preparation'],
    experience: '7 Years',
    qualification: 'M.Sc., B.Ed.',
    image: images.faculty.Krishnaveni,
    bio: '"Confidence in mathematics comes through conceptual understanding and continuous practice." Achievements: 7 years of experience.',
  },
  {
    id: 'f12',
    name: 'Dr. N. Babu',
    designation: 'Senior Faculty – Social Science',
    subjects: ['History', 'Geography', 'Civics', 'Economics'],
    experience: 'Experienced',
    qualification: 'Ph.D., M.A., M.Ed.',
    image: images.faculty.Babu,
    bio: '"Social Science develops critical thinking and responsible citizenship." Achievements: Experienced educator.',
  },
  {
    id: 'f13',
    name: 'Mrs. Caroline Mary',
    designation: 'Senior Faculty – Biology',
    subjects: ['Biology', 'Practical Learning'],
    experience: 'Experienced',
    qualification: 'M.Sc., B.Ed.',
    image: images.faculty.Caroline Mary,
    bio: '"Learning biology should inspire curiosity about life." Achievements: Dedicated Biology educator.',
  },
  {
    id: 'f14',
    name: 'Ms. Medonna J.',
    designation: 'Senior Faculty – English | Phonics Specialist',
    subjects: ['English Literature', 'Phonics', 'Communication'],
    experience: '4 Years',
    qualification: 'M.A., B.Ed. (English Literature)',
    image: images.faculty.Medonna,
    bio: '"Language learning becomes effective through reading, speaking and confident expression." Achievements: Phonics specialist.',
  },
  {
    id: 'f15',
    name: 'Ms. Rajeswari',
    designation: 'Junior Faculty – Mathematics',
    subjects: ['Mathematics', 'Foundation Learning'],
    experience: '3 Years',
    qualification: 'B.Sc., B.Ed.',
    image: images.faculty.Rajeswari,
    bio: '"Building confidence through simple explanations." Achievements: Dedicated Mathematics educator.',
  },
  {
    id: 'f16',
    name: 'Ms. Marzuka',
    designation: 'Junior Faculty – Mathematics',
    subjects: ['Mathematics', 'Concept Reinforcement'],
    experience: '4 Years',
    qualification: 'M.Sc., B.Ed.',
    image: images.faculty.Marzuka,
    bio: '"Every student can succeed in mathematics with the right guidance." Achievements: CBSE Mathematics instructor.',
  },
  {
    id: 'f17',
    name: 'Mrs. Sugandhi',
    designation: 'Junior Faculty – Science',
    subjects: ['General Science', 'Foundation Science'],
    experience: '10 Years',
    qualification: 'M.Sc., B.Ed.',
    image: images.faculty.Sugandhi,
    bio: '"Science should inspire curiosity and exploration." Achievements: 10 years of experience.',
  },
  {
    id: 'f18',
    name: 'Ms. Jasmine',
    designation: 'Junior Faculty – English | Phonics Specialist',
    subjects: ['English', 'Phonics', 'Communication'],
    experience: '5 Years',
    qualification: 'M.A., B.Ed.',
    image: images.faculty.Jasmine,
    bio: '"Strong language skills open doors to lifelong learning." Achievements: Phonics specialist.',
  },
  {
    id: 'f19',
    name: 'Mrs. Rehana Begum',
    designation: 'English Head',
    subjects: ['English', 'Grammar', 'Literature'],
    experience: '15 Years',
    qualification: 'M.A., M.Ed.',
    image: images.faculty.Rehana Begum,
    bio: '"Language education develops confident communicators." Achievements: 15 years of teaching excellence.',
  },
  {
    id: 'f20',
    name: 'Mr. J. Sathya',
    designation: 'Junior Faculty – Hindi & Tamil',
    subjects: ['Hindi', 'Tamil', 'Hindi Prachar Sabha Coaching'],
    experience: '3 Years',
    qualification: 'B.A., Praveen Poorvardh (Dakshina Bharat Hindi Prachar Sabha)',
    image: images.faculty.Sathya,
    bio: '"Language learning should inspire confidence and communication." Achievements: Advanced Hindi Prachar Sabha qualification; Trains students for Hindi certification courses.',
  },
  {
    id: 'f21',
    name: 'Ms. Aruljothi',
    designation: 'Tamil Head',
    subjects: ['Tamil Literature', 'Grammar', 'Creative Writing'],
    experience: '20 Years',
    qualification: 'M.A., M.Ed.',
    image: images.faculty.Aruljothi,
    bio: '"Every student can master Tamil through structured guidance." Achievements: Expert in literature and foundational language development.',
  },
  {
    id: 'f22',
    name: 'Ms. Meera Jose',
    designation: 'Faculty – Social Science',
    subjects: ['Social Science', 'Student Mentoring'],
    experience: '2 Years',
    qualification: 'M.Sc. (Competitive Examinations Aspirant)',
    image: images.faculty.Meera Jose,
    bio: '"Interactive teaching encourages independent thinking." Achievements: Passionate young educator.',
  },
  {
    id: 'f23',
    name: 'Mr. Manikumaran',
    designation: 'Senior Faculty & HR Manager – Physics & Mathematics',
    subjects: ['Physics', 'Mathematics', 'Academic Administration'],
    experience: '9 Years',
    qualification: 'MBA, B.Tech. (DECE)',
    image: images.faculty.Manikumaran,
    bio: '"I focus on strong fundamentals, disciplined study habits, and student confidence." Achievements: Teaching and HR leadership experience.',
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string;
  year: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Aravind Kumar',
    role: 'Class 12 CBSE — 96% in Boards',
    rating: 5,
    text: 'Stars Academy transformed my approach to studying. The teachers are incredibly patient and always available for doubt clearing. I scored 96% in my board exams thanks to their guidance.',
    image: images.testimonials.aravindKumar,
    year: '2024',
  },
  {
    id: 't2',
    name: 'Divya S',
    role: 'Class 10 State Board — 488/500 SSLC',
    rating: 5,
    text: 'The SSLC preparation at Stars Academy was outstanding. The mock exams and revision schedules helped me stay on track. I scored 488 out of 500 in my board exams!',
    image: images.testimonials.divyaS,
    year: '2024',
  },
  {
    id: 't3',
    name: 'Karthik Raja',
    role: 'Class 11 Science — PCM Topper',
    rating: 5,
    text: 'The Physics and Chemistry coaching here is exceptional. The conceptual teaching method helped me understand topics that I previously found very difficult.',
    image: images.testimonials.karthikRaja,
    year: '2023',
  },
  {
    id: 't4',
    name: 'Priyanka M',
    role: 'Parent of Class 9 Student',
    rating: 5,
    text: 'As a parent, I am very happy with Stars Academy. The AC classrooms and safe environment give me peace of mind. My daughter has shown remarkable improvement in Mathematics.',
    image: images.testimonials.priyankaM,
    year: '2024',
  },
  {
    id: 't5',
    name: 'Surya Prakash',
    role: 'Class 12 Commerce — 94%',
    rating: 5,
    text: 'The Commerce stream coaching is top-notch. The accountancy problem sets and economics model papers prepared me thoroughly for the board exams.',
    image: images.testimonials.suryaPrakash,
    year: '2023',
  },
  {
    id: 't6',
    name: 'Janani K',
    role: 'Class 10 CBSE — 95.4%',
    rating: 5,
    text: 'The friendly and stress-free atmosphere at Stars Academy made learning enjoyable. The teachers never made us feel pressured, yet we achieved excellent results.',
    image: images.testimonials.jananiK,
    year: '2024',
  },
];

export interface Ranker {
  id: string;
  name: string;
  className: string;
  board: string;
  percentage: string;
  rank: number;
  subject: string;
  image: string;
}

export const topRankers: Ranker[] = [
  { id: 'r1', name: 'Aravind Kumar', className: 'Class 12', board: 'CBSE', percentage: '96%', rank: 1, subject: 'Science Stream', image: images.leaderboard.aravindKumar },
  { id: 'r2', name: 'Divya S', className: 'Class 10', board: 'State Board', percentage: '97.6%', rank: 2, subject: 'SSLC', image: images.leaderboard.divyaS },
  { id: 'r3', name: 'Karthik Raja', className: 'Class 11', board: 'CBSE', percentage: '95.2%', rank: 3, subject: 'PCM', image: images.leaderboard.karthikRaja },
  { id: 'r4', name: 'Janani K', className: 'Class 10', board: 'CBSE', percentage: '95.4%', rank: 4, subject: 'All Subjects', image: images.leaderboard.jananiK },
  { id: 'r5', name: 'Surya Prakash', className: 'Class 12', board: 'CBSE', percentage: '94%', rank: 5, subject: 'Commerce', image: images.leaderboard.suryaPrakash },
  { id: 'r6', name: 'Meena T', className: 'Class 12', board: 'State Board', percentage: '93.8%', rank: 6, subject: 'Science', image: images.leaderboard.meenaT },
];

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  important: boolean;
}

export const announcements: Announcement[] = [
  { id: 'a1', title: 'Admissions Open for 2026-26 Academic Year', date: '2026-06-01', category: 'Admission', content: 'Stars Academy is now accepting admissions for Classes 9-12 across CBSE and State Board streams. Limited seats available. Early bird discount for first 50 enrollments.', important: true },
  { id: 'a2', title: 'Free Demo Classes This Weekend', date: '2026-06-08', category: 'Event', content: 'Experience our teaching methodology with free demo classes on Saturday and Sunday. All subjects and classes welcome. Register at the front desk or call us.', important: true },
  { id: 'a3', title: 'Class 10 Board Exam Results — 100% Pass Rate', date: '2026-05-15', category: 'Results', content: 'Congratulations to all our Class 10 students for achieving a 100% pass rate in the 2026 board exams. 23 students scored above 90%!', important: false },
  { id: 'a4', title: 'New AC Classrooms Inaugurated', date: '2026-04-20', category: 'Infrastructure', content: 'We have upgraded our facilities with fully air-conditioned classrooms and modern digital teaching aids for an enhanced learning experience.', important: false },
  { id: 'a5', title: 'Weekly Mock Test Schedule Released', date: '2026-06-10', category: 'Academic', content: 'Weekly chapter-wise mock tests begin from June 15. Check the notice board or your dashboard for the complete schedule.', important: true },
  { id: 'a6', title: 'Parent-Teacher Meeting — July 5', date: '2026-06-25', category: 'Event', content: 'PTM scheduled for July 5, 2026. Parents are requested to attend to discuss their child\'s progress and performance.', important: false },
];

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'Notes' | 'PDF' | 'Video' | 'Question Bank' | 'Sample Paper' | 'Previous Year Paper';
  className: ClassName;
  subject: string;
  description: string;
  icon: string;
}

export const studyMaterials: StudyMaterial[] = [
  { id: 'sm1', title: 'Class 10 Science — Chapter Notes (All Chapters)', type: 'Notes', className: 'Class 10', subject: 'Science', description: 'Comprehensive handwritten notes covering all chapters with diagrams and key formulas.', icon: 'FileText' },
  { id: 'sm2', title: 'Class 12 Physics — Formula Sheet', type: 'PDF', className: 'Class 12', subject: 'Physics', description: 'Complete formula sheet for quick revision before exams. Covers all chapters.', icon: 'FileText' },
  { id: 'sm3', title: 'Class 10 Mathematics — Video Lectures', type: 'Video', className: 'Class 10', subject: 'Mathematics', description: 'Step-by-step video solutions for all NCERT problems and important questions.', icon: 'Video' },
  { id: 'sm4', title: 'Class 11 Chemistry — Question Bank', type: 'Question Bank', className: 'Class 11', subject: 'Chemistry', description: '500+ practice questions with detailed solutions organized chapter-wise.', icon: 'BookOpen' },
  { id: 'sm5', title: 'Class 10 CBSE — Sample Papers (2026)', type: 'Sample Paper', className: 'Class 10', subject: 'All Subjects', description: 'Latest CBSE sample papers with marking scheme and answer keys.', icon: 'ClipboardList' },
  { id: 'sm6', title: 'Class 12 — Previous Year Papers (2020-2024)', type: 'Previous Year Paper', className: 'Class 12', subject: 'All Subjects', description: '5 years of solved previous year question papers for board exam practice.', icon: 'Archive' },
  { id: 'sm7', title: 'Class 9 Mathematics — Chapter Notes', type: 'Notes', className: 'Class 9', subject: 'Mathematics', description: 'Detailed notes with solved examples for every chapter in Class 9 Maths.', icon: 'FileText' },
  { id: 'sm8', title: 'Class 11 Physics — Important Questions', type: 'Question Bank', className: 'Class 11', subject: 'Physics', description: 'Most frequently asked questions compiled from past 10 years of exams.', icon: 'BookOpen' },
  { id: 'sm9', title: 'Class 10 Social Science — Video Lectures', type: 'Video', className: 'Class 10', subject: 'Social Science', description: 'Engaging video lectures covering History, Geography, Civics, and Economics.', icon: 'Video' },
  { id: 'sm10', title: 'Class 12 Biology — Sample Papers', type: 'Sample Paper', className: 'Class 12', subject: 'Biology', description: 'NCERT-based sample papers with detailed solutions and diagrams.', icon: 'ClipboardList' },
  { id: 'sm11', title: 'Class 11 Commerce — Accountancy Notes', type: 'Notes', className: 'Class 11', subject: 'Accountancy', description: 'Step-by-step notes on journal entries, ledger posting, and trial balance.', icon: 'FileText' },
  { id: 'sm12', title: 'Class 10 State Board — Previous Year Papers', type: 'Previous Year Paper', className: 'Class 10', subject: 'All Subjects', description: 'Tamil Nadu State Board SSLC previous year papers with solutions.', icon: 'Archive' },
];

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export const newsItems: NewsItem[] = [
  { id: 'n1', title: 'Stars Academy Student Tops CBSE Class 12 in Karaikal', date: '2026-05-14', excerpt: 'Aravind Kumar scored 96% in the CBSE Class 12 board exams, making Stars Academy proud with the highest score in the region.', image: images.events.newsTopper },
  { id: 'n2', title: '100% Pass Rate in Class 10 Board Exams 2026', date: '2026-05-10', excerpt: 'All Class 10 students at Stars Academy passed their board exams with flying colors, with 23 students scoring above 90%.', image: images.events.newsPassRate },
  { id: 'n3', title: 'New Digital Smart Classrooms Launched', date: '2026-04-20', excerpt: 'Stars Academy has upgraded its infrastructure with digital smart boards and AC classrooms for a modern learning experience.', image: images.events.newsSmartClassrooms },
  { id: 'n4', title: 'Annual Day Celebration 2026', date: '2026-03-15', excerpt: 'Stars Academy celebrated its 20th Annual Day with cultural programs, award ceremonies, and student performances.', image: images.events.newsAnnualDay },
];

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 'g1', title: 'AC Classroom', image: images.gallery.acClassroom, category: 'Infrastructure' },
  { id: 'g2', title: 'Science Lab', image: images.gallery.scienceLab, category: 'Infrastructure' },
  { id: 'g3', title: 'Annual Day', image: images.gallery.annualDay, category: 'Events' },
  { id: 'g4', title: 'Award Ceremony', image: images.gallery.awardCeremony, category: 'Events' },
  { id: 'g5', title: 'Group Study', image: images.gallery.groupStudy, category: 'Academics' },
  { id: 'g6', title: 'Exam Hall', image: images.gallery.examHall, category: 'Academics' },
];

export interface Challenge {
  id: string;
  title: string;
  type: 'Weekly' | 'Monthly';
  description: string;
  questionCount: number;
  duration: string;
  subject: string;
  prize: string;
}

export const challenges: Challenge[] = [
  { id: 'ch1', title: 'Weekly Math Challenge', type: 'Weekly', description: 'Test your Mathematics skills with 10 challenging problems from Algebra and Geometry.', questionCount: 10, duration: '20 min', subject: 'Mathematics', prize: 'Top 3 get featured on Leaderboard' },
  { id: 'ch2', title: 'Weekly Science Quiz', type: 'Weekly', description: '10 questions covering Physics, Chemistry, and Biology fundamentals.', questionCount: 10, duration: '15 min', subject: 'Science', prize: 'Badge: Science Champion' },
  { id: 'ch3', title: 'Monthly Grand Quiz', type: 'Monthly', description: 'Comprehensive 30-question quiz across all subjects. The ultimate test of knowledge.', questionCount: 30, duration: '45 min', subject: 'All Subjects', prize: 'Certificate + Featured on Homepage' },
  { id: 'ch4', title: 'Monthly Physics Olympiad', type: 'Monthly', description: 'Advanced Physics problems for Class 11-12 students. Test your conceptual depth.', questionCount: 20, duration: '30 min', subject: 'Physics', prize: 'Certificate: Physics Olympiad' },
];

export const stats = [
  { label: 'Years of Excellence', value: 20, suffix: '+' },
  { label: 'Students Trained', value: 5000, suffix: '+' },
  { label: 'Board Toppers', value: 150, suffix: '+' },
  { label: 'Pass Rate', value: 100, suffix: '%' },
];

export const whyChooseUs = [
  { icon: 'Award', title: '20+ Years of Excellence', description: 'Since 2005, we have been the trusted name in coaching education in Karaikal.' },
  { icon: 'Users', title: 'Expert Faculty', description: 'Highly qualified and experienced teachers who are patient, friendly, and dedicated.' },
  { icon: 'Building2', title: 'Premium Infrastructure', description: 'Air-conditioned classrooms with modern digital teaching aids and a safe environment.' },
  { icon: 'TrendingUp', title: 'Proven Results', description: 'Consistent 100% pass rate with numerous board exam toppers every year.' },
  { icon: 'HeartHandshake', title: 'Personal Attention', description: 'Small batch sizes ensure every student gets individual focus and doubt clearing.' },
  { icon: 'BookOpen', title: 'Concept-First Teaching', description: 'We build strong conceptual understanding, not just rote memorization.' },
  { icon: 'Smartphone', title: 'Online Test Platform', description: 'Practice anytime with our comprehensive online test system and instant results.' },
  { icon: 'Smile', title: 'Stress-Free Learning', description: 'A friendly atmosphere that balances academics with extracurricular activities.' },
];
