import React, { useState } from 'react';
import { BRIDAL_STYLES, BridalStyle } from '../data/bridalData';
import { formatYen } from '../utils/costCalculator';
import { Check, Sparkles, HeartHandshake, ArrowRight, Eye, ShieldAlert } from 'lucide-react';

interface StyleComparisonViewProps {
  userRole: 'planner' | 'couple';
  onSelectStyleForSim: (style: BridalStyle) => void;
  onGoToCeremony: () => void;
}

export const StyleComparisonView: React.FC<StyleComparisonViewProps> = ({
  userRole,
  onSelectStyleForSim,
  onGoToCeremony,
}) => {
  const [selectedStyleId, setSelectedStyleId] = useState<string>(BRIDAL_STYLES[0].id);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const currentStyle = BRIDAL_STYLES.find((s) => s.id === selectedStyleId) || BRIDAL_STYLES[0];

  return (
    <div className="space-y-12">
      {/* ヒーローセクション */}
      <div className="relative overflow-hidden rounded-2xl bg-stone-900 text-white shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bridal_produce.jpg"
            alt="日本の伝統と洗練された現代ウェディング"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent" />
        </div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl">
          <div className="text-amber-400 font-serif-luxury tracking-widest text-sm mb-3">
            BRIDAL PRODUCE METHODOLOGY
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal tracking-tight text-white leading-tight mb-4 text-balance">
            多様化するブライダルスタイルの<br />
            本質とプロデュース可視化
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
            「会費制×一流×低価格」を両立させ、形式ばらない自由な結婚式を叶えるための全5大スタイル比較。
            料理・会場・着付け美容の要点から、収支構造の違いまでを直感的に探究できます。
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectStyleForSim(currentStyle)}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span>このスタイルの収支を試算する</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onGoToCeremony}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-md backdrop-blur-xs transition-colors flex items-center gap-2 whitespace-nowrap border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>人前式タイムラインを見る</span>
            </button>
          </div>
        </div>
      </div>

      {/* スタイル選択バー ＆ 表示切替 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif-luxury font-semibold text-stone-900">
            5つのブライダルスタイル
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            おふたりの希望やゲスト層、予算感に合わせた最適なプロデュース枠組みを選択してください
          </p>
        </div>

        {/* 表示切替ボタン */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-md self-start sm:self-auto border border-stone-200">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              viewMode === 'cards'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            詳細カード
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              viewMode === 'table'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            一括比較テーブル
          </button>
        </div>
      </div>

      {/* スタイルタブセレクター */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {BRIDAL_STYLES.map((style, idx) => {
          const isSelected = style.id === selectedStyleId;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => setSelectedStyleId(style.id)}
              className={`text-left p-3.5 rounded-xl border transition-all ${
                isSelected
                  ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600/30'
                  : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div className="text-xs text-amber-700 font-medium mb-1">
                STYLE 0{idx + 1}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug mb-1 line-clamp-2">
                {style.name}
              </div>
              <div className="text-xs text-stone-500">
                会費目安: <span className="font-semibold text-stone-800">{formatYen(style.avgFeePerGuest)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 表示モード: 詳細カード */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 左カラム: ビジュアル＆基本スペック（5カラム） */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xs">
              <div className="relative aspect-4/3 w-full bg-stone-100">
                <img
                  src={currentStyle.imageUrl}
                  alt={currentStyle.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded">
                  目安会費: {formatYen(currentStyle.avgFeePerGuest)} / 名
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-xl font-serif-luxury font-bold text-stone-900 mb-2">
                    {currentStyle.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {currentStyle.description}
                  </p>
                </div>

                {/* 主要諸元スペック */}
                <div className="space-y-2.5 text-xs border-t border-stone-100 pt-4">
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">推奨ゲスト人数</span>
                    <span className="font-semibold text-stone-900">{currentStyle.targetGuestCount}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">料理・飲食形態</span>
                    <span className="font-semibold text-stone-900 text-right">{currentStyle.foodStyle}</span>
                  </div>
                  <div className="py-1">
                    <span className="text-stone-500 block mb-1">適した会場候補</span>
                    <div className="flex flex-wrap gap-1 text-stone-700">
                      {currentStyle.venueTypes.map((venue, i) => (
                        <span key={i} className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-xs">
                          {venue}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectStyleForSim(currentStyle)}
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>このスタイルで収支シミュレーションを実行</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* プランナー研修生向け秘訣ボックス */}
            {userRole === 'planner' && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>プランナー研修生向けプロデュースのツボ</span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {currentStyle.plannerSecret}
                </p>
              </div>
            )}
          </div>

          {/* 右カラム: 着付け美容の要点 ＆ メリット・注意点（7カラム） */}
          <div className="lg:col-span-7 space-y-6">
            {/* 着付けナビ美容のポイント */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <h4 className="font-serif-luxury font-bold text-stone-900 text-base">
                    着付けナビ＆美容スタイリングの要点
                  </h4>
                </div>
                <span className="text-xs text-stone-400">現場美容ノウハウ</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 bg-stone-50 rounded-xl space-y-1.5 border border-stone-100">
                  <div className="text-xs font-semibold text-stone-900">衣装・着付け動線</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {currentStyle.kimonoBeautyPoints.dressing}
                  </p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl space-y-1.5 border border-stone-100">
                  <div className="text-xs font-semibold text-stone-900">ヘアメイク設計</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {currentStyle.kimonoBeautyPoints.hairMake}
                  </p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl space-y-1.5 border border-stone-100">
                  <div className="text-xs font-semibold text-stone-900">クイックチェンジ</div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {currentStyle.kimonoBeautyPoints.quickChange}
                  </p>
                </div>
              </div>
            </div>

            {/* このスタイルにぴったりのカップル */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <HeartHandshake className="w-4 h-4 text-amber-700" />
                <h4 className="font-serif-luxury font-bold text-stone-900 text-base">
                  こんなおふたりにおすすめ
                </h4>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {currentStyle.suitableCouples.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* メリット & 現場の配慮事項 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-5 space-y-3">
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>最大のメリット</span>
                </div>
                <ul className="space-y-2 text-xs text-emerald-950">
                  {currentStyle.merits.map((m, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-700">・</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-5 space-y-3">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span>プロが配慮すべき留意点</span>
                </div>
                <ul className="space-y-2 text-xs text-amber-950">
                  {currentStyle.considerations.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-700">・</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 表示モード: 一括比較テーブル */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                <th className="p-4 whitespace-nowrap">スタイル名</th>
                <th className="p-4 whitespace-nowrap">ゲスト会費目安</th>
                <th className="p-4 whitespace-nowrap">推奨規模</th>
                <th className="p-4 whitespace-nowrap">料理・飲食形態</th>
                <th className="p-4 whitespace-nowrap">主な会場</th>
                <th className="p-4 whitespace-nowrap">着付け・美容の特徴</th>
                <th className="p-4 text-right whitespace-nowrap">試算</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {BRIDAL_STYLES.map((style) => (
                <tr key={style.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-4 font-semibold text-stone-900 whitespace-nowrap">
                    {style.name}
                  </td>
                  <td className="p-4 font-medium text-amber-800 whitespace-nowrap">
                    {formatYen(style.avgFeePerGuest)}
                  </td>
                  <td className="p-4 whitespace-nowrap">{style.targetGuestCount}</td>
                  <td className="p-4 min-w-44">{style.foodStyle}</td>
                  <td className="p-4 min-w-40">
                    {style.venueTypes.join(', ')}
                  </td>
                  <td className="p-4 min-w-56 text-stone-600">
                    {style.kimonoBeautyPoints.dressing}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSelectStyleForSim(style)}
                      className="px-3 py-1 bg-stone-900 text-white rounded hover:bg-stone-800 text-xs font-medium"
                    >
                      試算
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
