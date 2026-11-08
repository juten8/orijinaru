/**
 * @license
 * 著作権者: shigenori,watanabe
 * 利用規約: 本資料および本アプリに含まれるすべての内容（文章、構成、シミュレーションロジック等）の著作権は著作権者に帰属します。
 * 業界内における無断転写、複写、二次利用、外部への無断共有を固く禁じます。
 */

export interface SimulatorParams {
  guestCount: number;
  membershipFee: number; // ゲスト会費（円）
  foodCostPerGuest: number; // 料理原価
  drinkCostPerGuest: number; // 飲料原価
  venueCharterFee: number; // 会場貸切費
  beautyCost: number; // 和装・洋装着付け・ヘアメイク・アテンド費
  photoVideoCost: number; // 撮影・映像・全データ納品
  mcAudioCost: number; // 司会者・音響機材オペレーション
  flowerDecorCost: number; // 装花・会場デコレーション
  giftItemPerGuest: number; // ギフト・ペーパーレス/印刷物（1名あたり）
  produceFee: number; // プランナー直プロデュース報酬
}

export interface SimulationResult {
  // 会費制・直プロデュース型
  direct: {
    totalRevenue: number; // 会費総収入
    totalCost: number; // 総費用（原価＋プロデュース料）
    directCostTotal: number; // 純原価（パートナーへの直接支払合計）
    couplePayment: number; // 新郎新婦の実質自己負担額
    plannerProfit: number; // プランナー純プロデュース報酬
    guestBurden: number; // ゲスト1名あたりの負担額
    costPerGuest: number; // ゲスト1人あたりの原価投下額（おもてなし密度）
    partnerBreakdown: {
      category: string;
      label: string;
      amount: number;
      percentage: number;
      isFairDirect: boolean;
    }[];
  };
  // 従来の式場・ご祝儀マージン型（同規模での市場平均データ）
  traditional: {
    totalRevenue: number; // ご祝儀総額（平均3.5万円/人）
    totalQuote: number; // 式場総請求額（中間マージン・持込料上乗せ）
    venueMarginTaken: number; // 式場・ブライダル企業が中抜きするマージン（約35〜45%）
    couplePayment: number; // 新郎新婦の自己負担額
    guestBurden: number; // ゲスト負担額（ご祝儀3.5万＋二次会1万＝4.5万）
  };
  // 比較メリット
  savings: {
    coupleSavings: number; // 新郎新婦が節約できる金額
    guestSavingsPerPerson: number; // ゲスト1人あたりの負担軽減額
    qualityMultiplier: number; // 飲食・美容にダイレクト還元される原価比率
  };
}

export const DEFAULT_SIMULATOR_PARAMS: SimulatorParams = {
  guestCount: 50,
  membershipFee: 18000,
  foodCostPerGuest: 9000,
  drinkCostPerGuest: 3000,
  venueCharterFee: 80000,
  beautyCost: 110000,
  photoVideoCost: 90000,
  mcAudioCost: 60000,
  flowerDecorCost: 70000,
  giftItemPerGuest: 1200,
  produceFee: 180000,
};

