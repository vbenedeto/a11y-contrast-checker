import { ContrastResult } from "@/lib/contrast";
import { ResultBadge } from "./ResultBadge";

export function ResultsPanel({ result }: { result : ContrastResult | null}) {
  if (!result) return <p>Enter valid colors to see results</p>

  return (
    <div aria-live="polite">
      <p>Contrast Ratio: {result.ratio.toFixed(2)}:1</p>
      <ResultBadge label="Normal Text (AA)" passed={result.normalTextAA} />
      <ResultBadge label="Normal Text (AAA)" passed={result.normalTextAAA} />
      <ResultBadge label="Large Text (AA)" passed={result.largeTextAA} />
      <ResultBadge label="Large Text (AAA)" passed={result.largeTextAAA} />
      <ResultBadge label="UI components (AA)" passed={result.uiComponentAA} />
    </div>
  )
}