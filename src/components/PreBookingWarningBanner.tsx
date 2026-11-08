import React, { useState } from 'react';
import { PRE_BOOKING_CRITICAL_WARNING } from '../data/bridalData';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Building2,
  Copy,
  Check,
  CalendarCheck,
  ShieldAlert,
} from 'lucide-react';

interface PreBookingWarningBannerProps {
  userRole: 'planner' | 'couple';
}

export const PreBookingWarningBanner: React.FC<PreBookingWarningBannerProps> = ({ userRole }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const inquiryScript =
    '【ホテル宴会課への問い合わせ文面例】\n「〇〇ホテル 宴会セールス課 御中\nこのたび、家族および親しい知人を招いた『お祝いの会（祝宴・レセプション）』の開催を検討しております。ゲスト約50名、着席コース料理またはブッフェでの開催を希望しております。宴会場の空き状況と、お料理・お飲み物の宴会プランのご案内をいただけますでしょうか。なお、衣装・カメラマン・進行スタッフ等は手配済みの持ち込みでの実施を予定しておりますので、一般宴会規定に準じた利用条件の確認をお願い申し上げます。」';

  const handleCopyScript = () => {
    navigator.clipboard.writeText(inquiryScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const { comparison, actionSteps } = PRE_BOOKING_CRITICAL_WARNING;

  return (
    <section className="rounded-2xl border-2 border-amber-600/40 bg-gradient-to-b from-amber-50/90 to-amber-100/30 p-6 sm:p-8 shadow-md space-y-6">
      {/* ヘッダー警告バー */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0 shadow-xs">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-700 text-white text-xs font-bold px-2 py-0.5 rounded">
                最重要注意点
              </span>
              <span className="text-xs font-bold text-amber-900 tracking-wider">
                会場予約前の計画必須ルール
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-900">
              一流ホテル等「祝う会」で予約するか、「一般婚礼」で予約するかで全てが変わる
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
              <strong>【予約する前から計画する必要性】</strong>
              一度でも式場のブライダル窓口で相談・予約すると、後から宴会枠・祝う会枠への切り替えは不可能です。
              会費制ウェディングを成功させる最大の分岐点です。
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-start md:self-center flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-950 bg-white/80 hover:bg-white rounded-lg border border-amber-300 transition-colors shrink-0 shadow-xs"
        >
          <span>{isExpanded ? '詳細を折りたたむ' : '分岐と対策を見る'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* 展開コンテンツ */}
      {isExpanded && (
        <div className="space-y-6 pt-2 border-t border-amber-200/80">
          {/* 決定的な違いの2大ルート比較カード */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* 成功：祝う会・宴会枠ルート */}
            <div className="rounded-xl border-2 border-emerald-500/60 bg-white p-5 shadow-xs space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-sm sm:text-base text-stone-900">
                    【推奨】予約前計画「祝う会・宴会枠（会費制）」
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  一流×低価格
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-stone-700">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">アプローチ窓口</span>
                  <span className="font-semibold text-emerald-800 text-right">
                    宴会セールス課（MICE・一般宴会）
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">衣装・カメラマン持込料</span>
                  <span className="font-bold text-emerald-700">完全無料（持込料0円）</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">式場の中間マージン</span>
                  <span className="font-bold text-emerald-700">0%（中抜き搾取なし）</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">クリエイター指名</span>
                  <span className="font-medium text-stone-800">一流フリーランスを完全自由に直発注</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">費用支払い方法</span>
                  <span className="font-medium text-emerald-800">当日集まった会費から即日精算可能</span>
                </div>
                <div className="flex justify-between py-2 bg-emerald-50/60 px-2.5 rounded font-bold text-emerald-950">
                  <span>新郎新婦 実質自己負担額</span>
                  <span className="font-mono text-sm">約 10万〜30万円（実質0円も可）</span>
                </div>
              </div>
            </div>

            {/* 失敗トラップ：一般婚礼予約ルート */}
            <div className="rounded-xl border-2 border-rose-300 bg-rose-50/40 p-5 shadow-xs space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-rose-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span className="font-bold text-sm sm:text-base text-stone-900">
                    【失敗トラップ】計画なし「一般婚礼予約」
                  </span>
                </div>
                <span className="text-xs font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded border border-rose-200">
                  高額マージン型
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-stone-700">
                <div className="flex justify-between py-1 border-b border-rose-100">
                  <span className="text-stone-500">アプローチ窓口</span>
                  <span className="font-semibold text-rose-800 text-right">
                    ブライダルサロン・婚礼カウンター
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-100">
                  <span className="text-stone-500">衣装・カメラマン持込料</span>
                  <span className="font-bold text-rose-700">持込不可 または 1点5万〜10万円請求</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-100">
                  <span className="text-stone-500">式場の中間マージン</span>
                  <span className="font-bold text-rose-700">30%〜50% 式場が中抜き</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-100">
                  <span className="text-stone-500">クリエイター指名</span>
                  <span className="font-medium text-stone-800">式場指定の提携業者のみ（変更不可）</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-100">
                  <span className="text-stone-500">費用支払い方法</span>
                  <span className="font-medium text-rose-800">挙式1〜2週間前の全額事前一括振込</span>
                </div>
                <div className="flex justify-between py-2 bg-rose-100/60 px-2.5 rounded font-bold text-rose-950">
                  <span>新郎新婦 実質自己負担額</span>
                  <span className="font-mono text-sm">約 150万〜250万円以上</span>
                </div>
              </div>
            </div>
          </div>

          {/* 予約前アクション3箇条 ＆ 問い合わせ台本 */}
          <div className="bg-white rounded-xl border border-amber-200 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-amber-700" />
              <h3 className="font-serif-luxury font-bold text-stone-900 text-sm sm:text-base">
                【プランナー＆新郎新婦】予約前アクション3箇条
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {actionSteps.map((step, idx) => (
                <div key={idx} className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 text-xs text-stone-800 leading-relaxed">
                  {step}
                </div>
              ))}
            </div>

            {/* 宴会課への問い合わせテンプレート（コピー機能付き） */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">
                  ホテル宴会セールス課への事前問い合わせ文面（研修生推奨スクリプト）
                </span>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">コピーしました</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>文面をコピー</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 font-mono leading-relaxed whitespace-pre-line">
                {inquiryScript}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
