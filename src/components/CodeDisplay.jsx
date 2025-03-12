import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export function CodeDisplay({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Example Code</h2>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
          >
            {copied ? "Copied!" : "Copy Code"}
          </Button>
        </div>
        <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded border border-gray-200 dark:border-gray-800 overflow-x-auto">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
