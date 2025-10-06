export default function Footer() {
  return (
    <footer className="border-t                │ 
 │      border-[var(--border-color)] bg-                 │ 
 │      [var(--secondary-color)]/80                      │ 
 │      backdrop-blur-md py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2025 TechPortfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}