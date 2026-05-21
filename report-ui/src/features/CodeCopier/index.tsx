import { useState } from "react";
import { Button } from "@shared/components/Button";

const COPY_FEEDBACK_DURATION_MS = 2000;

interface CodeCopierProps {
  code: string;
}

export function CodeCopier({ code }: CodeCopierProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
  };

  return (
    <Button variant="secondary" size="sm" onClick={handleCopy}>
      {copied ? "복사됨 ✓" : "복사"}
    </Button>
  );
}
