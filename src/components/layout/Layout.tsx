import { type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
