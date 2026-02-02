
import React from 'react';
import { UserCriteria } from '../types';

interface FilterBarProps {
  criteria: UserCriteria;
  setCriteria: React.Dispatch<React.SetStateAction<UserCriteria>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ criteria, setCriteria }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : Number(value);
    setCriteria(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 연소득 */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 ml-1">부부합산 연소득 (만원)</label>
        <div className="relative">
          <input
            name="income"
            type="number"
            step="500"
            value={criteria.income}
            onChange={handleChange}
            className="w-full bg-slate-50 px-4 py-3 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
            placeholder="예: 7000"
          />
          <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-bold">만원</span>
        </div>
      </div>

      {/* 순자산 */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 ml-1">가구 순자산 (만원)</label>
        <div className="relative">
          <input
            name="assets"
            type="number"
            step="1000"
            value={criteria.assets}
            onChange={handleChange}
            className="w-full bg-slate-50 px-4 py-3 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
            placeholder="예: 45000"
          />
          <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-bold">만원</span>
        </div>
      </div>

      {/* 주택가격 - 새로 추가됨 */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 ml-1">보유(예정) 주택가격 (만원)</label>
        <div className="relative">
          <input
            name="homePrice"
            type="number"
            step="1000"
            value={criteria.homePrice}
            onChange={handleChange}
            className="w-full bg-slate-50 px-4 py-3 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 border-blue-100"
            placeholder="예: 120000"
          />
          <span className="absolute right-4 top-3.5 text-blue-400 text-sm font-bold">만원</span>
        </div>
      </div>

      {/* 연령 */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 ml-1">가구주 연령 (세)</label>
        <input
          name="age"
          type="number"
          value={criteria.age}
          onChange={handleChange}
          className="w-full bg-slate-50 px-4 py-3 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
        />
      </div>

      {/* 우대 조건 */}
      <div className="space-y-2 lg:col-span-2">
        <label className="text-xs font-bold text-slate-500 ml-1">기타 가구 요건</label>
        <div className="flex gap-2 h-[52px]">
           <button
             onClick={() => setCriteria(prev => ({ ...prev, isNewlywed: !prev.isNewlywed }))}
             className={`flex-1 rounded-2xl border-2 font-bold text-xs transition-all ${
               criteria.isNewlywed 
               ? 'border-blue-600 bg-blue-50 text-blue-700' 
               : 'border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100'
             }`}
           >
             신혼부부 (7년 이내)
           </button>
           <button
             onClick={() => setCriteria(prev => ({ ...prev, hasChildren: !prev.hasChildren }))}
             className={`flex-1 rounded-2xl border-2 font-bold text-xs transition-all ${
               criteria.hasChildren 
               ? 'border-blue-600 bg-blue-50 text-blue-700' 
               : 'border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100'
             }`}
           >
             다자녀 가구 (2인 이상)
           </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
