import React from 'react';
import { Sparkles, Printer, UserCheck, GraduationCap } from 'lucide-react';

interface NavbarProps {
  activeTab: 'styles' | 'phases' | 'ceremony' | 'simulator' | 'beauty' | 'proposal';
  setActiveTab: (tab: 'styles' | 'phases' | 'ceremony' | 'simulator' | 'beauty' | 'proposal') => void;
  userRole: 'planner' | 'couple';
  setUserRole: (role: 'planner' | 'couple') => void;
  onOpenPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenPrint,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* 著作権＆モード帯（静かな1行情報） */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-serif-luxury tracking-widest text-amber-200/90 font-medium">BRIDAL PRODUCE NAVI</span>
          <span className="text-stone-500">|</span>
          <span className="text-stone-400 truncate">美容ウエディングプランナー研修・可視化システム（著作権者: shigenori,watanabe）</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="hidden sm:inline text-stone-400">表示モード:</span>
          <div className="flex items-center bg-stone-800 rounded p-0.5 border border-stone-700">
            <button
              type="button"
              onClick={() => setUserRole('planner')}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                userRole === 'planner'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>プランナー研修</span>
            </button>
            <button
              type="button"
              onClick={() => setUserRole('couple')}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                userRole === 'couple'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>新郎新婦ガイド</span>
            </button>
          </div>
        </div>
      </div>

      {/* トップバー規格（ゾーン1: ブランド名, ゾーン2: 4〜5リンク, ゾーン3: プライマリアクション） */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* ゾーン1: ブランドワードマーク */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setActiveTab('styles')}
          onKeyDown={(e) => { if (e.key === 'Enter') setActiveTab('styles'); }}
          className="cursor-pointer flex items-center gap-2.5 shrink-0"
        >
          <div className="w-9 h-9 rounded-md bg-stone-900 text-amber-300 flex items-center justify-center font-serif font-bold text-lg shadow-xs">
            寿
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-serif-luxury font-bold tracking-tight text-stone-900 whitespace-nowrap">
              プランナーの５つのプロデュース
            </span>
          </div>
        </div>

        {/* ゾーン2: ナビゲーションリンク */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-medium">
          <button
            type="button"
            onClick={() => {
              setActiveTab('styles');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'styles'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            スタイル比較
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('phases');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'phases'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            準備工程管理
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('ceremony');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 transition-colors whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
              activeTab === 'ceremony'
                ? 'border-amber-700 text-amber-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>人前式タイムライン</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('simulator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'simulator'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            収支シミュレーター
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('beauty');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'beauty'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            着付け＆美容技術
          </button>
        </nav>

        {/* ゾーン3: プライマリアクション */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors whitespace-nowrap border border-stone-200"
          >
            <Printer className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">提案書・研修シート</span>
            <span className="sm:hidden">印刷</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('simulator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-amber-700 hover:bg-amber-800 rounded-md shadow-xs transition-colors whitespace-nowrap"
          >
            収支を計算する
          </button>
        </div>
      </div>

      {/* モバイル用ナビゲーションバー */}
      <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 bg-stone-50 border-t border-stone-200 gap-2 no-scrollbar text-xs">
        <button
          type="button"
          onClick={() => {
            setActiveTab('styles');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-1.5 rounded whitespace-nowrap font-medium transition-colors ${
            activeTab === 'styles' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 bg-white border border-stone-200'
          }`}
        >
          スタイル比較
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('phases');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-1.5 rounded whitespace-nowrap font-medium transition-colors ${
            activeTab === 'phases' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 bg-white border border-stone-200'
          }`}
        >
          準備工程
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('ceremony');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-1.5 rounded whitespace-nowrap font-medium transition-colors ${
            activeTab === 'ceremony' ? 'bg-amber-700 text-white shadow-xs' : 'text-amber-800 bg-white border border-amber-200'
          }`}
        >
          人前式進行
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('simulator');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-1.5 rounded whitespace-nowrap font-medium transition-colors ${
            activeTab === 'simulator' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 bg-white border border-stone-200'
          }`}
        >
          収支シミュレーター
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('beauty');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-1.5 rounded whitespace-nowrap font-medium transition-colors ${
            activeTab === 'beauty' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 bg-white border border-stone-200'
          }`}
        >
          着付け＆美容
        </button>
      </div>
    </header>
  );
};
