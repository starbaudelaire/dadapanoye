import Image from 'next/image';
import { MessageCircle, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { GlassButton } from '@/components/ui/glass-button';
import { GlassBadge } from '@/components/ui/glass-badge';

export default function UmkmDialog({ umkm, open, onClose, onNext, onPrevious }) {
  if (!umkm) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0 gap-0 rounded-2xl bg-[#141417] border border-white/10 text-[#fafafa]" showCloseButton={true}>
        {/* Navigation Arrows */}
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-black/60 sm:bg-[#181f2e]/80 hover:bg-black/90 sm:hover:bg-[#242c3d] border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
            aria-label="Previous UMKM"
          >
            <ChevronLeft className="h-6 w-6 text-blue-400" />
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-black/60 sm:bg-[#181f2e]/80 hover:bg-black/90 sm:hover:bg-[#242c3d] border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
            aria-label="Next UMKM"
          >
            <ChevronRight className="h-6 w-6 text-blue-400" />
          </button>
        )}

        {/* Foto produk */}
        <div className="relative w-full h-56 bg-[#27272a] rounded-t-2xl overflow-hidden">
          {umkm.foto || umkm.thumbnail ? (
            <Image src={umkm.foto || umkm.thumbnail} alt={umkm.nama} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#71717a] text-6xl">
              🛍️
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="p-6 pt-4">
          <DialogTitle className="font-serif text-xl font-bold text-[#fafafa] mb-2">
            {umkm.nama}
          </DialogTitle>
          <div className="flex items-center gap-2 mb-3">
            <GlassBadge variant="accent">
              {umkm.produk}
            </GlassBadge>
            {umkm.tahunBerdiri && (
              <span className="text-xs text-[#71717a]">Est. {umkm.tahunBerdiri}</span>
            )}
          </div>
          <div key={umkm.id} className="max-h-36 overflow-y-auto pr-2 mb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <p className="text-[#a1a1aa] text-sm leading-relaxed text-justify">{umkm.deskripsi}</p>
          </div>

          {umkm.targetPasar && (
            <div className="flex items-start gap-2 text-sm text-[#a1a1aa] mb-3 px-3 py-2 bg-[#27272a] border border-white/10 rounded-lg">
              <span className="font-medium text-[#fafafa] shrink-0">Target Pasar:</span>
              <span>{umkm.targetPasar}</span>
            </div>
          )}

          {umkm.pemilik && umkm.pemilik !== '-' && (
            <div className="flex items-center gap-2 text-sm text-[#a1a1aa] mb-5 px-3 py-2 bg-[#27272a] border border-white/10 rounded-lg">
              <span className="font-medium text-[#fafafa]">Pemilik:</span>
              {umkm.pemilik}
            </div>
          )}

          {/* Ein UI GlassButton dengan Icon */}
          <div className="flex gap-3 pt-2">
            {umkm.wa && umkm.wa !== '-' && (
              <GlassButton variant="primary" asChild className="flex-1">
                <a href={umkm.wa.startsWith('http') ? umkm.wa : `https://wa.me/${umkm.wa}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </GlassButton>
            )}
            {umkm.maps && umkm.maps !== '-' && (
              <GlassButton variant="outline" asChild className="flex-1">
                <a href={umkm.maps} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-2 h-4 w-4" /> Google Maps
                </a>
              </GlassButton>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
