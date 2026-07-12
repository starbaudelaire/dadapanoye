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
      <DialogContent className="max-w-md p-0 overflow-hidden gap-0" showCloseButton={true}>
        {/* Foto produk */}
        <div className="relative w-full h-52 bg-brand-100">
          {umkm.foto ? (
            <Image src={umkm.foto} alt={umkm.nama} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-300 text-6xl">
              🛍️
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="p-6">
          <DialogTitle className="font-serif text-xl font-bold text-gray-900 mb-1">
            {umkm.nama}
          </DialogTitle>
          <p className="text-brand-600 text-sm font-medium mb-3">{umkm.produk}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{umkm.deskripsi}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className="font-medium text-gray-700">Pemilik:</span>
            {umkm.pemilik}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <a
              href={`https://wa.me/${umkm.wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={umkm.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors"
            >
              <MapPin className="h-4 w-4" />
              Google Maps
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
