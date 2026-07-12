import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import galeriData from '@/data/galeri.json';

function FotoDialog({ foto, open, onClose }) {
  if (!foto) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0">
        <div className="relative w-full h-80 bg-gray-900">
          <Image src={foto.foto} alt={foto.judul} fill className="object-contain" unoptimized />
        </div>
        <div className="p-5">
          <DialogTitle className="font-serif text-lg font-bold text-gray-900 mb-1">
            {foto.judul}
          </DialogTitle>
          <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
            <Calendar className="h-3 w-3" />
            {foto.tanggal}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">{foto.keterangan}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function GaleriKKN({ galeri }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Head>
        <title>Galeri KKN | Portal Padukuhan Dadapan</title>
      </Head>

      <div className="bg-brand-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold mb-2">Galeri KKN</h1>
          <p className="text-brand-200 text-sm">
            Dokumentasi Tim KKN UPNYK Kelompok 84.021 — 30 Hari Mengabdi
          </p>
        </div>
      </div>

      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galeri.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="break-inside-avoid w-full text-left group overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full bg-brand-50 overflow-hidden">
                  <Image
                    src={item.foto}
                    alt={item.judul}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/30 transition-colors flex items-end">
                    <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-sm font-medium truncate">{item.judul}</p>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 bg-white">
                  <p className="text-xs font-medium text-gray-800 truncate">{item.judul}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="h-3 w-3" />
                    {item.tanggal}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <FotoDialog foto={selected} open={!!selected} onClose={() => setSelected(null)} />
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      galeri: galeriData,
    },
  };
}
