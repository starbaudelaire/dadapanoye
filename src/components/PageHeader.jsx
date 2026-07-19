export default function PageHeader({ title, subtitle, tag = 'PADUKUHAN DADAPAN' }) {
  return (
    <div className="relative bg-[#0f1219] py-14 sm:py-16 lg:py-20 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400">
          {tag}
        </p>
        <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f8fafc] tracking-normal leading-tight max-w-4xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="w-12 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full mx-auto mt-6" />
      </div>
    </div>
  );
}
