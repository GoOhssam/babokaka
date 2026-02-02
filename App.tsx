
import React, { useState, useMemo } from 'react';
import { HF_PRODUCTS } from './constants';
import { UserCriteria, Product } from './types';
import FilterBar from './components/FilterBar';
import MindMap from './components/MindMap';
import { Search, Info, CheckCircle2, AlertCircle, Building2, Wallet, Home, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [criteria, setCriteria] = useState<UserCriteria>({
    income: 3000,
    assets: 20000,
    age: 35,
    homePrice: 50000, 
    isNewlywed: false,
    hasChildren: false,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // --- 시스템 내부 필터링 엔진 ---
  const filteredProducts = useMemo(() => {
    return HF_PRODUCTS.filter(product => {
      // 1. 소득 요건 체크
      let effectiveIncomeLimit = product.incomeLimit || Infinity;
      if (product.id === 'didimdol' && (criteria.isNewlywed || criteria.hasChildren)) {
        effectiveIncomeLimit = 8500;
      }
      if (product.id === 'bogeumjari' && (criteria.isNewlywed || criteria.hasChildren)) {
        effectiveIncomeLimit = 8500;
      }
      if (criteria.income > effectiveIncomeLimit) return false;

      // 2. 자산 요건 체크
      if (product.assetLimit && criteria.assets > product.assetLimit) return false;

      // 3. 연령 요건 체크
      if (product.minAge && criteria.age < product.minAge) return false;

      // 4. 주택가격 요건 체크 (주택연금 12억 등 핵심 필터)
      if (product.maxHomePrice && criteria.homePrice > product.maxHomePrice) return false;

      // 5. 특정 조건 체크
      if (product.id === 'jeonse_newlywed' && !criteria.isNewlywed) return false;

      return true;
    });
  }, [criteria]);

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 lg:px-12 bg-[#f8fafc]">
      <header className="py-8 max-w-7xl mx-auto border-b border-slate-200 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="text-blue-600" size={28} />
              <h1 className="text-2xl font-black text-slate-900">HF 금융상품 내비게이터</h1>
            </div>
            <p className="text-slate-500 font-medium">실시간 필터링 시스템: 자격 요건에 부합하는 상품만 마인드맵에 표시됩니다.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white px-4 py-2 rounded-xl border border-blue-100 shadow-sm flex items-center gap-3">
                <Home className="text-blue-500" size={20} />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">보유/예정 주택가격</p>
                  <p className="text-sm font-bold text-slate-700">{criteria.homePrice.toLocaleString()}만원</p>
                </div>
             </div>
             <div className="bg-white px-4 py-2 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={20} />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">가용 상품 수</p>
                  <p className="text-sm font-bold text-slate-700">{filteredProducts.length}건</p>
                </div>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-tighter">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              내 조건 설정
            </h3>
            <FilterBar criteria={criteria} setCriteria={setCriteria} />
          </section>
          
          <section>
            <MindMap products={filteredProducts} onNodeClick={setSelectedProduct} />
          </section>
        </div>

        {/* --- 상품 상세 정보란 --- */}
        <div className="lg:col-span-4">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-50 sticky top-8 transition-all">
            <div className="flex items-center gap-2 mb-8 border-b border-slate-50 pb-4">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Info className="text-blue-500" size={18} />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">상품 상세 정보</h3>
            </div>
            
            {selectedProduct ? (
              <div className="space-y-6">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className={`text-[10px] font-black tracking-widest px-2 py-0.5 rounded uppercase ${
                      selectedProduct.category === 'MORTGAGE' ? 'bg-blue-100 text-blue-600' :
                      selectedProduct.category === 'GUARANTEE' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {selectedProduct.category === 'MORTGAGE' ? '주택담보대출' :
                       selectedProduct.category === 'GUARANTEE' ? '주택보증' : '주택연금'}
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 leading-tight">{selectedProduct.name}</h4>
                </div>
                
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative">
                  <div className="absolute -top-3 left-4 bg-white px-2 py-1 border border-slate-100 rounded-md text-[10px] font-bold text-slate-400 uppercase">Description</div>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">
                    {selectedProduct.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                    <ChevronRight size={14} className="text-blue-500" />
                    가입 자격 검토 결과
                  </h5>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProduct.incomeLimit && (
                      <div className="flex justify-between items-center p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500">연소득 조건</span>
                        <span className="text-sm font-bold text-slate-900">
                          {selectedProduct.incomeLimit === Infinity ? "제한없음" : `연 ${selectedProduct.incomeLimit.toLocaleString()}만원 이하`}
                        </span>
                      </div>
                    )}
                    {selectedProduct.maxHomePrice && (
                      <div className="flex justify-between items-center p-3.5 rounded-2xl bg-blue-50/40 border border-blue-100 shadow-sm">
                        <span className="text-xs font-bold text-blue-600">주택가격 제한</span>
                        <span className="text-sm font-bold text-blue-900">{selectedProduct.maxHomePrice.toLocaleString()}만원 이하</span>
                      </div>
                    )}
                    {selectedProduct.assetLimit && (
                      <div className="flex justify-between items-center p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500">순자산 제한</span>
                        <span className="text-sm font-bold text-slate-900">순자산 {selectedProduct.assetLimit.toLocaleString()}만원 이하</span>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => window.open('https://www.hf.go.kr', '_blank')}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  상세 페이지에서 신청하기
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                  <Search className="text-slate-200" size={32} />
                </div>
                <div>
                  <p className="text-slate-800 font-bold">선택된 상품 없음</p>
                  <p className="text-slate-400 text-sm mt-1">마인드맵의 끝 노드를 클릭하여<br/>상품 정보를 확인하세요.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
