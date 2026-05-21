import { CodeCopier } from "@features/CodeCopier";

interface VanillaSnippetBlockProps {
  code: string;
}

export function VanillaSnippetBlock({ code }: VanillaSnippetBlockProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Vanilla JS 대체 코드
        </h4>
        <CodeCopier code={code} />
      </div>
      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
