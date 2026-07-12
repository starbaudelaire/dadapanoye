import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export default function PetaViewer({ src, alt }) {
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 1));
  const reset = () => setScale(1);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100" style={{ height: '420px' }}>
      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        <button
          onClick={zoomIn}
          className="p-2 bg-white rounded-lg shadow border border-gray-200 hover:bg-brand-50 transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={zoomOut}
          className="p-2 bg-white rounded-lg shadow border border-gray-200 hover:bg-brand-50 transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={reset}
          className="p-2 bg-white rounded-lg shadow border border-gray-200 hover:bg-brand-50 transition-colors"
          aria-label="Reset zoom"
        >
          <Maximize2 className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Scrollable image container */}
      <div className="w-full h-full overflow-auto">
        <div
          className="transition-transform duration-200 origin-top-left"
          style={{ transform: `scale(${scale})`, width: `${100 / scale}%` }}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
