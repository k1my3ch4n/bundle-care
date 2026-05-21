import { useEffect, useRef } from "react";
import * as d3Hierarchy from "d3-hierarchy";
import { useReportStore } from "../../entities/report/model/store";
import { buildTree } from "../../shared/utils/buildTree";
import type { ChunkInfo } from "../../entities/report/model/types";

const COLORS = [
  "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899",
  "#f59e0b", "#10b981", "#06b6d4", "#f97316",
];

interface TreemapProps {
  width?: number;
  height?: number;
}

export function BundleTreemap({ width = 800, height = 480 }: TreemapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reportData = useReportStore((state) => state.reportData);
  const selectedChunkName = useReportStore((state) => state.selectedChunkName);
  const setSelectedChunkName = useReportStore((state) => state.setSelectedChunkName);

  const selectedChunk: ChunkInfo | null =
    reportData?.chunks.find((chunk) => chunk.name === selectedChunkName) ?? null;

  const allModules = selectedChunk
    ? selectedChunk.modules
    : reportData?.chunks.flatMap((chunk) => chunk.modules) ?? [];

  useEffect(() => {
    if (!containerRef.current || allModules.length === 0) {
      return;
    }

    const container = containerRef.current;
    container.innerHTML = "";

    const treeData = buildTree(allModules);
    const root = d3Hierarchy
      .hierarchy(treeData)
      .sum((node) => node.size)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    d3Hierarchy.treemap<typeof treeData>().size([width, height]).padding(2)(root);

    const leaves = root.leaves() as d3Hierarchy.HierarchyRectangularNode<typeof treeData>[];

    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("width", String(width));
    svgEl.setAttribute("height", String(height));

    leaves.forEach((leaf, index) => {
      const nodeWidth = leaf.x1 - leaf.x0;
      const nodeHeight = leaf.y1 - leaf.y0;
      if (nodeWidth < 2 || nodeHeight < 2) {
        return;
      }

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("transform", `translate(${leaf.x0},${leaf.y0})`);

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", String(nodeWidth));
      rect.setAttribute("height", String(nodeHeight));
      rect.setAttribute("fill", COLORS[index % COLORS.length]);
      rect.setAttribute("fill-opacity", "0.8");
      rect.setAttribute("stroke", "#fff");
      rect.setAttribute("stroke-width", "1");
      rect.style.cursor = "pointer";

      const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.textContent = `${leaf.data.path}\n${((leaf.value ?? 0) / 1024).toFixed(1)} KB`;
      g.appendChild(title);
      g.appendChild(rect);

      if (nodeWidth > 40 && nodeHeight > 20) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", String(nodeWidth / 2));
        text.setAttribute("y", String(nodeHeight / 2));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("fill", "#fff");
        text.setAttribute("font-size", "11");
        text.setAttribute("font-weight", "500");
        text.textContent =
          leaf.data.name.length > 20 ? leaf.data.name.slice(0, 18) + "…" : leaf.data.name;
        g.appendChild(text);
      }

      svgEl.appendChild(g);
    });

    container.appendChild(svgEl);
  }, [allModules, width, height]);

  if (!reportData) {
    return (
      <section className="flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-300">
        <p className="text-sm text-gray-400">데이터가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedChunkName(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            selectedChunkName === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          전체
        </button>
        {reportData.chunks.map((chunk) => (
          <button
            key={chunk.name}
            onClick={() => setSelectedChunkName(chunk.name)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedChunkName === chunk.name
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {chunk.name}
          </button>
        ))}
      </div>
      <div ref={containerRef} className="overflow-hidden rounded-lg" />
    </section>
  );
}
