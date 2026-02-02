
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Product, MindMapNode } from '../types';
import { AlertCircle } from 'lucide-react';

interface MindMapProps {
  products: Product[];
  onNodeClick: (product: Product) => void;
}

const MindMap: React.FC<MindMapProps> = ({ products, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous elements
    const svgArea = d3.select(svgRef.current);
    svgArea.selectAll("*").remove();

    const width = 800;
    const height = 500;

    // Build hierarchy only for categories with products
    const categories = [
      { id: 'cat_mortgage', name: '주택담보대출', type: 'MORTGAGE' as const },
      { id: 'cat_guarantee', name: '주택보증', type: 'GUARANTEE' as const },
      { id: 'cat_pension', name: '주택연금', type: 'PENSION' as const }
    ].map(cat => ({
      ...cat,
      children: products
        .filter(p => p.category === cat.type)
        .map(p => ({
          id: p.id,
          name: p.name,
          type: cat.type,
          productData: p
        }))
    })).filter(cat => cat.children.length > 0);

    const data: MindMapNode = {
      id: 'root',
      name: 'HF 금융상품',
      type: 'ROOT',
      children: categories
    };

    const g = svgArea
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", "translate(120, 0)");

    const tree = d3.tree<MindMapNode>().size([height - 60, width - 350]);
    const root = d3.hierarchy(data);
    tree(root);

    // --- 직선 브랜치 그리기 ---
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("line") // path 대신 line 사용
      .attr("class", "link")
      .attr("x1", d => d.source.y)
      .attr("y1", d => d.source.x)
      .attr("x2", d => d.target.y)
      .attr("y2", d => d.target.x)
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", 2);

    // Nodes
    const nodes = g.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .style("cursor", d => d.data.productData ? "pointer" : "default")
      .on("click", (event, d) => {
        if (d.data.productData) onNodeClick(d.data.productData);
      });

    // Circle styling
    nodes.append("circle")
      .attr("r", d => d.depth === 0 ? 8 : d.depth === 1 ? 5 : 4)
      .attr("fill", d => {
        if (d.data.type === 'ROOT') return "#1e293b";
        if (d.data.type === 'MORTGAGE') return "#3b82f6";
        if (d.data.type === 'GUARANTEE') return "#10b981";
        if (d.data.type === 'PENSION') return "#f59e0b";
        return "#94a3b8";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Labels
    const labels = nodes.append("text")
      .attr("dy", ".35em")
      .attr("x", d => d.children ? -15 : 15)
      .style("text-anchor", d => d.children ? "end" : "start")
      .style("font-size", d => d.depth === 0 ? "14px" : "12px")
      .style("font-weight", d => d.depth < 2 ? "700" : "600")
      .style("fill", "#334155")
      .text(d => d.data.name);

    // Text halo for clarity
    labels.clone(true).lower()
      .attr("stroke", "white")
      .attr("stroke-width", 4);

  }, [products, onNodeClick]);

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative p-4">
      <div className="absolute top-6 left-8">
        <h2 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-1">Interactive Map</h2>
        <p className="text-xl font-bold text-slate-800">직선형 마인드맵</p>
      </div>
      <svg ref={svgRef} className="w-full h-[500px]"></svg>
      {products.length === 0 && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
           <AlertCircle className="text-slate-300 mb-2" size={40} />
           <p className="text-slate-500 font-bold">조건에 맞는 상품이 없습니다.</p>
           <p className="text-slate-400 text-sm">입력하신 소득, 자산, 주택가격을 확인해 보세요.</p>
        </div>
      )}
    </div>
  );
};

export default MindMap;
