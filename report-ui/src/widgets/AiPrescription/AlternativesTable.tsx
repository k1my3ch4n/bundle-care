import type { AlternativeLibrary } from "@entities/report/model/types";

interface AlternativesTableProps {
  alternatives: AlternativeLibrary[];
}

export function AlternativesTable({ alternatives }: AlternativesTableProps) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        대안 라이브러리
      </h4>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-600">라이브러리</th>
              <th className="px-3 py-2 text-right font-medium text-gray-600">크기</th>
              <th className="px-3 py-2 text-left font-medium text-gray-600">설명</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {alternatives.map((alt) => (
              <tr key={alt.name} className="hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-blue-600">{alt.name}</td>
                <td className="px-3 py-2 text-right text-gray-500">{alt.sizeKB} KB</td>
                <td className="px-3 py-2 text-gray-600">{alt.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
