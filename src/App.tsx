/**
 * @license
 * 著作権者: shigenori,watanabe
 * 利用規約: 本資料および本アプリに含まれるすべての内容（文章、構成、シミュレーションロジック等）の著作権は著作権者に帰属します。
 * 業界内における無断転写、複写、二次利用、外部への無断共有を固く禁じます。
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PreBookingWarningBanner } from './components/PreBookingWarningBanner';
import { StyleComparisonView } from './components/StyleComparisonView';
import { PhaseManagementView } from './components/PhaseManagementView';
import { CeremonyTimelineView } from './components/CeremonyTimelineView';
import { CostSimulatorView } from './components/CostSimulatorView';
import { BeautyGuideView } from './components/BeautyGuideView';
import { ProposalSheetView } from './components/ProposalSheetView';
import { BridalStyle, COPYRIGHT_INFO } from './data/bridalData';
import { SimulatorParams, DEFAULT_SIMULATOR_PARAMS } from './utils/costCalculator';
import { ShieldCheck, Heart, Sparkles, GraduationCap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'styles' | 'phases' | 'ceremony' | 'simulator' | 'beauty' | 'proposal'>('styles');
  const [userRole, setUserRole] = useState<'planner' | 'couple'>('planner');
  const [simParams, setSimParams] = useState<SimulatorParams>(DEFAULT_SIMULATOR_PARAMS);

  const handleSelectStyleForSim = (style: BridalStyle) => {
    setSimParams((prev) => ({
      ...prev,
      membershipFee: style.avgFeePerGuest,
    }));
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCeremony = () => {
    setActiveTab('ceremony');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-800">
      {/* ナビゲーションバー */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenPrint={() => {
          setActiveTab('proposal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* メインコンテンツエリア */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* 【最重要注意点】会場予約前の計画分岐トラップ（最上部に常時提示） */}
        {activeTab !== 'proposal' && (
          <PreBookingWarningBanner userRole={userRole} />
        )}

        {activeTab === 'styles' && (
          <StyleComparisonView
            userRole={userRole}
            onSelectStyleForSim={handleSelectStyleForSim}
            onGoToCeremony={handleGoToCeremony}
          />
        )}

        {activeTab === 'phases' && (
          <PhaseManagementView userRole={userRole} />
        )}

        {activeTab === 'ceremony' && (
          <CeremonyTimelineView userRole={userRole} />
        )}

        {activeTab === 'simulator' && (
          <CostSimulatorView
            userRole={userRole}
            initialParams={simParams}
          />
        )}

        {activeTab === 'beauty' && (
          <BeautyGuideView userRole={userRole} />
        )}

        {activeTab === 'proposal' && (
          <ProposalSheetView onBack={() => setActiveTab('styles')} />
        )}
      </main>

      {/* フッター（クワイエット・著作権表示） */}
      <footer className="no-print bg-stone-900 text-stone-400 text-xs border-t border-stone-800 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-stone-800 text-amber-300 flex items-center justify-center font-serif font-bold text-xs">
                  寿
                </span>
                <span className="font-serif-luxury font-bold text-stone-200 text-sm">
                  着付けナビ美容 ウエディングプロデュース研修・可視化システム
                </span>
              </div>
              <p className="text-stone-400 text-xs">
                多様化するブライダルスタイルと人前式進行、会費制収支構造を可視化する教育・支援ツール
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300">
              <button
                type="button"
                onClick={() => setActiveTab('styles')}
                className="hover:text-white transition-colors"
              >
                スタイル比較
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('phases')}
                className="hover:text-white transition-colors"
              >
                準備工程
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ceremony')}
                className="hover:text-white transition-colors"
              >
                人前式進行
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('simulator')}
                className="hover:text-white transition-colors"
              >
                収支シミュレーター
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('beauty')}
                className="hover:text-white transition-colors"
              >
                着付け＆美容
              </button>
            </div>
          </div>

          {/* 法的表示・著作権（指示書必須要件） */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-stone-500 text-xs">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-1.5 text-stone-400">
                <ShieldCheck className="w-4 h-4 text-amber-500/80" />
                <span className="font-semibold text-stone-300">著作権および利用に関する重要事項</span>
              </div>
              <p className="leading-relaxed">
                著作権者: <strong className="text-stone-300">{COPYRIGHT_INFO.author}</strong> ／ {COPYRIGHT_INFO.statement}
              </p>
            </div>

            <div className="shrink-0 text-stone-500 font-mono">
              &copy; {new Date().getFullYear()} {COPYRIGHT_INFO.author}. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
