'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { LanguageId } from '@/lib/types';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RoadmapView } from '@/components/roadmap/RoadmapView';

export default function LanguageRoadmapPage() {
  const params = useParams();
  const lang = (params.language as LanguageId) || 'python';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          <RoadmapView initialLanguage={lang} />
        </main>
      </div>
    </div>
  );
}
