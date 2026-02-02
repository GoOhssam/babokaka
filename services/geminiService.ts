
import { GoogleGenAI } from "@google/genai";
import { Product, UserCriteria } from "../types";

export const getFinancialAdvice = async (eligibleProducts: Product[], criteria: UserCriteria) => {
  // Always initialize with process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const productNames = eligibleProducts.map(p => p.name).join(', ');
  const prompt = `
    사용자 조건:
    - 연소득: ${criteria.income}만원
    - 순자산: ${criteria.assets}만원
    - 연령: ${criteria.age}세
    - 주택가격: ${criteria.homePrice}만원
    - 신혼부부 여부: ${criteria.isNewlywed ? '예' : '아니오'}
    - 다자녀 여부: ${criteria.hasChildren ? '예' : '아니오'}

    사용자가 신청 가능한 HF(한국주택금융공사) 상품들: ${productNames}

    위 조건과 상품들을 바탕으로 사용자에게 가장 적합한 금융상품 1-2개를 추천하고 그 이유를 짧고 친절하게 설명해줘. 
    마크다운 형식을 사용하고, 전문적인 용어보다는 이해하기 쉬운 용어로 설명해줘.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Advice Error:", error);
    return "AI 분석 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.";
  }
};
