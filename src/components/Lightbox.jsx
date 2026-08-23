import { useEffect, useRef } from 'react';
import { X, ExternalLink, Download } from 'lucide-react';

/**
 * Full-screen image viewer. Opens on click, closes on Escape, backdrop click,
 * or the close button. Also offers the raw file in a new tab and a download.
 */
export default function Lightbox({ src, alt, caption, onClose }) {
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useEffect(() => {
    // Remember what had focus so we can hand it back on close.
    restoreFocusRef.current = document.activeElement;
    closeRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Minimal focus trap: the dialog has few controls, so cycling within
      // the overlay is enough to keep keyboard users out of the page behind.
      if (e.key === 'Tab') {
        const focusables = e.currentTarget?.querySelectorAll?.('button, a[href]');
        if (!focusables || !focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-dark/95 flex flex-col animate-fade-in"
    >
      {/* Toolbar */}
      <div
        className="flex items-center justify-between gap-4 px-4 sm:px-6 h-14 border-b-2 border-light flex-shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <span className="text-light text-xs uppercase tracking-widest truncate">
          {caption || 'Diagram'}
        </span>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-light text-light px-2 sm:px-3 py-1 text-xs flex items-center gap-1.5 hover:bg-light hover:text-dark transition-colors"
          >
            <ExternalLink size={12} /> <span className="hidden sm:inline">Open PNG</span>
          </a>
          <a
            href={src}
            download
            className="border-2 border-light text-light px-2 sm:px-3 py-1 text-xs flex items-center gap-1.5 hover:bg-light hover:text-dark transition-colors"
          >
            <Download size={12} /> <span className="hidden sm:inline">Download</span>
          </a>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="border-2 border-light text-light px-2 sm:px-3 py-1 text-xs flex items-center gap-1.5 hover:bg-light hover:text-dark transition-colors"
          >
            <X size={12} /> <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* Image stage — the artwork is drawn for a light ground (its separator
          rings are white), so it sits on a light plate rather than the scrim. */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-4 sm:p-8 overflow-auto">
        <img
          src={src}
          alt={alt}
          onClick={e => e.stopPropagation()}
          className="max-w-full max-h-full object-contain bg-light border-2 border-light"
        />
      </div>
    </div>
  );
}
