import React, { useState, useEffect } from 'react';
import { JINZEN_CEREMONY_STEPS, CeremonyStep } from '../data/bridalData';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Copy,
  Check,
  Sparkles,
  Users,
  Heart,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface CeremonyTimelineViewProps {
  userRole: 'planner' | 'couple';
}

export const CeremonyTimelineView: React.FC<CeremonyTimelineViewProps> = ({ userRole }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState<number>(0);

  const currentStep: CeremonyStep = JINZEN_CEREMONY_STEPS[currentStepIndex];

  // 自動タイムライン再生シミュレーション
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1;
          // 各ステップはシミュレーションでは約12秒で次ステップへ進む
          if (next % 12 === 0) {
            setCurrentStepIndex((prevIdx) => {
              if (prevIdx < JINZEN_CEREMONY_STEPS.length - 1) {
                return prevIdx + 1;
              } else {
                setIsPlaying(false);
                return prevIdx;
              }
            });
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleCopyScript = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentStep.mcScript);
      }
    } catch {
      // fallback
    }
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setElapsedSeconds(0);
  };

  const handleSelectStep = (idx: number) => {
    setCurrentStepIndex(idx);
    setSelectedVariationIndex(0);
  };

  return (
    <div className="space-y-10">
      {/* 導入ヘッダー ＆ 写真バナー */}
      <div className="relative overflow-hidden rounded-2xl bg-stone-900 text-white shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ceremony_jinzen_shiki.jpg"
            alt="人前式セレモニーの情景"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/85 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl">
          <div className="text-amber-300 font-serif-luxury tracking-widest text-xs font-semibold mb-2">
            CIVIL CEREMONY DIRECTING BLUEPRINT
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-bold text-white mb-3 text-balance">
            【重点可視化】人前式（セレモニー）の具体的進行手順
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
            神仏ではなく大切なゲストの前で誓いを立てる人前式。「何から始めればいいか分からない」という不安を排し、
            開式から退場までの全6工程（約30分）を、司会台本・ゲスト演出・着付け美容アテンド動作まで秒刻みで具体化しました。
          </p>

          {/* タイムライン操作コントローラー */}
          <div className="flex flex-wrap items-center gap-3 bg-stone-900/90 backdrop-blur-md p-3 rounded-xl border border-stone-700/80 w-fit">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-md transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? '一時停止' : 'タイムライン自動再生'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors"
              title="最初に戻る"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-stone-700" />

            <div className="text-xs font-mono text-stone-300 tabular-nums">
              現在進行: <span className="text-amber-300 font-bold">{currentStep.timeRange}</span> ({currentStep.durationMinutes}分)
            </div>
          </div>
        </div>
      </div>

      {/* タイムラインステップバー（1〜6） */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>開式 00:00</span>
          <span>人前式 全体所要時間 約30分</span>
          <span>アフターセレモニー 00:30</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {JINZEN_CEREMONY_STEPS.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isPast = idx < currentStepIndex;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => handleSelectStep(idx)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isActive
                    ? 'border-amber-600 bg-amber-50 shadow-xs ring-1 ring-amber-600/30'
                    : isPast
                    ? 'border-stone-200 bg-stone-50/80 text-stone-700'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span
                    className={`font-mono font-semibold ${
                      isActive ? 'text-amber-800' : 'text-stone-500'
                    }`}
                  >
                    Step 0{step.stepNumber}
                  </span>
                  <span className="text-stone-400 font-mono text-xs">{step.timeRange.split(' - ')[0]}</span>
                </div>
                <div
                  className={`text-xs font-bold truncate ${
                    isActive ? 'text-amber-950' : 'text-stone-900'
                  }`}
                >
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 現在選択ステップの総合詳細パネル */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左カラム: 司会者アナウンス台本 ＆ BGM演出（7カラム） */}
        <div className="lg:col-span-7 space-y-6">
          {/* 司会者アナウンス台本 */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-600" />
                <h3 className="font-serif-luxury font-bold text-stone-900 text-lg">
                  司会者アナウンス原稿（MC台本）
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCopyScript}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
              >
                {copiedScript ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">コピー完了</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>台本をコピー</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-amber-50/40 border border-amber-100/60 rounded-xl">
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-serif tracking-wide whitespace-pre-line">
                {currentStep.mcScript}
              </p>
            </div>

            <div className="text-xs text-stone-500">
              ※ おふたりのエピソードやゲスト層に応じて文面を柔軟にアレンジできます。
            </div>
          </div>

          {/* 参加型演出バリエーション */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h4 className="font-serif-luxury font-bold text-stone-900 text-base">
                このステップの演出バリエーション
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentStep.variations.map((v, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedVariationIndex(i)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedVariationIndex === i
                      ? 'border-amber-600 bg-amber-50/50 shadow-xs'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/60'
                  }`}
                >
                  <div className="text-xs font-bold text-stone-900 mb-1 flex items-center justify-between">
                    <span>{v.name}</span>
                    {selectedVariationIndex === i && (
                      <span className="text-amber-700 text-xs font-medium">選択中</span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BGM選曲＆音響オペレーションの指示 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 flex items-start gap-3 shadow-xs">
            <Volume2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <span className="font-bold text-stone-900">BGM選曲・音響キュー出しのポイント</span>
              <p className="text-stone-600 leading-relaxed">
                {currentStep.bgmSuggestion}
              </p>
            </div>
          </div>
        </div>

        {/* 右カラム: 新郎新婦・ゲスト・着付け美容アテンド動作（5カラム） */}
        <div className="lg:col-span-5 space-y-6">
          {/* 着付け＆美容アテンドのプロ動作（現場の真価） */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-950 font-bold text-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>着付けナビ美容アテンドの現場指示</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
              {currentStep.attendantBeautyAction}
            </p>
          </div>

          {/* 新郎新婦の動き */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <Heart className="w-4 h-4 text-amber-700" />
              <span>新郎新婦の所作・動線</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {currentStep.coupleAction}
            </p>
          </div>

          {/* ゲストの参加・反応 */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <Users className="w-4 h-4 text-stone-700" />
              <span>ゲストのアクション・会場の空気</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {currentStep.guestAction}
            </p>
          </div>

          {/* プランナー研修生向け重要チェックポイント */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 space-y-1.5 text-xs">
            <div className="font-bold text-amber-900">
              【プロデュースの鍵】
            </div>
            <p className="text-amber-950 leading-relaxed">
              {currentStep.keyPoint}
            </p>
          </div>

          {/* 前後ステップへの移動 */}
          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              disabled={currentStepIndex <= 0}
              onClick={() => handleSelectStep(Math.max(0, currentStepIndex - 1))}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-stone-600 bg-white border border-stone-200 rounded hover:bg-stone-50 disabled:opacity-30"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>前のステップ</span>
            </button>

            <span className="text-xs text-stone-500 font-mono">
              {currentStepIndex + 1} / {JINZEN_CEREMONY_STEPS.length}
            </span>

            <button
              type="button"
              disabled={currentStepIndex >= JINZEN_CEREMONY_STEPS.length - 1}
              onClick={() => handleSelectStep(Math.min(JINZEN_CEREMONY_STEPS.length - 1, currentStepIndex + 1))}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-stone-900 rounded hover:bg-stone-800 disabled:opacity-30"
            >
              <span>次のステップ</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
