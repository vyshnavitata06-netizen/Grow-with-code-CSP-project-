'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { ActiveCourseCard } from '@/components/dashboard/ActiveCourseCard';
import { AIMentorWidget } from '@/components/dashboard/AIMentorWidget';
import { LanguageGrid } from '@/components/dashboard/LanguageGrid';
import { ProblemOfTheDayCard } from '@/components/dashboard/ProblemOfTheDayCard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Banner & Stats Overview */}
          <StatsOverview />

          {/* Main Grid: Active Course + AI Mentor & Problem of Day */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActiveCourseCard />
            </div>

            <div className="space-y-6">
              <AIMentorWidget />
              <ProblemOfTheDayCard />
            </div>
          </div>

          {/* All Programming Languages Grid */}
          <LanguageGrid />
        </main>
      </div>
    </div>
  );
}
