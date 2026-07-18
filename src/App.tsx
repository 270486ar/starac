import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const StudyMaterialsPage = lazy(() => import('./pages/StudyMaterialsPage'));
const QuestionBankPage = lazy(() => import('./pages/QuestionBankPage'));
const TestsPage = lazy(() => import('./pages/TestsPage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const TestResultPage = lazy(() => import('./pages/TestResultPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/study-materials" element={<StudyMaterialsPage />} />
                <Route path="/question-bank" element={<QuestionBankPage />} />
                <Route path="/tests" element={<TestsPage />} />
                <Route path="/tests/:testId" element={<TestPage />} />
                <Route path="/tests/:testId/result" element={<TestResultPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/dashboard/*" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={
                  <div className="container-padding py-20 text-center">
                    <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">Page not found</p>
                    <a href="/" className="btn-primary">Go Home</a>
                  </div>
                } />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
