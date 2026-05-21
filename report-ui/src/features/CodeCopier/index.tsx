import { useState } from "react";
import { Button } from "../../shared/components/Button";

interface CodeCopierProps {
  code: string;
}

export function CodeCopier({ code }: CodeCopierProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="secondary" size="sm" onClick={handleCopy}>
      {copied ? "복사됨 ✓" : "복사"}
    </Button>
  );
}
