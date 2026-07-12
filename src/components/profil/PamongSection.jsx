import Image from 'next/image';

function PamongCard({ nama, jabatan, foto }) {
  return (
    <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 bg-brand-100">
        {foto ? (
          <Image src={foto} alt={nama} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-400 text-3xl font-bold">
            {nama.charAt(0)}
          </div>
        )}
      </div>
      <p className="font-semibold text-gray-800 text-sm">{nama}</p>
      <p className="text-xs text-brand-600 mt-0.5">{jabatan}</p>
    </div>
  );
}

export default function PamongSection({ pamong, kukuban }) {
  return (
    <section id="pamong" className="py-14 bg-brand-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-brand-900 mb-2 text-center">
          Pemerintahan Padukuhan
        </h2>
        <div className="w-12 h-1 bg-brand-500 rounded mx-auto mb-10" />

        {/* Dukuh */}
        <div className="flex justify-center mb-10">
          {pamong
            .filter((p) => p.jabatan === 'Dukuh')
            .map((p) => (
              <div key={p.nama} className="w-48">
                <PamongCard {...p} />
              </div>
            ))}
        </div>

        {/* Kukuban */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {kukuban.map((kb) => (
            <div key={kb.nama} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-brand-700 text-white px-5 py-3">
                <h3 className="font-semibold text-sm">Kukuban {kb.nama}</h3>
                <p className="text-brand-200 text-xs mt-0.5">Ketua: {kb.ketua}</p>
              </div>
              <ul className="px-5 py-4 space-y-1">
                {kb.rt.map((rt) => (
                  <li key={rt} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    {rt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
