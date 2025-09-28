import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/80 backdrop-blur-md py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* 左侧：版权信息 */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-400">
              © 2025 TechPortfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}