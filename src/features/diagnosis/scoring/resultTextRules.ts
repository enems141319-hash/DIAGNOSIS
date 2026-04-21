import type {
  DiagnosisDimensionKey,
  DiagnosisOverallLevel,
  DimensionTextRule,
  ResultTextRule,
} from '@/features/diagnosis/scoring/types';

export const overallSummaryRules: Record<
  DiagnosisOverallLevel,
  ResultTextRule
> = {
  // strong = highest urgency (score >= 75%)
  strong: {
    minPercentage: 75,
    maxPercentage: 100,
    summary:
      '你所在的產業對品牌有高度依賴，而你目前的品牌狀態與市場期待有明顯落差。現在是建立品牌系統最關鍵的時機——每拖一天，就是在讓競爭對手先建立客戶的第一印象。',
  },
  // stable = moderate-high urgency (55–74%)
  stable: {
    minPercentage: 55,
    maxPercentage: 74,
    summary:
      '你已有基本的品牌意識，但幾個關鍵面向仍有缺口，正在悄悄影響你的成交率與客戶信任度。現在介入還來得及在問題放大前做好準備。',
  },
  // fragile = moderate urgency (35–54%)
  fragile: {
    minPercentage: 35,
    maxPercentage: 54,
    summary:
      '你的品牌目前還在過渡期，部分基礎已建立，但還沒有形成穩定優勢。現在投入品牌設計能讓你在市場站穩腳步，而不是等到問題出現再補救。',
  },
  // critical = lowest urgency (0–34%)
  critical: {
    minPercentage: 0,
    maxPercentage: 34,
    summary:
      '你目前所在的市場對品牌依賴程度相對較低，或你已有一定的品牌基礎在運作。若有擴張或提升定價的計畫，品牌投資仍值得提前布局。',
  },
};

export const dimensionTextRules: Record<
  DiagnosisDimensionKey,
  DimensionTextRule
> = {
  brand: {
    dimension: 'brand',
    // weak = low urgency for brand services
    weak: {
      insight: '你的商業模式已有一定的品牌支撐，客戶選擇你不完全依賴價格競爭。',
      problem: '品牌急迫性目前偏低，但若計畫提升定價或擴張市場，仍需要更系統的品牌架構。',
      recommendation: '可以先聚焦在鞏固現有客戶的品牌認同，為下一階段的成長預做準備。',
    },
    // medium = moderate urgency
    medium: {
      insight: '你的商業模式正在從價格競爭往品牌溢價過渡，但目前品牌力還不足以支撐這個轉變。',
      problem: '客戶選擇你的理由尚不穩定，殺價壓力仍在，說明品牌還沒有建立足夠的選擇理由。',
      recommendation: '現在是建立品牌定位的關鍵窗口——先定義你服務誰、為什麼選你，再往視覺與通路延伸。',
    },
    // strong = high urgency
    strong: {
      insight: '你的商業模式高度依賴價格或人際關係，這是品牌介入效益最明顯的狀態。',
      problem: '沒有清楚的品牌主張，客戶每次選擇你都是一次重新說服——你的成交成本遠高於應有水準。',
      recommendation: '立即建立品牌定位與視覺識別系統，讓客戶在第一次接觸就能理解你的價值，而不是靠你親口解釋。',
    },
  },
  visual: {
    dimension: 'visual',
    // weak = low urgency for visual design
    weak: {
      insight: '你所在的產業或你自身已具備一定視覺意識，設計投資的回報率在這個階段相對有限。',
      problem: '視覺設計的急迫性目前偏低，但隨著市場競爭加劇，視覺差異化仍是建立第一印象的核心手段。',
      recommendation: '可先評估現有視覺素材的一致性，確認品牌識別在各接觸點是否能被穩定傳遞。',
    },
    // medium = moderate urgency
    medium: {
      insight: '你已感受到視覺對客戶決策有一定影響，但目前的視覺呈現還沒能充分支撐這個認知。',
      problem: '視覺不一致或缺乏設計感，正在讓你白白流失那些「第一眼就在評估你專不專業」的客戶。',
      recommendation: '從最常被看到的接觸點開始整頓視覺——IG、官網、店面招牌三選一優先處理，建立一個可延伸的視覺基調。',
    },
    // strong = high urgency
    strong: {
      insight: '你所在的產業與你自身都明確感受到視覺設計對客戶選擇的直接影響，這是高設計敏感度市場的訊號。',
      problem: '在這樣的市場裡沒有完整的視覺系統，等於讓競爭對手每天都在你客戶眼前建立更強的第一印象。',
      recommendation: '視覺設計是你最直接能改變客戶感知的槓桿點，建議從品牌識別出發，同步規劃線上與線下的視覺一致性。',
    },
  },
  growth: {
    dimension: 'growth',
    // weak = low urgency for growth/systems
    weak: {
      insight: '你的經營模式目前具備一定的系統性，對個人的依賴程度相對較低。',
      problem: '成長系統化的急迫性目前偏低，但若有展店或複製模式的計畫，品牌系統需要提前建立。',
      recommendation: '現在適合思考擴張路徑：品牌是讓你不在場時仍能傳遞價值的核心工具。',
    },
    // medium = moderate urgency
    medium: {
      insight: '你的生意已有擴張意識，但目前的品牌架構還沒能支撐「讓別人代替你說話」的需求。',
      problem: '當客戶選擇你是因為「認識你」而非「認識你的品牌」，任何擴張都會遇到複製上限。',
      recommendation: '在擴張之前先建立品牌系統，讓品牌語言、視覺與服務標準能被他人完整複製，而不是靠你親自到場。',
    },
    // strong = high urgency
    strong: {
      insight: '你有強烈的擴張意圖，但目前的經營模式高度綁定個人，品牌系統的缺乏正在成為你規模化的瓶頸。',
      problem: '沒有品牌系統的擴張是危險的——每一個新據點都在稀釋你的品質控制，而不是複製你的核心優勢。',
      recommendation: '品牌設計在此階段的優先順序極高：先把你能做到的標準化、視覺化、系統化，再啟動擴張。',
    },
  },
  conversion: {
    dimension: 'conversion',
    // weak = low urgency for conversion/web/social/space
    weak: {
      insight: '你的轉換現況相對穩定，客戶能從看見到成交的路徑基本暢通。',
      problem: '轉換的急迫性目前偏低，但若流量增加或品牌曝光擴大，轉換機制仍需要更系統性的設計來承接。',
      recommendation: '現在可以開始優化轉換細節，讓現有流量的成交率進一步提升。',
    },
    // medium = moderate urgency
    medium: {
      insight: '你的社群、空間或網站已開始發揮轉換作用，但仍有明顯的流失點在影響成效。',
      problem: '客戶已經看到你、也對你感興趣，但還在猶豫——這通常是信任感不足或下一步不夠清楚造成的。',
      recommendation: '優先強化最常被看到的接觸點的信任感設計，讓客戶在決定接觸你之前就已經建立足夠的安全感。',
    },
    // strong = high urgency
    strong: {
      insight: '你的轉換環境（社群、空間、網站）目前無法有效承接潛在客戶的興趣，是最直接影響你收入的問題。',
      problem: '有人看到你，但沒有採取行動——這不是客群問題，而是品牌接觸點沒有給出足夠的理由讓他們下一步。',
      recommendation: '立即投入轉換設計：空間、社群或網站三者中最多人接觸的那個，就是你現在最需要改造的地方。',
    },
  },
};
