import React from 'react';
import { COPYRIGHT_INFO, BRIDAL_STYLES, JINZEN_CEREMONY_STEPS, PRODUCE_PHASES } from '../data/bridalData';
import { calculateBridalFinance, formatYen, DEFAULT_SIMULATOR_PARAMS } from '../utils/costCalculator';
import { Printer, ArrowLeft, ShieldCheck, Check } from 'lucide-react';

interface ProposalSheetViewProps {
  onBack: () => void;
}

export const ProposalSheetView: React.FC<ProposalSheetViewProps> = ({ onBack }) => {
  const currentFinance = calculateBridalFinance(DEFAULT_SIMULATOR_PARAMS);
  const selectedStyle = BRIDAL_STYLES[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* 画面操作コントロール（印刷時は非表示） */}
      <div className="no-print flex items-center justify-between pb-4 border-b border-stone-200">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-md hover:bg-stone-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>アプリ画面に戻る</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 rounded-md hover:bg-stone-800 shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>この研修提案書を印刷・PDF保存</span>
        </button>
      </div>

      {/* 提案書・研修シート本体（印刷対応） */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* 表紙ヘッダー */}
        <div className="border-b-2 border-stone-900 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-amber-800 font-serif-luxury tracking-widest text-xs font-semibold mb-1">
                BRIDAL PRODUCE FORMAL PROPOSAL & TRAINING CERTIFICATE
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900">
                プランナーの５つのプロデュース 提案・研修仕様書
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                「会費制×一流×低価格」完全直プロデュース設計書
              </p>
            </div>
            <div className="text-right text-xs text-stone-500 space-y-1">
              <div>発行日: 2026年11月吉日</div>
              <div className="font-semibold text-stone-800">プロデュース担当: 認定ウエディングプランナー</div>
            </div>
          </div>
        </div>

        {/* 著作権＆法的利用規約表示（必須） */}
        <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-1">
          <div className="font-bold text-stone-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-stone-700" />
            <span>著作権および利用に関するご注意</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            {COPYRIGHT_INFO.statement}
          </p>
          <div className="text-stone-500 font-mono text-xs">
            著作権者: <strong className="text-stone-800">{COPYRIGHT_INFO.author}</strong>
          </div>
        </div>

        {/* 【最重要注意点】会場予約前の計画必須ルール（提案書必携） */}
        <div className="p-4 bg-amber-50/70 border-2 border-amber-500/50 rounded-lg text-xs space-y-2">
          <div className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
            <span>【最重要注意点】一流ホテル・式場「予約前」の計画必須ルール</span>
          </div>
          <p className="text-amber-950 leading-relaxed">
            一流ホテル等を利用する場合、予約段階で「祝う会（宴会枠）」で行うか、「一般婚礼予約（ブライダル枠）」で行うかにより収支・持込料・自己負担額が全く別物になります。
            一度でもブライダル窓口で相談・予約すると宴会枠への切替は不可能なため、必ず【会場へ問い合わせる前】に本プロデュース計画を合意して進行してください。会費制の場合も同様です。
          </p>
        </div>

        {/* 1. 提案スタイル概要 */}
        <div className="space-y-3">
          <h2 className="text-base font-serif-luxury font-bold text-stone-900 border-b border-stone-200 pb-1">
            1. 採用ブライダルスタイル概要
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-stone-50 rounded border border-stone-100">
              <span className="text-stone-500 block mb-0.5">スタイル名称</span>
              <span className="font-bold text-stone-900 text-sm">{selectedStyle.name}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded border border-stone-100">
              <span className="text-stone-500 block mb-0.5">ゲスト設定会費 / 推奨規模</span>
              <span className="font-bold text-stone-900 text-sm">
                {formatYen(selectedStyle.avgFeePerGuest)} / 名 （{selectedStyle.targetGuestCount}）
              </span>
            </div>
          </div>
        </div>

        {/* 2. 人前式タイムライン進行表（重点可視化） */}
        <div className="space-y-3">
          <h2 className="text-base font-serif-luxury font-bold text-stone-900 border-b border-stone-200 pb-1">
            2. 人前式（セレモニー）標準進行タイムテーブル（全30分）
          </h2>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-200 text-stone-700">
                <th className="p-2.5 whitespace-nowrap">時間配分</th>
                <th className="p-2.5 whitespace-nowrap">ステップ名</th>
                <th className="p-2.5 min-w-48">進行・司会アナウンス概要</th>
                <th className="p-2.5 min-w-44">着付け美容アテンド動作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {JINZEN_CEREMONY_STEPS.map((step) => (
                <tr key={step.stepNumber}>
                  <td className="p-2.5 font-mono text-stone-500 whitespace-nowrap">
                    {step.timeRange}
                  </td>
                  <td className="p-2.5 font-semibold text-stone-900 whitespace-nowrap">
                    {step.title}
                  </td>
                  <td className="p-2.5 text-stone-600 line-clamp-2">
                    {step.subtitle}
                  </td>
                  <td className="p-2.5 text-stone-600">
                    {step.attendantBeautyAction.slice(0, 45)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. 収支構造・見積書ブレイクダウン */}
        <div className="space-y-3">
          <h2 className="text-base font-serif-luxury font-bold text-stone-900 border-b border-stone-200 pb-1">
            3. 会費制直プロデュース 収支明細書（50名標準モデル）
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
            <div className="p-3 bg-stone-50 rounded border border-stone-200">
              <span className="text-stone-500 block">会費総収入 (A)</span>
              <span className="font-mono font-bold text-stone-900 text-base">
                {formatYen(currentFinance.direct.totalRevenue)}
              </span>
            </div>
            <div className="p-3 bg-stone-50 rounded border border-stone-200">
              <span className="text-stone-500 block">総原価・パートナー直払い (B)</span>
              <span className="font-mono font-bold text-stone-900 text-base">
                {formatYen(currentFinance.direct.directCostTotal)}
              </span>
            </div>
            <div className="p-3 bg-amber-50 rounded border border-amber-200">
              <span className="text-amber-900 block font-semibold">新郎新婦 実質自己負担額</span>
              <span className="font-mono font-bold text-amber-950 text-base">
                {formatYen(currentFinance.direct.couplePayment)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded bg-stone-50 text-xs text-stone-600 space-y-1 border border-stone-100">
            <div className="font-semibold text-stone-900">
              ★ 従来の式場型（見積もり約370万円 / ご祝儀制）との比較：
            </div>
            <div>
              ・新郎新婦の自己負担を <strong className="text-emerald-700">約{formatYen(currentFinance.savings.coupleSavings)} 節約</strong>
            </div>
            <div>
              ・ゲスト1人あたりの費用負担を <strong className="text-emerald-700">約{formatYen(currentFinance.savings.guestSavingsPerPerson)} 軽減</strong>
            </div>
            <div>
              ・式場の中間マージン・持込料を完全撤廃し、100%一流クリエイターに適正還元
            </div>
          </div>
        </div>

        {/* 署名欄 */}
        <div className="pt-6 border-t border-stone-200 grid grid-cols-2 gap-8 text-xs">
          <div className="p-4 bg-stone-50 rounded border border-stone-200 space-y-6">
            <div className="font-semibold text-stone-900">新郎新婦様 ご確認署名欄</div>
            <div className="border-b border-stone-300 h-8" />
            <div className="text-right text-stone-400">印</div>
          </div>
          <div className="p-4 bg-stone-50 rounded border border-stone-200 space-y-6">
            <div className="font-semibold text-stone-900">ブライダルプロデュース担当 印</div>
            <div className="border-b border-stone-300 h-8" />
            <div className="text-right text-stone-400">印</div>
          </div>
        </div>
      </div>
    </div>
  );
};
