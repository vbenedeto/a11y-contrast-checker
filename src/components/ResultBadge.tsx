import { Check, X } from "lucide-react";

type ResultBadgeProps = { label: string; passed: boolean };

export function ResultBadge({ label, passed }: ResultBadgeProps) {
  return (
    <div>
      <span>{label}</span>
      <span>
        {passed ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
        {passed ? 'PASS' : 'FAIL'}
      </span>
    </div>
  );
}