import type {
  DiagnosisQuestionDefinition,
  DiagnosisSection,
} from '@/features/diagnosis/scoring/types';
import imgA1 from '@/assets/A1.jpg';
import imgA2 from '@/assets/A2.jpg';
import imgB1 from '@/assets/B1.jpg';
import imgB2 from '@/assets/B2.jpg';
import imgC1 from '@/assets/C1.jpg';
import imgC2 from '@/assets/C2.jpg';

export const diagnosisQuestionBank: DiagnosisQuestionDefinition[] = [
  // ===== ① 品牌基礎（brand）=====
  {
    id: 'Q1',
    sectionId: 'brand',
    dimension: 'brand',
    type: 'single',
    weight: 2,
    question: '你希望未來的商業模式更接近：',
    options: [
      { id: 'Q1_A', label: '低毛利、拼價格、靠人力與量撐起來', score: 1 },
      { id: 'Q1_B', label: '有固定客群，靠熟客與口碑維持', score: 2 },
      { id: 'Q1_C', label: '有穩定定價與品質，逐步建立差異', score: 3 },
      { id: 'Q1_D', label: '商業模式穩定、省人力，甚至可複製或擴張', score: 4 },
    ],
  },
  {
    id: 'Q2',
    sectionId: 'brand',
    dimension: 'brand',
    type: 'single',
    weight: 1.5,
    question: '當競爭對手降價時，你通常：',
    options: [
      { id: 'Q2_A', label: '必須跟著降，不然沒客人', score: 4 },
      { id: 'Q2_B', label: '會調整，但盡量撐住', score: 3 },
      { id: 'Q2_C', label: '偶爾受影響，但還有其他優勢', score: 2 },
      { id: 'Q2_D', label: '幾乎不受影響，有自己的價值支撐', score: 1 },
    ],
  },
  {
    id: 'Q3',
    sectionId: 'brand',
    dimension: 'brand',
    type: 'single',
    weight: 2,
    question: '客戶選擇你的主要原因是：',
    options: [
      { id: 'Q3_A', label: '價格或方便', score: 4 },
      { id: 'Q3_B', label: '熟識或地緣關係', score: 3 },
      { id: 'Q3_C', label: '品質與服務', score: 2 },
      { id: 'Q3_D', label: '品牌信任與認同', score: 1 },
    ],
  },
  {
    id: 'Q4',
    sectionId: 'brand',
    dimension: 'brand',
    type: 'single',
    weight: 1,
    question: '你目前被客戶殺價的頻率：',
    options: [
      { id: 'Q4_A', label: '幾乎每次', score: 4 },
      { id: 'Q4_B', label: '很常發生', score: 3 },
      { id: 'Q4_C', label: '偶爾', score: 2 },
      { id: 'Q4_D', label: '幾乎沒有', score: 1 },
    ],
  },
  {
    id: 'Q5',
    sectionId: 'brand',
    dimension: 'brand',
    type: 'binary',
    weight: 1.5,
    question: '如果拿掉 logo，你的品牌還成立嗎？',
    options: [
      { id: 'Q5_A', label: '幾乎無法辨識', score: 4 },
      { id: 'Q5_B', label: '仍然可以被辨識', score: 1 },
    ],
  },

  // ===== ② 視覺與感知（visual）=====
  {
    id: 'Q6',
    sectionId: 'visual',
    dimension: 'visual',
    type: 'scenario',
    weight: 2,
    question: '兩個招牌造價相同，品項價格相同，你會走進哪一間？',
    options: [
      { id: 'Q6_A', label: '沒有設計感的招牌', score: 1, image: imgA1 },
      { id: 'Q6_B', label: '有品牌設計的招牌', score: 4, image: imgA2 },
    ],
  },
  {
    id: 'Q7',
    sectionId: 'visual',
    dimension: 'visual',
    type: 'scenario',
    weight: 2,
    question: '兩邊飲料印刷價格相同，飲品價格相同，你會拿起哪一杯?',
    options: [
      { id: 'Q7_A', label: '普通外觀', score: 1, image: imgB2 },
      { id: 'Q7_B', label: '有品牌設計與包裝', score: 4, image: imgB1 },
    ],
  },
  {
    id: 'Q8',
    sectionId: 'visual',
    dimension: 'visual',
    type: 'scenario',
    weight: 2,
    question: '兩個店面坪數與造價相同，服務項目單價相同，你會在哪間度過疲勞的下午?',
    options: [
      { id: 'Q8_A', label: '普通外觀', score: 1, image: imgC1 },
      { id: 'Q8_B', label: '有設計過的', score: 4, image: imgC2 },
    ],
  },
  {
    id: 'Q9',
    sectionId: 'visual',
    dimension: 'visual',
    type: 'single',
    weight: 1,
    question: '你想踏足的產業是否有你喜歡的品牌：',
    options: [
      { id: 'Q9_A', label: '幾乎沒有印象，都是路過購買', score: 1 },
      { id: 'Q9_B', label: '有一到兩個，但沒有人因為品牌選擇產品', score: 2 },
      { id: 'Q9_C', label: '我記得起來的都是有品牌的', score: 3 },
      { id: 'Q9_D', label: '這是一個需要信任感的產業', score: 4 },
    ],
  },
  {
    id: 'Q10',
    sectionId: 'visual',
    dimension: 'visual',
    type: 'single',
    weight: 1.5,
    question: '你常用的同類產品是否有（IG / 店面 / 官網）一致性：',
    options: [
      { id: 'Q10_A', label: '幾乎沒有一致性', score: 1 },
      { id: 'Q10_B', label: '有落差', score: 2 },
      { id: 'Q10_C', label: '大致一致', score: 3 },
      { id: 'Q10_D', label: '高度一致且有風格', score: 4 },
    ],
  },

  // ===== ③ 經營與擴張（growth）=====
  {
    id: 'Q11',
    sectionId: 'growth',
    dimension: 'growth',
    type: 'single',
    weight: 2,
    question: '你的理想經營狀態是：',
    options: [
      { id: 'Q11_A', label: '親力親為，所有事都要自己來', score: 1 },
      { id: 'Q11_B', label: '我在現場，客戶看的是我', score: 2 },
      { id: 'Q11_C', label: '系統能運作，我只做決策', score: 3 },
      { id: 'Q11_D', label: '我可以擴張或經營多個事業', score: 4 },
    ],
  },
  {
    id: 'Q12',
    sectionId: 'growth',
    dimension: 'growth',
    type: 'single',
    weight: 1.5,
    question: '如果你不在，生意會：',
    options: [
      { id: 'Q12_A', label: '幾乎無法運作', score: 4 },
      { id: 'Q12_B', label: '會明顯變差', score: 3 },
      { id: 'Q12_C', label: '基本能運作', score: 2 },
      { id: 'Q12_D', label: '幾乎不受影響', score: 1 },
    ],
  },
  {
    id: 'Q13',
    sectionId: 'growth',
    dimension: 'growth',
    type: 'single',
    weight: 1.5,
    question: '你的營運主要依賴：',
    options: [
      { id: 'Q13_A', label: '人', score: 4 },
      { id: 'Q13_B', label: '經驗', score: 3 },
      { id: 'Q13_C', label: '流程', score: 2 },
      { id: 'Q13_D', label: '系統', score: 1 },
    ],
  },
  {
    id: 'Q14',
    sectionId: 'growth',
    dimension: 'growth',
    type: 'single',
    weight: 1,
    question: '你是否有擴張計畫：',
    options: [
      { id: 'Q14_A', label: '沒有', score: 1 },
      { id: 'Q14_B', label: '有想過', score: 2 },
      { id: 'Q14_C', label: '正在規劃', score: 3 },
      { id: 'Q14_D', label: '已經在執行', score: 4 },
    ],
  },
  {
    id: 'Q15',
    sectionId: 'growth',
    dimension: 'growth',
    type: 'single',
    weight: 2,
    question: '目前最大的成長瓶頸是：',
    options: [
      { id: 'Q15_A', label: '沒客人', score: 1 },
      { id: 'Q15_B', label: '客人不穩定', score: 2 },
      { id: 'Q15_C', label: '無法提高價格', score: 3 },
      { id: 'Q15_D', label: '無法規模化', score: 4 },
    ],
  },

  // ===== ④ 轉換與現況（conversion）=====
  {
    id: 'Q16',
    sectionId: 'conversion',
    dimension: 'conversion',
    type: 'single',
    weight: 1.5,
    question: '你的社群或網站狀態：',
    options: [
      { id: 'Q16_A', label: '幾乎沒有', score: 4 },
      { id: 'Q16_B', label: '隨便經營', score: 3 },
      { id: 'Q16_C', label: '有規劃但不穩定', score: 2 },
      { id: 'Q16_D', label: '有策略且持續優化', score: 1 },
    ],
  },
  {
    id: 'Q17',
    sectionId: 'conversion',
    dimension: 'conversion',
    type: 'single',
    weight: 1.5,
    question: '你的空間（店面）目前：',
    options: [
      { id: 'Q17_A', label: '只求能用', score: 4 },
      { id: 'Q17_B', label: '普通裝潢', score: 3 },
      { id: 'Q17_C', label: '有設計但不完整', score: 2 },
      { id: 'Q17_D', label: '有品牌與體驗設計', score: 1 },
    ],
  },
  {
    id: 'Q18',
    sectionId: 'conversion',
    dimension: 'conversion',
    type: 'single',
    weight: 2,
    question: '客戶行為最接近：',
    options: [
      { id: 'Q18_A', label: '看了沒反應', score: 4 },
      { id: 'Q18_B', label: '會詢問但不成交', score: 3 },
      { id: 'Q18_C', label: '有成交但不穩定', score: 2 },
      { id: 'Q18_D', label: '穩定成交或回購', score: 1 },
    ],
  },
  {
    id: 'Q19',
    sectionId: 'conversion',
    dimension: 'conversion',
    type: 'single',
    weight: 1,
    question: '你是否清楚客戶為什麼選擇你：',
    options: [
      { id: 'Q19_A', label: '完全不知道', score: 4 },
      { id: 'Q19_B', label: '模糊', score: 3 },
      { id: 'Q19_C', label: '大致清楚', score: 2 },
      { id: 'Q19_D', label: '非常清楚', score: 1 },
    ],
  },
  {
    id: 'Q20',
    sectionId: 'conversion',
    dimension: 'conversion',
    type: 'single',
    weight: 2,
    question: '你目前問題最接近：',
    options: [
      { id: 'Q20_A', label: '缺客流', score: 1 },
      { id: 'Q20_B', label: '缺曝光', score: 2 },
      { id: 'Q20_C', label: '缺信任', score: 3 },
      { id: 'Q20_D', label: '缺系統', score: 4 },
    ],
  },
];

export const diagnosisSections: DiagnosisSection[] = [
  {
    id: 'brand',
    title: '概況與展望',
    description: '品牌並不只是一個LOGO或識別，系統性地維持好他，他就是解決問題的工具，最強且免費的金牌業務',
    questionIds: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
  },
  {
    id: 'visual',
    title: '消費者角度',
    description: '同樣投資50萬來開業，同樣的產品價格，為什麼他的來客數/成交數絡繹不絕?',
    questionIds: ['Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
  },
  {
    id: 'growth',
    title: '經營與擴張',
    description: '無可辯駁的是現今世代，用人力去賺錢已經不切實際，但你有規模化的底氣嗎?',
    questionIds: ['Q11', 'Q12', 'Q13', 'Q14', 'Q15'],
  },
  {
    id: 'conversion',
    title: '轉換與現況',
    description: '人是視覺動物，如果要花大量解釋成本去描述你的產品有多好，為何不讓他再被看到的第一眼就展現自己的品質?',
    questionIds: ['Q16', 'Q17', 'Q18', 'Q19', 'Q20'],
  },
];
