import Head from 'next/head';
import SejarahSection from '@/components/profil/SejarahSection';
import PamongSection from '@/components/profil/PamongSection';
import LembagaSection from '@/components/profil/LembagaSection';
import profilData from '@/data/profil.json';
import lembagaData from '@/data/lembaga.json';

export default function Profil({ profil, lembaga }) {
  return (
    <>
      <Head>
        <title>Profil Padukuhan | Portal Padukuhan Dadapan</title>
      </Head>

      {/* Page header */}
      <div className="bg-brand-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold mb-2">Profil Padukuhan</h1>
          <p className="text-brand-200 text-sm">
            Sejarah, Pemerintahan, dan Lembaga Desa Dadapan
          </p>
        </div>
      </div>

      <SejarahSection
        sejarah={profil.sejarah}
        visi={profil.visi}
        misi={profil.misi}
      />
      <PamongSection
        pamong={profil.pamong}
        kukuban={profil.kukuban}
      />
      <LembagaSection lembaga={lembaga} />
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      profil: profilData,
      lembaga: lembagaData,
    },
  };
}
