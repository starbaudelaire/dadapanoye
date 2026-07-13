import Head from 'next/head';
import { useState } from 'react';
import UmkmMap from '@/components/umkm/UmkmMap';
import UmkmDialog from '@/components/umkm/UmkmDialog';
import umkmData from '@/data/umkm.json';
import { MapPin, ShoppingBag } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function KatalogUmkm({ umkmList }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Head>
        <title>Katalog UMKM | Portal Padukuhan Dadapan</title>
      </Head>

      <PageHeader title="Katalog UMKM" subtitle="Temukan produk dan usaha lokal unggulan warga Padukuhan Dadapan" />

      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container mx-auto px-4">

          {/* Peta interaktif */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-7 bg-gradient-to-b from-brand-400 to-brand-600 rounded-full" />
              <h2 className="font-serif text-2xl font-bold text-brand-900">Sebaran Lokasi UMKM</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6 ml-4 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-brand-500" />
              Klik pin pada peta untuk melihat detail usaha
            </p>
            <UmkmMap umkmList={umkmList} />
          </div>

          {/* Divider */}
          <div className="my-16 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">DAFTAR USAHA</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Daftar kartu UMKM */}
          <div className="mb-6 flex items-center gap-3">
            <div className="w-1 h-7 bg-gradient-to-b from-brand-400 to-brand-600 rounded-full" />
            <ShoppingBag className="h-5 w-5 text-brand-600" />
            <h2 className="font-serif text-2xl font-bold text-brand-900">
              Semua Usaha ({umkmList.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {umkmList.map((umkm) => (
              <button
                key={umkm.id}
                onClick={() => setSelected(umkm)}
                className="text-left bg-white rounded-2xl border border-gray-100/80 hover:border-brand-200 hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-44 bg-brand-50 overflow-hidden">
                  {umkm.foto ? (
                    <img
                      src={umkm.foto}
                      alt={umkm.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl text-brand-200">
                      🛍️
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Info */}
                <div className="p-5">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-medium mb-1.5">
                    {umkm.produk}
                  </span>
                  <h3 className="font-semibold text-gray-800 group-hover:text-brand-700 transition-colors text-base">
                    {umkm.nama}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">{umkm.deskripsi}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dialog dari kartu */}
      <UmkmDialog
        umkm={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      umkmList: umkmData,
    },
  };
}
