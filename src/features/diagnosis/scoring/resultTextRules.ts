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
  critical: {
    minPercentage: 0,
    maxPercentage: 34,
    summary:
      '目前品牌基礎仍偏脆弱，客戶看到的訊息、差異與信任證據不足，短期內會直接影響詢問與成交。',
  },
  fragile: {
    minPercentage: 35,
    maxPercentage: 54,
    summary:
      '品牌已經有一些雛形，但關鍵面向仍不穩，容易讓市場認知斷裂，導致成效不上不下。',
  },
  stable: {
    minPercentage: 55,
    maxPercentage: 74,
    summary:
      '品牌整體已有穩定基礎，但若要提升市場表現，還需要持續強化最弱面向與轉換效率。',
  },
  strong: {
    minPercentage: 75,
    maxPercentage: 100,
    summary:
      '品牌成熟度良好，已具備清楚結構與市場辨識度，下一步是放大優勢並持續優化轉換。',
  },
};

export const dimensionTextRules: Record<
  DiagnosisDimensionKey,
  DimensionTextRule
> = {
  brand_clarity: {
    dimension: 'brand_clarity',
    weak: {
      insight: '品牌清晰度不足，團隊與市場可能都還無法快速理解你到底是誰、服務誰。',
      problem: '品牌定義模糊時，內容、廣告與銷售說法很容易分散，降低整體效率。',
      recommendation: '優先整理一句話定位、核心客群與不服務對象，讓品牌說法先收斂。',
    },
    medium: {
      insight: '品牌已有基本輪廓，但還沒有清楚到能成為穩定決策依據。',
      problem: '目前品牌說法可能能理解，但還不足以形成清楚記憶。',
      recommendation: '把品牌定位與客群理解整理成固定對外說法，降低團隊各講各的情況。',
    },
    strong: {
      insight: '品牌清晰度表現穩定，市場更容易理解你提供什麼價值。',
      problem: '後續風險不是不清楚，而是沒有持續把清楚的定位貫徹到所有接觸點。',
      recommendation: '把既有定位持續應用到內容、頁面與銷售場景，維持一致輸出。',
    },
  },
  visual_consistency: {
    dimension: 'visual_consistency',
    weak: {
      insight: '視覺一致性不足，品牌接觸點之間的落差可能正在削弱專業感。',
      problem: '缺乏規範或模板時，客戶很難累積穩定的品牌印象。',
      recommendation: '先建立基礎視覺規範與常用模板，讓日常輸出不要再靠個人感覺。',
    },
    medium: {
      insight: '視覺系統已有一定秩序，但跨通路執行時仍可能出現偏差。',
      problem: '品牌識別雖存在，但落地執行還不夠穩。',
      recommendation: '補足品牌手冊與素材模板，把執行標準從參考值提升為規範。',
    },
    strong: {
      insight: '視覺一致性良好，品牌辨識度能在主要接觸點被穩定累積。',
      problem: '接下來的風險不是混亂，而是系統長期未更新而逐漸僵化。',
      recommendation: '維持規範穩定，同時安排週期性檢查，確保系統能跟著品牌成長。',
    },
  },
  differentiation: {
    dimension: 'differentiation',
    weak: {
      insight: '市場差異不夠明顯，客戶很可能只剩價格可以比較。',
      problem: '當品牌差異化不足時，行銷成本通常會越來越高，轉換品質卻不一定提升。',
      recommendation: '重新釐清最能被市場感知的差異點，並把它變成對外主張核心。',
    },
    medium: {
      insight: '品牌已有一些差異，但還沒有強到能穩定被市場記住。',
      problem: '差異點可能只停留在內部認知，還沒轉化成客戶能直接感受到的證據。',
      recommendation: '把品牌差異化轉成更具體的語言、案例與視覺證據，提升辨識度。',
    },
    strong: {
      insight: '品牌差異化表現不錯，客戶更容易感受到你與競品的不同。',
      problem: '後續關鍵在於持續放大優勢，而不是回到空泛宣稱。',
      recommendation: '持續把差異化放進廣告、文案與頁面結構，讓優勢被反覆看見。',
    },
  },
  conversion_trust: {
    dimension: 'conversion_trust',
    weak: {
      insight: '轉換與信任面向偏弱，品牌可能還無法有效降低客戶猶豫。',
      problem: '即使有流量，若信任證據不足，客戶仍可能不敢詢問或下單。',
      recommendation: '優先補足案例、評價、保證與常見疑慮處理，讓品牌更值得相信。',
    },
    medium: {
      insight: '品牌已有基本信任基礎，但轉換阻力還沒有被完全處理。',
      problem: '客戶可能看得懂你是誰，卻還沒有足夠理由立刻行動。',
      recommendation: '強化頁面上的信任證據與 CTA 設計，並主動回應常見猶豫點。',
    },
    strong: {
      insight: '品牌已能穩定建立信任，並支撐後續詢問與成交。',
      problem: '下一步不是補基本信任，而是持續優化每個關鍵轉換環節。',
      recommendation: '定期檢查轉換流程中的摩擦點，讓信任優勢真正轉成業績。',
    },
  },
};
