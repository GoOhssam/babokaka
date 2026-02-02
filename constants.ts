
import { Product } from './types';

export const HF_PRODUCTS: Product[] = [
  // --- 주택담보대출 (Mortgage) ---
  {
    id: 'didimdol',
    name: '내집마련 디딤돌대출',
    category: 'MORTGAGE',
    description: '무주택 서민을 위한 저금리 구입자금 대출입니다. 신혼부부나 다자녀 가구는 소득 요건이 완화됩니다.',
    incomeLimit: 6000, // 일반 6,000만원
    assetLimit: 46900, // 4.69억원 (2024년 기준)
    maxHomePrice: 50000, // 5억원 이하
  },
  {
    id: 'bogeumjari',
    name: '보금자리론',
    category: 'MORTGAGE',
    description: '약정 만기까지 고정금리가 적용되는 대표적인 상품입니다.',
    incomeLimit: 7000, // 일반 7,000만원
    maxHomePrice: 60000, // 6억원 이하
  },
  {
    id: 'conforming',
    name: '적격대출',
    category: 'MORTGAGE',
    description: '소득 제한이 없으며, 9억원 이하 주택에 대해 장기 고정금리를 제공합니다.',
    incomeLimit: Infinity, // 제한 없음
    maxHomePrice: 90000, // 9억원 이하
  },

  // --- 주택보증 (Guarantee) ---
  {
    id: 'jeonse_general',
    name: '일반 전세자금보증',
    category: 'GUARANTEE',
    description: '임차보증금의 80% 이내에서 보증을 제공하는 기본 전세 상품입니다.',
    incomeLimit: 10000, // 수도권/일반 기준 약 1억
  },
  {
    id: 'jeonse_newlywed',
    name: '신혼부부 전세특례보증',
    category: 'GUARANTEE',
    description: '혼인 7년 이내 신혼부부를 위한 우대 보증 상품입니다.',
    incomeLimit: 6000, // 실제로는 지자체별 상이하나 평균적 기준 설정
    isSpecialty: true
  },
  {
    id: 'youth_jeonse',
    name: '청년 전용 전세보증',
    category: 'GUARANTEE',
    description: '만 34세 이하 청년을 위한 저리 전세보증 상품입니다.',
    incomeLimit: 7000,
    minAge: 19, // 청년 기준 시작
  },

  // --- 주택연금 (Pension) ---
  {
    id: 'pension_standard',
    name: '주택연금 (일반형)',
    category: 'PENSION',
    description: '소유 주택을 담보로 평생 연금을 수령하는 상품입니다.',
    minAge: 55,
    maxHomePrice: 120000, // 12억원 이하
  },
  {
    id: 'pension_preferential',
    name: '우대형 주택연금',
    category: 'PENSION',
    description: '기초연금 수급자 등 취약계층에게 더 많은 연금을 지급합니다.',
    minAge: 65,
    incomeLimit: 2500, // 부부합산 2,500만원 이하
    maxHomePrice: 20000, // 2억원 이하
  }
];
