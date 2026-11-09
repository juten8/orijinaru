import React, { useState } from 'react';
import { BEAUTY_TECHNIQUES, BeautyTechnique } from '../data/bridalData';
import { Sparkles, Clock, Check, Scissors, Heart, ShieldCheck, AlertCircle } from 'lucide-react';

interface BeautyGuideViewProps {
  userRole: 'planner' | 'couple';
}

export const BeautyGuideView: React.FC<BeautyGuideViewProps> = ({ userRole }) => {
  const [selectedTechId, setSelectedTechId] = useState<string>(BEAUTY_TECHNIQUES[0].id);

  const currentTech: BeautyTechnique =
    BEAUTY_TECHNIQUES.find((t) => t.id === selectedTechId) || BEAUTY_TECHNIQUES[0];

  return (
    <div className="space-y-12">
      {/* ヒーローバナー */}
      <div className="relative overflow-hidden rounded-2xl bg-stone-900 text-white shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/beauty_kimono_dressing.jpg"
            alt="日本の伝統と美しさを極める着付け・美容"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl">
          <div className="text-amber-300 font-serif-luxury tracking-widest text-xs font-semibold mb-2">
            KIMONO DRESSING & BRIDAL BEAUTY CRAFT
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-bold text-white mb-3 text-balance">
            着付けナビ美容・現場プロフェッショナル技術
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
            「和装は苦しい」「お色直しで30分以上待たされて中だるみする」という古い常識を覆す現場技術。
            みぞおちを圧迫しない和装補正から、15分以内の高速クイックチェンジ、美しい歩行姿勢アテンドまでを網羅。
          </p>
        </div>
      </div>

      {/* 技術セレクター */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {BEAUTY_TECHNIQUES.map((tech) => {
          const isSelected = tech.id === selectedTechId;
          return (
            <button
              key={tech.id}
              type="button"
              onClick={() => setSelectedTechId(tech.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'border-amber-600 bg-amber-50 shadow-xs ring-1 ring-amber-600/30'
                  : 'border-stone-200 bg-white hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-amber-800 font-semibold font-mono">
                  {tech.category.toUpperCase()}
                </span>
                <span className="text-stone-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>所要 {tech.durationMinutes}分</span>
                </span>
              </div>
              <div className="text-sm font-bold text-stone-900 line-clamp-2">
                {tech.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* 選択された技術の詳細解説 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左: 技術詳細 ＆ 手順リスト（7カラム） */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-2 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold">
              <Clock className="w-4 h-4" />
              <span>現場目標所要時間: {currentTech.durationMinutes}分以内</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-900">
              {currentTech.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
              {currentTech.description}
            </p>
          </div>

          {/* 工程ステップ */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 tracking-wider">
              【実践フロー・工程手順】
            </h4>
            <div className="space-y-2.5">
              {currentTech.keySteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl text-xs sm:text-sm text-stone-800 border border-stone-100">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* プロの極意 */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 space-y-1.5">
            <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>現場のプロフェッショナル極意</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              {currentTech.proTips}
            </p>
          </div>
        </div>

        {/* 右: トラブルシューティング ＆ 心得（5カラム） */}
        <div className="lg:col-span-5 space-y-6">
          {/* 当日美容トラブルシューティング */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm border-b border-stone-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>現場トラブル即応クイックガイド</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
                <span className="font-semibold text-stone-900 block">Q. 新婦が緊張で気分が悪くなりそうな時は？</span>
                <p className="text-stone-600 leading-relaxed">
                  帯の結びを緩めるのではなく、座った状態で背筋を伸ばし、みぞおちに保冷剤（ガーゼ包み）を当てて冷やすと迷走神経反射が落ち着きます。
                </p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
                <span className="font-semibold text-stone-900 block">Q. ドレスの裾を踏んで歩きにくい時は？</span>
                <p className="text-stone-600 leading-relaxed">
                  パニエの広がりを1段内側へ絞るか、歩く際につま先でドレスを前へ「蹴り出す」感覚をアテンドが耳打ち指導します。
                </p>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
                <span className="font-semibold text-stone-900 block">Q. 和装から洋装へチェンジする際の髪の乱れ防止は？</span>
                <p className="text-stone-600 leading-relaxed">
                  和装時はジェルや硬いスプレーで固めすぎず、オイルとピンワークを中心にまとめ、解いた瞬間に柔らかなウェーブが活きる下ごしらえを施します。
                </p>
              </div>
            </div>
          </div>

          {/* 新郎新婦への安心メッセージ */}
          <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-6 shadow-xs space-y-2">
            <div className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>新郎新婦様へ：当日は何も心配いりません</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              着付け美容師とアテンドが常時1メートル以内に待機し、すべての所作・ドレスの乱れを先回りしてケアいたします。
              おふたりはリラックスして、ゲストとの温かい笑顔に身を委ねてください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