export function calculateBridalFinance(params: SimulatorParams): SimulationResult {
  const {
    guestCount,
    membershipFee,
    foodCostPerGuest,
    drinkCostPerGuest,
    venueCharterFee,
    beautyCost,
    photoVideoCost,
    mcAudioCost,
    flowerDecorCost,
    giftItemPerGuest,
    produceFee,
  } = params;

  // 1. 直プロデュース・会費制計算
  const totalRevenue = guestCount * membershipFee;
  const foodDrinkTotal = guestCount * (foodCostPerGuest + drinkCostPerGuest);
  const giftTotal = guestCount * giftItemPerGuest;
  const directCostTotal =
    foodDrinkTotal +
    giftTotal +
    venueCharterFee +
    beautyCost +
    photoVideoCost +
    mcAudioCost +
    flowerDecorCost;

  const totalCost = directCostTotal + produceFee;
  const couplePayment = Math.max(0, totalCost - totalRevenue);
  const costPerGuest = Math.round(directCostTotal / guestCount);

  const partnerBreakdown = [
    {
      category: 'cuisine',
      label: 'シェフ特製料理・厳選ドリンク',
      amount: foodDrinkTotal,
      percentage: Math.round((foodDrinkTotal / directCostTotal) * 100),
      isFairDirect: true,
    },
    {
      category: 'beauty',
      label: 'プロ着付け・ヘアメイク・アテンド',
      amount: beautyCost,
      percentage: Math.round((beautyCost / directCostTotal) * 100),
      isFairDirect: true,
    },
    {
      category: 'photo',
      label: 'スナップ写真・動画・全カットデータ',
      amount: photoVideoCost,
      percentage: Math.round((photoVideoCost / directCostTotal) * 100),
      isFairDirect: true,
    },
    {
      category: 'venue',
      label: '会場貸切・設備使用料',
      amount: venueCharterFee,
      percentage: Math.round((venueCharterFee / directCostTotal) * 100),
      isFairDirect: true,
    },
    {
      category: 'direction',
      label: 'プロ司会者・音響オペレーター',
      amount: mcAudioCost,
      percentage: Math.round((mcAudioCost / directCostTotal) * 100),
      isFairDirect: true,
    },
    {
      category: 'flower',
      label: '装花・テーブルフラワー・ブーケ',
      amount: flowerDecorCost,
      percentage: Math.round((flowerDecorCost / directCostTotal) * 100),
      isFairDirect: true,
    },
    {
      category: 'gifts',
      label: '記念ギフト・Web案内システム',
      amount: giftTotal,
      percentage: Math.round((giftTotal / directCostTotal) * 100),
      isFairDirect: true,
    },
  ];

  // 2. 従来の式場・ご祝儀制比較（業界統計に基づくモデル）
  // 式場では50名の場合、料理飲料が1名あたり20,000円、衣装が30万〜50万、写真が25万、装花が20万、中間手数料が加算され、
  // 総見積もりは320万〜380万円（1人あたり約7万円の請求構造）
  const tradAvgCostPerGuestQuote = 68000;
  const traditionalTotalQuote = Math.round(guestCount * tradAvgCostPerGuestQuote + 300000); // パッケージ最低基本料
  const traditionalTotalRevenue = guestCount * 35000; // ご祝儀平均
  const traditionalCouplePayment = Math.max(0, traditionalTotalQuote - traditionalTotalRevenue);
  const venueMarginTaken = Math.round(traditionalTotalQuote * 0.42); // 平均42%の中間搾取・式場利益

  // 3. 節約効果
  const coupleSavings = Math.max(0, traditionalCouplePayment - couplePayment);
  const guestSavingsPerPerson = (35000 + 8000) - membershipFee; // ご祝儀3.5万+二次会8千円換算 - 会費
  const qualityMultiplier = Number(((foodDrinkTotal / totalCost) / 0.28).toFixed(1)); // 従来型は料理比率が25〜28%程度

  return {
    direct: {
      totalRevenue,
      totalCost,
      directCostTotal,
      couplePayment,
      plannerProfit: produceFee,
      guestBurden: membershipFee,
      costPerGuest,
      partnerBreakdown,
    },
    traditional: {
      totalRevenue: traditionalTotalRevenue,
      totalQuote: traditionalTotalQuote,
      venueMarginTaken,
      couplePayment: traditionalCouplePayment,
      guestBurden: 43000,
    },
    savings: {
      coupleSavings,
      guestSavingsPerPerson,
      qualityMultiplier: isNaN(qualityMultiplier) ? 1.4 : Math.max(1.2, qualityMultiplier),
    },
  };
}

export function formatYen(amount: number): string {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }).format(amount);
}
