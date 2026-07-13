export default function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-gradient-to-br from-brand-700 to-brand-900 py-14 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-brand-200 text-sm md:text-base max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
