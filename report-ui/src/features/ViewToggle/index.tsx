import { useIsFsdProject, useViewMode, useSetViewMode } from "@entities/report/model/hooks";
import type { ViewMode } from "@entities/report/model/store";

const VIEW_OPTIONS: { label: string; value: ViewMode }[] = [
  { label: "번들 트리맵", value: "default" },
  { label: "FSD 아키텍처", value: "fsd" },
];

export function ViewToggle() {
  const viewMode = useViewMode();
  const setViewMode = useSetViewMode();
  const isFsdProject = useIsFsdProject();

  if (!isFsdProject) {
    return null;
  }

  return (
    <nav aria-label="뷰 전환" className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
      {VIEW_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => setViewMode(option.value)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            viewMode === option.value
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {option.label}
        </button>
      ))}
    </nav>
  );
}
