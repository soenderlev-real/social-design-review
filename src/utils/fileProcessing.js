/**
 * Client-side file processing for images and PDFs.
 * All processing happens in the browser — nothing is uploaded to any server.
 */

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const PDF_TYPE    = 'application/pdf';
const MAX_IMAGES  = 6;
const MAX_PDFS    = 3;

/**
 * Read an image file and return base64 + mediaType.
 */
function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => {
      // reader.result is "data:image/png;base64,XXXX"
      const dataUrl = reader.result;
      const base64  = dataUrl.split(',')[1];
      resolve({ base64, mediaType: file.type, name: file.name, type: 'image' });
    };
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

/**
 * Extract text from a PDF using PDF.js (runs entirely in the browser).
 */
async function readPdfFile(file) {
  // Dynamically import pdfjs-dist so it's code-split
  const pdfjsLib = await import('pdfjs-dist');

  // Use CDN worker to avoid Vite bundling issues with the PDF.js worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const textParts = [];
  for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
    const page    = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ').trim();
    if (pageText) textParts.push(`[Page ${i}]\n${pageText}`);
  }

  const text = textParts.join('\n\n');
  return {
    type:      'pdf',
    name:      file.name,
    text:      text || '(no extractable text found)',
    pageCount: pdf.numPages,
  };
}

/**
 * Process an array of File objects into structured file data.
 * Returns { files, errors } where files is an array of processed objects.
 */
export async function processFiles(rawFiles) {
  const results = [];
  const errors  = [];

  const images = rawFiles.filter(f => IMAGE_TYPES.includes(f.type)).slice(0, MAX_IMAGES);
  const pdfs   = rawFiles.filter(f => f.type === PDF_TYPE).slice(0, MAX_PDFS);

  for (const file of images) {
    try {
      const processed = await readImageFile(file);
      results.push({ ...processed, id: `${file.name}-${file.size}` });
    } catch (e) {
      errors.push(`${file.name}: ${e.message}`);
    }
  }

  for (const file of pdfs) {
    try {
      const processed = await readPdfFile(file);
      results.push({ ...processed, id: `${file.name}-${file.size}` });
    } catch (e) {
      errors.push(`${file.name}: ${e.message}`);
    }
  }

  return { files: results, errors };
}

/**
 * Given a list of processed files, build a text block summarising PDFs
 * and a note about images (for providers that don't support vision).
 */
export function buildFileContext(processedFiles) {
  const parts = [];

  const images = processedFiles.filter(f => f.type === 'image');
  const pdfs   = processedFiles.filter(f => f.type === 'pdf');

  if (images.length > 0) {
    parts.push(`[The user has provided ${images.length} screenshot(s) of the platform UI: ${images.map(f => f.name).join(', ')}]`);
  }

  for (const pdf of pdfs) {
    parts.push(`## Uploaded document: ${pdf.name} (${pdf.pageCount} pages)\n${pdf.text}`);
  }

  return parts.join('\n\n');
}

export { IMAGE_TYPES, PDF_TYPE, MAX_IMAGES, MAX_PDFS };
