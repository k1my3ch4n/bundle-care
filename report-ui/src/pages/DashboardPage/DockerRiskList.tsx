import { Badge } from "@shared/components/Badge";
import type { DockerRisk } from "@entities/report/model/types";

interface DockerRiskListProps {
  risks: DockerRisk[];
}

export function DockerRiskList({ risks }: DockerRiskListProps) {
  return (
    <ul className="divide-y divide-gray-100">
      {risks.map((risk) => (
        <li key={risk.packageName} className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-2">
            <Badge
              label={risk.location === "devDependencies" ? "devDep" : "dep"}
              variant="warning"
            />
            <span className="text-sm font-medium text-gray-900">{risk.packageName}</span>
            <span className="text-xs text-gray-400">{risk.reason}</span>
          </div>
          <span className="text-sm font-medium text-red-600">{risk.sizeKB} KB</span>
        </li>
      ))}
    </ul>
  );
}
