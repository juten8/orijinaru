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

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-2xl mx-auto my-12 bg-white rounded-2xl border border-rose-300 text-stone-900 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-lg">
            <span>表示エラーを検出しました</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-mono bg-rose-50 p-3 rounded border border-rose-200">
            {this.state.error?.message || '予期せぬエラーが発生しました'}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = window.location.pathname;
              }}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-md hover:bg-stone-800"
            >
              初期状態に戻して再表示
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    <ErrorBoundary>
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
          {/* プロデュースツール 選択タブハブ（全画面で常時切替可能） */}
          <div className="no-print bg-white p-2.5 sm:p-3 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2 px-1">
              <span className="font-semibold text-stone-700">プロデュース機能・研修ツール切り替え</span>
              <span className="hidden sm:inline font-mono">クリックで即座に画面が切り替わります</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('styles');
                  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
                }}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all text-center ${
                  activeTab === 'styles'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md font-bold ring-2 ring-stone-900/20'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-sm mb-0.5">🌸</span>
                <span className="whitespace-nowrap font-medium">① スタイル比較</span>
                <span className={`text-[10px] mt-0.5 ${activeTab === 'styles' ? 'text-amber-300' : 'text-stone-400'}`}>
                  5大挙式スタイル
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('phases');
                  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
                }}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all text-center ${
                  activeTab === 'phases'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md font-bold ring-2 ring-stone-900/20'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-sm mb-0.5">📋</span>
                <span className="whitespace-nowrap font-medium">② 準備工程管理</span>
                <span className={`text-[10px] mt-0.5 ${activeTab === 'phases' ? 'text-amber-300' : 'text-stone-400'}`}>
                  全5フェーズ・タスク
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('ceremony');
                  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
                }}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all text-center ${
                  activeTab === 'ceremony'
                    ? 'bg-amber-700 text-white border-amber-700 shadow-md font-bold ring-2 ring-amber-700/20'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-sm mb-0.5">⏱️</span>
                <span className="whitespace-nowrap font-medium">③ 人前式進行</span>
                <span className={`text-[10px] mt-0.5 ${activeTab === 'ceremony' ? 'text-amber-200' : 'text-stone-400'}`}>
                  30分台本・タイムライン
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('simulator');
                  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
                }}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all text-center ${
                  activeTab === 'simulator'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md font-bold ring-2 ring-stone-900/20'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-sm mb-0.5">💰</span>
                <span className="whitespace-nowrap font-medium">④ 収支試算</span>
                <span className={`text-[10px] mt-0.5 ${activeTab === 'simulator' ? 'text-amber-300' : 'text-stone-400'}`}>
                  会費制×低価格計算
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('beauty');
                  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
                }}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all text-center ${
                  activeTab === 'beauty'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md font-bold ring-2 ring-stone-900/20'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-sm mb-0.5">👘</span>
                <span className="whitespace-nowrap font-medium">⑤ 着付け＆美容</span>
                <span className={`text-[10px] mt-0.5 ${activeTab === 'beauty' ? 'text-amber-300' : 'text-stone-400'}`}>
                  和装補正・15分チェンジ
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('proposal');
                  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
                }}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all text-center ${
                  activeTab === 'proposal'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md font-bold ring-2 ring-stone-900/20'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-sm mb-0.5">📄</span>
                <span className="whitespace-nowrap font-medium">⑥ 提案書印刷</span>
                <span className={`text-[10px] mt-0.5 ${activeTab === 'proposal' ? 'text-amber-300' : 'text-stone-400'}`}>
                  仕様書・PDF出力
                </span>
              </button>
            </div>
          </div>

          {/* 各機能ビューの描画（選択したタブが即座に表示） */}
          <div key={activeTab} className="transition-opacity duration-150">
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
          </div>
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
  </ErrorBoundary>
  );
}
