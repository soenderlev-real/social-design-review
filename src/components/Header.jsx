import { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';

export default function Header({ onLogoClick, onInstructionsClick, onReadingListClick, showBack }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu if the viewport grows into the desktop nav.
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 640) setMenuOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const navItems = [
    { label: 'Instructions', onClick: onInstructionsClick },
    { label: 'Reading List', onClick: onReadingListClick },
    { label: 'Tools', href: 'https://www.rebuild.net/tools/' },
    { label: 'About Rebuild', href: 'https://www.rebuild.net/about/' },
  ];

  function handleNavClick(item) {
    setMenuOpen(false);
    item.onClick?.();
  }

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
              The Social Design Tools
            </span>
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-dark">
          {navItems.map(item =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-4"
              >
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                onClick={item.onClick}
                className="hover:underline underline-offset-4"
              >
                {item.label}
              </button>
            )
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="sm:hidden border-2 border-dark px-3 py-1 hover:bg-dark hover:text-light transition-colors"
        >
          {menuOpen ? <X size={16} className="inline" /> : <Menu size={16} className="inline" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav className="sm:hidden border-t-2 border-dark bg-light animate-fade-in">
          {navItems.map(item =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-sm text-dark border-b-2 border-lighter last:border-b-0 hover:bg-lighter transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left px-6 py-3 text-sm text-dark border-b-2 border-lighter last:border-b-0 hover:bg-lighter transition-colors"
              >
                {item.label}
              </button>
            )
          )}
        </nav>
      )}
    </header>
  );
}
