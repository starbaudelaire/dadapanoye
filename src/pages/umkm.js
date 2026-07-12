import Head from 'next/head';
import { useState } from 'react';
import UmkmMap from '@/components/umkm/UmkmMap';
import UmkmDialog from '@/components/umkm/UmkmDialog';
import umkmData from '@/data/umkm.json';
import { MapPin, ShoppingBag } from 'lucide-react';

export default function KatalogUmkm({ umkmList }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Head>
        <title>Katalog UMKM | Portal Padukuhan Dadapan</title>
      </Head>

      {/* Page header */}
      <div className="bg-brand-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold mb-2">Katalog UMKM</h1>
          <p className="text-brand-200 text-sm">
            Temukan produk dan usaha lokal unggulan warga Padukuhan Dadapan
          </p>
        </div>
      </div>

      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">

          {/* Peta interaktif */}
          <div className="mb-4">
            <h2 className="font-serif text-2xl font-bold text-brand-900 mb-1">
              Sebaran Lokasi UMKM
            </h2>
            <p className="text-sm text-gray-500 mb-6 flex items-center gap-1">
              <MapPin className="h-4 w-4 text-brand-500" />
              Klik pin pada peta untuk melihat detail usaha
            </p>
            <UmkmMap umkmList={umkmList} />
          </div>

          {/* Divider */}
          <div className="my-14 border-t border-gray-100" />

          {/* Daftar kartu UMKM */}
          <div className="mb-6 flex items-center gap-2">
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
                className="text-left bg-white rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-40 bg-brand-50">
                  {umkm.foto ? (
                    <img
                      src={umkm.foto}
                      alt={umkm.nama}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl text-brand-200">
                      🛍️
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-brand-600 font-medium mb-1">{umkm.produk}</p>
                  <h3 className="font-semibold text-gray-800 group-hover:text-brand-700 transition-colors">
                    {umkm.nama}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{umkm.deskripsi}</p>
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
