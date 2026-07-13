import Image from 'next/image';
import { MessageCircle, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

export default function UmkmDialog({ umkm, open, onClose }) {
  if (!umkm) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden gap-0 rounded-2xl" showCloseButton={true}>
        {/* Foto produk */}
        <div className="relative w-full h-56 bg-gradient-to-br from-brand-100 to-brand-50">
          {umkm.foto ? (
            <Image src={umkm.foto} alt={umkm.nama} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-300 text-6xl">
              🛍️
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Detail */}
        <div className="p-6 pt-2">
          <DialogTitle className="font-serif text-xl font-bold text-gray-900 mb-1">
            {umkm.nama}
          </DialogTitle>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold">
              {umkm.produk}
            </span>
            {umkm.tahunBerdiri && (
              <span className="text-xs text-gray-400">Est. {umkm.tahunBerdiri}</span>
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{umkm.deskripsi}</p>

          {umkm.targetPasar && (
            <div className="flex items-start gap-2 text-sm text-gray-500 mb-3 px-3 py-2 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700 shrink-0">Target Pasar:</span>
              <span>{umkm.targetPasar}</span>
            </div>
          )}

          {umkm.pemilik && umkm.pemilik !== '-' && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 px-3 py-2 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Pemilik:</span>
              {umkm.pemilik}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            {umkm.wa && (
              <a
                href={`https://wa.me/${umkm.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-green-500/25"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            )}
            {umkm.maps && umkm.maps !== '-' && (
              <a
                href={umkm.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-brand-600/25"
              >
                <MapPin className="h-4 w-4" />
                Google Maps
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
