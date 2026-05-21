import { useEffect, useRef } from "react";
import * as d3Hierarchy from "d3-hierarchy";
import {
  useReportData,
  useSelectedChunkName,
  useSetSelectedChunkName,
} from "@entities/report/model/hooks";
import { buildTree } from "@shared/utils/buildTree";
import { createSVGElement, truncateLabel } from "@shared/utils/svgHelper";
import type { ChunkInfo } from "@entities/report/model/types";

const TREEMAP_COLORS = [
  "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899",
  "#f59e0b", "#10b981", "#06b6d4", "#f97316",
];

const MIN_NODE_WIDTH = 40;
const MIN_NODE_HEIGHT = 20;
const LABEL_FONT_SIZE = "11";

interface TreemapProps {
  width?: number;
  height?: number;
}

export function BundleTreemap({ width = 800, height = 480 }: TreemapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reportData = useReportData();
  const selectedChunkName = useSelectedChunkName();
  const setSelectedChunkName = useSetSelectedChunkName();

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

    const svgEl = createSVGElement("svg", {
      width: String(width),
      height: String(height),
    });

    leaves.forEach((leaf, index) => {
      const nodeWidth = leaf.x1 - leaf.x0;
      const nodeHeight = leaf.y1 - leaf.y0;
      if (nodeWidth < 2 || nodeHeight < 2) {
        return;
      }

      const g = createSVGElement("g", {
        transform: `translate(${leaf.x0},${leaf.y0})`,
      });

      const rect = createSVGElement("rect", {
        width: String(nodeWidth),
        height: String(nodeHeight),
        fill: TREEMAP_COLORS[index % TREEMAP_COLORS.length],
        "fill-opacity": "0.8",
        stroke: "#fff",
        "stroke-width": "1",
      });
      rect.style.cursor = "pointer";

      const titleEl = createSVGElement("title", {});
      titleEl.textContent = `${leaf.data.path}\n${((leaf.value ?? 0) / 1024).toFixed(1)} KB`;

      g.appendChild(titleEl);
      g.appendChild(rect);

      if (nodeWidth > MIN_NODE_WIDTH && nodeHeight > MIN_NODE_HEIGHT) {
        const text = createSVGElement("text", {
          x: String(nodeWidth / 2),
          y: String(nodeHeight / 2),
          "text-anchor": "middle",
          "dominant-baseline": "middle",
          fill: "#fff",
          "font-size": LABEL_FONT_SIZE,
          "font-weight": "500",
        });
        text.textContent = truncateLabel(leaf.data.name);
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
