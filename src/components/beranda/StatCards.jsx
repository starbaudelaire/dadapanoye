import { Users, Home, MapPin, Sprout } from 'lucide-react';

export default function StatCards({ statistik }) {
  const stats = [
    {
      icon: <Users className="h-7 w-7 text-brand-600" />,
      label: 'Total Jiwa',
      value: statistik.total_jiwa.toLocaleString('id-ID'),
    },
    {
      icon: <Home className="h-7 w-7 text-brand-600" />,
      label: 'Total KK',
      value: statistik.total_kk.toLocaleString('id-ID'),
    },
    {
      icon: <MapPin className="h-7 w-7 text-brand-600" />,
      label: 'Luas Wilayah',
      value: statistik.luas_wilayah,
    },
    {
      icon: <Sprout className="h-7 w-7 text-brand-600" />,
      label: 'Sektor Utama',
      value: statistik.sektor_utama,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-brand-50/50 py-16">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-900 mb-2">
            Data Padukuhan
          </h2>
          <p className="text-gray-500 text-sm">
            Statistik kependudukan Padukuhan Dadapan
          </p>
          <div className="w-12 h-1 bg-brand-500 rounded mx-auto mt-4" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-brand-100/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 bg-gradient-to-br from-brand-100 to-brand-200 p-3 rounded-xl">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-brand-800 font-serif">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
