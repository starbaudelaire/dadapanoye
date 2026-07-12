import Head from 'next/head';
import HeroSection from '@/components/beranda/HeroSection';
import StatCards from '@/components/beranda/StatCards';
import HighlightCards from '@/components/beranda/HighlightCards';
import profilData from '@/data/profil.json';

export default function Beranda({ statistik }) {
  return (
    <>
      <Head>
        <title>Beranda | Portal Padukuhan Dadapan</title>
      </Head>
      <HeroSection />
      <StatCards statistik={statistik} />
      <HighlightCards />
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      statistik: profilData.statistik,
    },
  };
}
