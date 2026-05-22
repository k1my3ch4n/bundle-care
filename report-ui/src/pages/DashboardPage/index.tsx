import { useReportData, useViewMode } from "@entities/report/model/hooks";
import { BundleTreemap } from "@widgets/BundleTreemap";
import { AiPrescription } from "@widgets/AiPrescription";
import { ViewToggle } from "@features/ViewToggle";
import { FsdArchitectureView } from "@widgets/FsdArchitectureView";
import { Card } from "@shared/components/Card";
import { Badge } from "@shared/components/Badge";
import { DockerRiskList } from "./DockerRiskList";
import { TreeshakingLeakList } from "./TreeshakingLeakList";

export function DashboardPage() {
  const reportData = useReportData();
  const viewMode = useViewMode();

  if (!reportData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-400">데이터를 불러오는 중...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-gray-900">BndlCare Report</h1>
            <Badge label={reportData.projectName} variant="info" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{reportData.generatedAt}</span>
            <ViewToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        <section className="grid grid-cols-3 gap-4">
          <Card title="총 번들 크기">
            <p className="text-2xl font-bold text-gray-900">
              {reportData.totalBundleSizeKB.toFixed(1)}{" "}
              <span className="text-base font-normal text-gray-500">KB</span>
            </p>
          </Card>
          <Card title="Docker 위험 패키지">
            <p className="text-2xl font-bold text-red-600">
              {reportData.dockerRisks.length}
              <span className="text-base font-normal text-gray-500"> 개</span>
            </p>
          </Card>
          <Card title="Tree-shaking 누수">
            <p className="text-2xl font-bold text-yellow-600">
              {reportData.treeshakingLeaks.length}
              <span className="text-base font-normal text-gray-500"> 개</span>
            </p>
          </Card>
        </section>

        <Card title={viewMode === "fsd" ? "FSD 아키텍처 분석" : "번들 트리맵"}>
          {viewMode === "fsd" ? <FsdArchitectureView /> : <BundleTreemap width={1100} height={480} />}
        </Card>

        {reportData.dockerRisks.length > 0 && (
          <Card title="Docker 리스크">
            <DockerRiskList risks={reportData.dockerRisks} />
          </Card>
        )}

        {reportData.treeshakingLeaks.length > 0 && (
          <Card title="Tree-shaking 누수">
            <TreeshakingLeakList leaks={reportData.treeshakingLeaks} />
          </Card>
        )}

        <AiPrescription />
      </div>
    </main>
  );
}
