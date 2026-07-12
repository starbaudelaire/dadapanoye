import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export default function SejarahSection({ sejarah, visi, misi }) {
  return (
    <section id="sejarah" className="py-14 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-serif text-3xl font-bold text-brand-900 mb-2">Sejarah Padukuhan</h2>
        <div className="w-12 h-1 bg-brand-500 rounded mb-6" />
        <p className="text-gray-600 leading-relaxed mb-10">{sejarah}</p>

        <h2 className="font-serif text-3xl font-bold text-brand-900 mb-2">Visi &amp; Misi</h2>
        <div className="w-12 h-1 bg-brand-500 rounded mb-6" />

        <Accordion className="space-y-3">
          <AccordionItem value="visi" className="border border-gray-200 rounded-lg overflow-hidden px-5">
            <AccordionTrigger className="font-semibold text-gray-800 hover:no-underline py-4">
              Visi
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed pb-4">
              {visi}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="misi" className="border border-gray-200 rounded-lg overflow-hidden px-5">
            <AccordionTrigger className="font-semibold text-gray-800 hover:no-underline py-4">
              Misi
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <ul className="space-y-2">
                {misi.map((item, i) => (
                  <li key={i} className="flex gap-3 text-gray-600">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
