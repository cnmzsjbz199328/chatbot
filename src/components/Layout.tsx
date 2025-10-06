import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col font-sans transition-colors duration-300" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif', backgroundColor: 'var(--secondary-color)', color: 'var(--text-primary)' }}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}