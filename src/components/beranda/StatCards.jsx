import { Users, Home, MapPin, Sprout } from 'lucide-react';

export default function StatCards({ statistik }) {
  const stats = [
    {
      icon: <Users className="h-6 w-6 text-brand-600" />,
      label: 'Total Jiwa',
      value: statistik.total_jiwa.toLocaleString('id-ID'),
    },
    {
      icon: <Home className="h-6 w-6 text-brand-600" />,
      label: 'Total KK',
      value: statistik.total_kk.toLocaleString('id-ID'),
    },
    {
      icon: <MapPin className="h-6 w-6 text-brand-600" />,
      label: 'Luas Wilayah',
      value: statistik.luas_wilayah,
    },
    {
      icon: <Sprout className="h-6 w-6 text-brand-600" />,
      label: 'Sektor Utama',
      value: statistik.sektor_utama,
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="mb-3 p-2 bg-brand-50 rounded-full">{stat.icon}</div>
              <p className="text-2xl font-bold text-brand-800 font-serif">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
