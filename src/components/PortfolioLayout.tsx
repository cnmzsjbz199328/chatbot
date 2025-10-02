import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div 
      className="relative flex h-screen flex-col overflow-hidden font-sans transition-colors duration-300" 
      style={{ 
        fontFamily: 'Inter, "Noto Sans", sans-serif',
        backgroundColor: 'var(--secondary-color)',
        color: 'var(--text-primary)'
      }}
    >
      {/* 背景图片层 - 使用伪元素实现透明度 */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.1
        }}
      />
      
      {/* 内容层 */}
      <div className="relative z-10 flex h-full flex-col">
        <Header />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
