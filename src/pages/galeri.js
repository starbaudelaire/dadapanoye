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
import PageHeader from '@/components/PageHeader';

function FotoDialog({ foto, open, onClose }) {
  if (!foto) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0 rounded-2xl">
        <div className="relative w-full h-[400px] bg-gray-900">
          <Image src={foto.foto} alt={foto.judul} fill className="object-contain" unoptimized />
        </div>
        <div className="p-6">
          <DialogTitle className="font-serif text-xl font-bold text-gray-900 mb-2">
            {foto.judul}
          </DialogTitle>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-xs text-gray-500 mb-3">
            <Calendar className="h-3 w-3" />
            {foto.tanggal}
          </span>
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

      <PageHeader title="Galeri KKN" subtitle="Dokumentasi Tim KKN UPNYK Kelompok 84.021 — 30 Hari Mengabdi" />

      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {galeri.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="break-inside-avoid w-full text-left group overflow-hidden rounded-2xl border border-gray-100/80 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="relative w-full bg-brand-50 overflow-hidden">
                  <Image
                    src={item.foto}
                    alt={item.judul}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-brand-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="w-full p-4">
                      <p className="text-white text-sm font-semibold">{item.judul}</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-white">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.judul}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1">
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
