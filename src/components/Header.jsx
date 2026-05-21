import { ArrowLeft } from 'lucide-react';

export default function Header({ onLogoClick, showBack }) {
  return (
    <header className="bg-light border-b-2 border-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={onLogoClick}
              className="border-2 border-dark px-3 py-1 text-sm hover:bg-dark hover:text-light transition-colors"
              aria-label="Back"
            >
              <ArrowLeft size={16} className="inline" />
            </button>
          )}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-0 hover:opacity-70 transition-opacity"
          >
            <span className="font-bold text-dark text-lg tracking-tight">
              <span className="font-bold">Re</span>build<span className="font-bold">.</span>
            </span>
            <span className="ml-3 text-muted text-sm font-normal hidden sm:inline">
              Social Design Review
            </span>
          </button>
        </div>

        {/* Right nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-dark">
          <a
            href="https://www.rebuild.net/tools/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            Tools
          </a>
          <a
            href="https://www.rebuild.net/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            About Rebuild
          </a>
        </nav>
      </div>
    </header>
  );
}
