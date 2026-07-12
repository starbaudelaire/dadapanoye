import Head from 'next/head';
import PetaViewer from '@/components/peta/PetaViewer';

const petaData = [
  {
    id: 'administrasi',
    judul: 'Peta Administrasi',
    src: '/images/peta/peta-administrasi.jpg',
    alt: 'Peta Administrasi Padukuhan Dadapan',
    interpretasi: [
      { label: 'Luas Wilayah', nilai: '— Ha' },
      { label: 'Batas Utara', nilai: '—' },
      { label: 'Batas Selatan', nilai: '—' },
      { label: 'Batas Timur', nilai: '—' },
      { label: 'Batas Barat', nilai: '—' },
    ],
    deskripsi:
      'Peta administrasi menggambarkan batas wilayah resmi Padukuhan Dadapan beserta pembagian wilayah RT dan Kukuban. Wilayah ini terbagi menjadi dua Kukuban: Dadapan Lor dan Dadapan Kidul.',
  },
  {
    id: 'bencana',
    judul: 'Peta Kebencanaan',
    src: '/images/peta/peta-bencana.jpg',
    alt: 'Peta Risiko Bencana Gempa Padukuhan Dadapan',
    interpretasi: [
      { label: 'Tingkat Risiko', nilai: '—' },
      { label: 'Zona Bahaya', nilai: '—' },
      { label: 'Jalur Evakuasi', nilai: '—' },
      { label: 'Titik Kumpul', nilai: '—' },
    ],
    deskripsi:
      'Peta kebencanaan menunjukkan tingkat risiko gempa bumi di wilayah Padukuhan Dadapan. Warga diimbau mengetahui jalur evakuasi dan titik kumpul terdekat sebagai langkah mitigasi dini.',
  },
];

export default function PetaWilayah() {
  return (
    <>
      <Head>
        <title>Peta Wilayah | Portal Padukuhan Dadapan</title>
      </Head>

      {/* Page header */}
      <div className="bg-brand-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold mb-2">Peta Wilayah</h1>
          <p className="text-brand-200 text-sm">
            Peta Administrasi dan Kebencanaan Padukuhan Dadapan
          </p>
        </div>
      </div>

      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 space-y-16">
          {petaData.map((peta, idx) => (
            <div
              key={peta.id}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-start`}
            >
              {/* Peta viewer */}
              <div className="w-full lg:w-3/5">
                <h2 className="font-serif text-2xl font-bold text-brand-900 mb-4">
                  {peta.judul}
                </h2>
                <PetaViewer src={peta.src} alt={peta.alt} />
              </div>

              {/* Interpretasi */}
              <div className="w-full lg:w-2/5">
                <div className="bg-brand-50 rounded-xl border border-brand-100 p-6 h-full">
                  <h3 className="font-semibold text-brand-800 mb-3">Ringkasan Data</h3>
                  <ul className="space-y-2 mb-5">
                    {peta.interpretasi.map((item) => (
                      <li key={item.label} className="flex gap-3 text-sm">
                        <span className="text-gray-500 w-32 flex-shrink-0">{item.label}</span>
                        <span className="font-medium text-gray-800">{item.nilai}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-brand-200 pt-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{peta.deskripsi}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
