import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { BookOpen, Users, Building2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SejarahSection from '@/components/profil/SejarahSection';
import PamongSection from '@/components/profil/PamongSection';
import LembagaSection from '@/components/profil/LembagaSection';
import profilData from '@/data/profil.json';
import lembagaData from '@/data/lembaga.json';
import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from '@/components/ui/glass-tabs';

const VALID_TABS = ['sejarah', 'pamong', 'lembaga'];

export default function Profil({ profil = {}, lembaga = {} }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('sejarah');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'pemerintahan') {
        setActiveTab('pamong');
      } else if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    router.events?.on('hashChangeComplete', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      router.events?.off('hashChangeComplete', handleHashChange);
    };
  }, [router]);

  const handleTabChange = (val) => {
    setActiveTab(val);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/profil#${val}`);
    }
  };

  return (
    <>
      <Head>
        <title>Profil Padukuhan | Portal Padukuhan Dadapan</title>
      </Head>

      <PageHeader
        title="Profil Padukuhan"
        subtitle="Deskripsi, Visi & Misi, Kepengurusan, dan Lembaga"
        tag="PROFIL &amp; TATA KELOLA"
      />

      <div className="bg-[#0f1219] min-h-screen relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <GlassTabs value={activeTab} onValueChange={handleTabChange}>
            <div className="flex justify-center mb-10">
              <GlassTabsList className="w-full max-w-lg">
                <GlassTabsTrigger value="sejarah" className="flex-1 group">
                  <BookOpen className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden group-data-[state=active]:inline sm:inline ml-1.5 font-semibold">Profil</span>
                </GlassTabsTrigger>
                <GlassTabsTrigger value="pamong" className="flex-1 group">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden group-data-[state=active]:inline sm:inline ml-1.5 font-semibold">Pemerintahan</span>
                </GlassTabsTrigger>
                <GlassTabsTrigger value="lembaga" className="flex-1 group">
                  <Building2 className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden group-data-[state=active]:inline sm:inline ml-1.5 font-semibold">Lembaga</span>
                </GlassTabsTrigger>
              </GlassTabsList>
            </div>

            <GlassTabsContent value="sejarah">
              <SejarahSection
                sejarah={profil.sejarah}
                visi={profil.visi}
                misi={profil.misi || []}
              />
            </GlassTabsContent>

            <GlassTabsContent value="pamong">
              <PamongSection
                pamong={profil.pamong || []}
                rtList={profil.rt || []}
              />
            </GlassTabsContent>

            <GlassTabsContent value="lembaga">
              <LembagaSection lembaga={lembaga} />
            </GlassTabsContent>
          </GlassTabs>
        </div>
      </div>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      profil: profilData || {},
      lembaga: lembagaData || {},
    },
  };
}
