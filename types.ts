
export type Category = 'MORTGAGE' | 'GUARANTEE' | 'PENSION' | 'ROOT';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  incomeLimit?: number; // In 10k KRW (만원)
  assetLimit?: number;  // In 10k KRW (만원)
  minAge?: number;
  maxHomePrice?: number; // In 10k KRW (만원)
  isSpecialty?: boolean;
}

export interface UserCriteria {
  income: number;    // 만원
  assets: number;    // 만원
  age: number;
  homePrice: number; // 만원
  isNewlywed: boolean;
  hasChildren: boolean;
}

export interface MindMapNode {
  id: string;
  name: string;
  type: Category;
  children?: MindMapNode[];
  isFiltered?: boolean;
  productData?: Product;
}
