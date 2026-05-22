import { useAiPrescriptions } from "@entities/report/model/hooks";
import { Card } from "@shared/components/Card";
import { Badge } from "@shared/components/Badge";
import { AlternativesTable } from "./AlternativesTable";
import { VanillaSnippetBlock } from "./VanillaSnippetBlock";

export function AiPrescription() {
  const prescriptions = useAiPrescriptions();

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
              <AlternativesTable alternatives={prescription.alternatives} />
            )}

            {prescription.vanillaSnippet && (
              <VanillaSnippetBlock code={prescription.vanillaSnippet} />
            )}
          </div>
        </Card>
      ))}
    </section>
  );
}
