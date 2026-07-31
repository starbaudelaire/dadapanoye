import Image from 'next/image';

export default function PetaViewer({ src, alt }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-white flex items-center justify-center p-2" style={{ height: 'clamp(260px, 50vw, 420px)' }}>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}
