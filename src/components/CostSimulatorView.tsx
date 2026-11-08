import React, { useState } from 'react';
import {
  SimulatorParams,
  SimulationResult,
  calculateBridalFinance,
  formatYen,
  DEFAULT_SIMULATOR_PARAMS,
} from '../utils/costCalculator';
import {
  Sliders,
  DollarSign,
  TrendingDown,
  Users,
  Heart,
  Briefcase,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface CostSimulatorViewProps {
  userRole: 'planner' | 'couple';
  initialParams?: Partial<SimulatorParams>;
}

export const CostSimulatorView: React.FC<CostSimulatorViewProps> = ({
  userRole,
  initialParams,
}) => {
  const [params, setParams] = useState<SimulatorParams>({
    ...DEFAULT_SIMULATOR_PARAMS,
    ...initialParams,
  });

  const [activePreset, setActivePreset] = useState<'standard' | 'family' | 'buffet' | 'luxury'>('standard');

  const result: SimulationResult = calculateBridalFinance(params);

  const handleSliderChange = (field: keyof SimulatorParams, value: number) => {
    setParams((prev) => ({ ...prev, [field]: value }));
  };

  const applyPreset = (type: 'standard' | 'family' | 'buffet' | 'luxury') => {
    setActivePreset(type);
    if (type === 'standard') {
      setParams({
        ...DEFAULT_SIMULATOR_PARAMS,
        guestCount: 50,
        membershipFee: 18000,
        foodCostPerGuest: 9000,
        drinkCostPerGuest: 3000,
      });
    } else if (type === 'family') {
      setParams({
        ...DEFAULT_SIMULATOR_PARAMS,
        guestCount: 20,
        membershipFee: 15000,
        foodCostPerGuest: 12000,
        drinkCostPerGuest: 3500,
        venueCharterFee: 60000,
        beautyCost: 130000, // 和装本格着付け
        produceFee: 150000,
      });
    } else if (type === 'buffet') {
      setParams({
        ...DEFAULT_SIMULATOR_PARAMS,
        guestCount: 65,
        membershipFee: 16000,
        foodCostPerGuest: 7500,
        drinkCostPerGuest: 3000,
        venueCharterFee: 100000,
        produceFee: 180000,
      });
    } else if (type === 'luxury') {
      setParams({
        ...DEFAULT_SIMULATOR_PARAMS,
        guestCount: 60,
        membershipFee: 22000,
        foodCostPerGuest: 12000,
        drinkCostPerGuest: 4000,
        beautyCost: 150000,
        photoVideoCost: 120000,
        flowerDecorCost: 100000,
        produceFee: 220000,
      });
    }
  };

  return (
    <div className="space-y-12">
      {/* 導入ヘッダー */}
      <div className="pb-4 border-b border-stone-200">
        <div className="text-amber-700 font-serif-luxury tracking-widest text-xs font-semibold mb-1">
          FINANCIAL ARCHITECTURE & SIMULATION
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900">
          「会費制×一流×低価格」の収支・仕組みシミュレーター
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          従来の「式場マージン型」と、本研修の主軸である「直プロデュース型」の収支構造をリアルタイムで比較。
          新郎新婦の自己負担・ゲストの費用感・プランナーの適正粗利がひと目で分かります。
        </p>
      </div>

      {/* プリセット選択ボタン */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-stone-500 mr-2">おすすめ試算モデル:</span>
        <button
          type="button"
          onClick={() => applyPreset('standard')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activePreset === 'standard'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          標準会費制（50名 / 1.8万円）
        </button>
        <button
          type="button"
          onClick={() => applyPreset('family')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activePreset === 'family'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          家族婚・美食会席（20名 / 1.5万円）
        </button>
        <button
          type="button"
          onClick={() => applyPreset('buffet')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activePreset === 'buffet'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          着席ブッフェ（65名 / 1.6万円）
        </button>
        <button
          type="button"
          onClick={() => applyPreset('luxury')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activePreset === 'luxury'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          一流美食こだわり（60名 / 2.2万円）
        </button>
      </div>

      {/* 3つのカラムブロック（消費者も分かりプランナーも分かる設計） */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* カラム1: ゲスト視点 */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div className="w-1.5 h-full bg-emerald-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-emerald-800">
              COLUMN 01
            </span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>

          <div>
            <h3 className="text-base font-serif-luxury font-bold text-stone-900">
              【ゲストの視点】
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">参列時の負担激減とおもてなし満足度</p>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-xl space-y-2 border border-emerald-100">
            <div className="text-xs text-emerald-900">1人あたり参加費（設定会費）</div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-emerald-950 tabular-nums">
              {formatYen(result.direct.guestBurden)}
            </div>
            <div className="text-xs text-emerald-800 flex items-center gap-1 font-medium">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>従来ご祝儀比 -{formatYen(result.savings.guestSavingsPerPerson)} おトク</span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-stone-600">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>ご祝儀袋やピン札準備のストレス完全ゼロ</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>二次会参加の追加出費がなく1回で大満足</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>料理・ドリンクへの原価配分が高く、本当に美味しい</span>
            </li>
          </ul>
        </div>

        {/* カラム2: 新郎新婦視点 */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div className="w-1.5 h-full bg-amber-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-800">
              COLUMN 02
            </span>
            <Heart className="w-4 h-4 text-amber-600" />
          </div>

          <div>
            <h3 className="text-base font-serif-luxury font-bold text-stone-900">
              【新郎新婦の視点】
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">自己負担額の最小化と持込料ゼロの自由度</p>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-xl space-y-2 border border-amber-100">
            <div className="text-xs text-amber-900">新郎新婦の実質自己負担額</div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-amber-950 tabular-nums">
              {formatYen(result.direct.couplePayment)}
            </div>
            <div className="text-xs text-amber-800 flex items-center gap-1 font-medium">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>式場比 約{formatYen(result.savings.coupleSavings)} 節約</span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-stone-600">
            <li className="flex items-start gap-1.5">
              <span className="text-amber-600 font-bold">✓</span>
              <span>ドレス・カメラマン・装花の持込料完全0円</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-600 font-bold">✓</span>
              <span>最初から総額固定、後から見積もりが上がらない</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-600 font-bold">✓</span>
              <span>当日集まった会費でその場精算可能（事前借入不要）</span>
            </li>
          </ul>
        </div>

        {/* カラム3: プランナー視点 */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div className="w-1.5 h-full bg-stone-700 absolute top-0 left-0" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-stone-700">
              COLUMN 03
            </span>
            <Briefcase className="w-4 h-4 text-stone-700" />
          </div>

          <div>
            <h3 className="text-base font-serif-luxury font-bold text-stone-900">
              【プランナー研修生の視点】
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">透明なプロデュース報酬と一流クリエイター還元</p>
          </div>

          <div className="p-4 bg-stone-100 rounded-xl space-y-2 border border-stone-200">
            <div className="text-xs text-stone-700">プロデュース報酬（純粗利）</div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-stone-900 tabular-nums">
              {formatYen(result.direct.plannerProfit)}
            </div>
            <div className="text-xs text-stone-600 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
              <span>中抜きのない完全透明・適正報酬</span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-stone-600">
            <li className="flex items-start gap-1.5">
              <span className="text-stone-700 font-bold">✓</span>
              <span>着付け美容師・撮影陣に適正単価を100%直払い</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-stone-700 font-bold">✓</span>
              <span>式場提携ノルマに縛られず自由な提案ができる</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-stone-700 font-bold">✓</span>
              <span>高単価押し売りが不要なため、成約率が跳ね上がる</span>
            </li>
          </ul>
        </div>
      </div>

      {/* スライダー調整パネル ＆ 収支内訳ビジュアライザー */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左: パラメータスライダー（6カラム） */}
        <div className="lg:col-span-6 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif-luxury font-bold text-stone-900 text-base">
                シミュレーション条件設定
              </h3>
            </div>
            <button
              type="button"
              onClick={() => applyPreset('standard')}
              className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>初期値に戻す</span>
            </button>
          </div>

          {/* ゲスト人数 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="sim-guest-count" className="font-semibold text-stone-800">ゲスト人数</label>
              <span className="font-mono font-bold text-stone-900 text-sm tabular-nums">
                {params.guestCount} 名
              </span>
            </div>
            <input
              id="sim-guest-count"
              type="range"
              min={10}
              max={100}
              step={5}
              value={params.guestCount}
              onChange={(e) => handleSliderChange('guestCount', Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-stone-400">
              <span>10名 (家族婚)</span>
              <span>50名 (標準)</span>
              <span>100名 (大型)</span>
            </div>
          </div>

          {/* 設定会費 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="sim-membership-fee" className="font-semibold text-stone-800">ゲスト設定会費</label>
              <span className="font-mono font-bold text-amber-700 text-sm tabular-nums">
                {formatYen(params.membershipFee)} / 名
              </span>
            </div>
            <input
              id="sim-membership-fee"
              type="range"
              min={10000}
              max={30000}
              step={1000}
              value={params.membershipFee}
              onChange={(e) => handleSliderChange('membershipFee', Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-stone-400">
              <span>10,000円 (気軽)</span>
              <span>18,000円 (王道)</span>
              <span>30,000円 (フルコース)</span>
            </div>
          </div>

          {/* 料理・ドリンク原価 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="sim-food-cost" className="font-medium text-stone-700">料理原価（1名）</label>
                <span className="font-mono font-semibold text-stone-900 tabular-nums">
                  {formatYen(params.foodCostPerGuest)}
                </span>
              </div>
              <input
                id="sim-food-cost"
                type="range"
                min={5000}
                max={16000}
                step={500}
                value={params.foodCostPerGuest}
                onChange={(e) => handleSliderChange('foodCostPerGuest', Number(e.target.value))}
                className="w-full accent-stone-700 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label htmlFor="sim-drink-cost" className="font-medium text-stone-700">飲物原価（1名）</label>
                <span className="font-mono font-semibold text-stone-900 tabular-nums">
                  {formatYen(params.drinkCostPerGuest)}
                </span>
              </div>
              <input
                id="sim-drink-cost"
                type="range"
                min={2000}
                max={5000}
                step={500}
                value={params.drinkCostPerGuest}
                onChange={(e) => handleSliderChange('drinkCostPerGuest', Number(e.target.value))}
                className="w-full accent-stone-700 cursor-pointer"
              />
            </div>
          </div>

          {/* 固定クリエイター報酬原価 */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <div className="text-xs font-semibold text-stone-900">
              プロフェッショナル直発注費用（持込料0円）
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="sim-beauty-cost" className="text-stone-600">着付け・美容・アテンド</label>
                  <span className="font-mono font-medium">{formatYen(params.beautyCost)}</span>
                </div>
                <input
                  id="sim-beauty-cost"
                  type="range"
                  min={60000}
                  max={200000}
                  step={10000}
                  value={params.beautyCost}
                  onChange={(e) => handleSliderChange('beautyCost', Number(e.target.value))}
                  className="w-full accent-stone-700 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="sim-photo-cost" className="text-stone-600">撮影・映像・全データ</label>
                  <span className="font-mono font-medium">{formatYen(params.photoVideoCost)}</span>
                </div>
                <input
                  id="sim-photo-cost"
                  type="range"
                  min={50000}
                  max={180000}
                  step={10000}
                  value={params.photoVideoCost}
                  onChange={(e) => handleSliderChange('photoVideoCost', Number(e.target.value))}
                  className="w-full accent-stone-700 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="sim-venue-charter" className="text-stone-600">会場貸切料</label>
                  <span className="font-mono font-medium">{formatYen(params.venueCharterFee)}</span>
                </div>
                <input
                  id="sim-venue-charter"
                  type="range"
                  min={30000}
                  max={200000}
                  step={10000}
                  value={params.venueCharterFee}
                  onChange={(e) => handleSliderChange('venueCharterFee', Number(e.target.value))}
                  className="w-full accent-stone-700 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="sim-produce-fee" className="text-stone-600">プロデュース報酬</label>
                  <span className="font-mono font-medium text-amber-800">{formatYen(params.produceFee)}</span>
                </div>
                <input
                  id="sim-produce-fee"
                  type="range"
                  min={100000}
                  max={300000}
                  step={10000}
                  value={params.produceFee}
                  onChange={(e) => handleSliderChange('produceFee', Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 右: 収支対比＆パートナー還元ブレイクダウン（6カラム） */}
        <div className="lg:col-span-6 space-y-6">
          {/* 収支サマリーカード */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-serif-luxury font-bold text-stone-900 text-base border-b border-stone-100 pb-2">
              会費制直プロデュース 収支サマリー
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">① 会費総収入（{params.guestCount}名 × {formatYen(params.membershipFee)}）</span>
                <span className="font-mono font-bold text-stone-900 text-sm tabular-nums">
                  {formatYen(result.direct.totalRevenue)}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">② 純原価合計（料理・会場・美容・撮影・音響・装花）</span>
                <span className="font-mono font-medium text-stone-700 tabular-nums">
                  {formatYen(result.direct.directCostTotal)}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">③ プランナープロデュース報酬</span>
                <span className="font-mono font-medium text-amber-800 tabular-nums">
                  {formatYen(result.direct.plannerProfit)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-stone-900 text-sm font-bold bg-amber-50/50 px-2 rounded">
                <span className="text-stone-900">新郎新婦 自己負担額（総費用 − 会費収入）</span>
                <span className="font-mono text-amber-900 text-base tabular-nums">
                  {formatYen(result.direct.couplePayment)}
                </span>
              </div>
            </div>
          </div>

          {/* 従来の式場型との比較対照ボックス */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/30 p-6 shadow-xs space-y-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950 leading-relaxed font-medium">
              <strong className="text-amber-900 block mb-1">【最重要】この収支を実現するための前提条件</strong>
              一流ホテル等を利用する場合、予約前の計画段階で「祝う会・宴会枠（会費制）」として予約することが必須です。
              一般婚礼予約で申し込んでしまうと持込料やマージンが強制上乗せされ、右記の「従来の式場型（自己負担{formatYen(result.traditional.couplePayment)}）」に跳ね上がります。
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-rose-950 pt-1">
              <span>従来の式場型（ご祝儀制・マージン型）との対比</span>
              <span className="text-rose-700">同規模 {params.guestCount}名</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-rose-100">
                <span className="text-stone-500 block mb-1">式場側の総請求額</span>
                <span className="font-mono font-bold text-stone-900 text-sm">
                  {formatYen(result.traditional.totalQuote)}
                </span>
                <span className="text-stone-400 block text-xs mt-1">（式場中抜き: 約{formatYen(result.traditional.venueMarginTaken)}）</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-rose-100">
                <span className="text-rose-600 block mb-1 font-semibold">従来の自己負担額</span>
                <span className="font-mono font-bold text-rose-800 text-sm">
                  {formatYen(result.traditional.couplePayment)}
                </span>
                <span className="text-emerald-700 block text-xs mt-1 font-semibold">
                  会費制で 約{formatYen(result.savings.coupleSavings)} 削減！
                </span>
              </div>
            </div>
          </div>

          {/* パートナー別 直発注配分グラフ */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-900">
                原価配分の内訳（中抜きゼロの一流クリエイター直接還元）
              </h4>
              <span className="text-xs text-stone-400">100% 直払い</span>
            </div>

            <div className="space-y-2">
              {result.direct.partnerBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-700">{item.label}</span>
                    <span className="font-mono text-stone-900 tabular-nums">
                      {formatYen(item.amount)} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 rounded-full"
                      style={{ width: `${Math.min(100, item.percentage * 2)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
