import { useReportStore } from "../../entities/report/model/store";
import { Card } from "../../shared/components/Card";
import { Badge } from "../../shared/components/Badge";
import { CodeCopier } from "../../features/CodeCopier";

export function AiPrescription() {
  const prescriptions = useReportStore((state) => state.reportData?.aiPrescriptions ?? []);

  if (prescriptions.length === 0) {
    return (
      <Card title="AI 처방전">
        <p className="text-sm text-gray-400">AI 처방 데이터가 없습니다.</p>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold text-gray-900">AI 처방전</h2>
      {prescriptions.map((prescription) => (
        <Card key={prescription.targetPackage}>
          <div className="space-y-4">
            <header className="flex items-center gap-2">
              <Badge label={prescription.targetPackage} variant="danger" />
              <span className="text-sm text-gray-500">최적화 제안</span>
            </header>

            <p className="text-sm text-gray-600">{prescription.reasoning}</p>

            {prescription.alternatives.length > 0 && (
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
                      {prescription.alternatives.map((alt) => (
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
            )}

            {prescription.vanillaSnippet && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Vanilla JS 대체 코드
                  </h4>
                  <CodeCopier code={prescription.vanillaSnippet} />
                </div>
                <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
                  <code>{prescription.vanillaSnippet}</code>
                </pre>
              </div>
            )}
          </div>
        </Card>
      ))}
    </section>
  );
}
