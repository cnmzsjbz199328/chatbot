import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-gray-900 font-sans text-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <Header />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
