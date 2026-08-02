import { ContrastResult } from "@/lib/contrast";
import { ResultBadge } from "./ResultBadge";
import styled from "@emotion/styled";

const Panel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const RatioDisplay = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const RatioLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMuted}; 
`;

const RatioValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const EmptyState = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;


export function ResultsPanel({ result }: { result : ContrastResult | null}) {
  if (!result) {
    return (
      <Panel aria-live="polite" aria-label="Contrast check results">
        <EmptyState>Enter valid colors to see results</EmptyState>
      </Panel>
    );
  }

  return (
    <Panel aria-live="polite">
      <h3>Contrast Results</h3>
      <RatioDisplay>
        <RatioLabel>Ratio: </RatioLabel>
        <RatioValue aria-label="Ratio:">{result.ratio.toFixed(2)}:1</RatioValue>
        
      </RatioDisplay>
      <ResultBadge label="Normal Text (AA)" passed={result.normalTextAA} />
      <ResultBadge label="Normal Text (AAA)" passed={result.normalTextAAA} />
      <ResultBadge label="Large Text (AA)" passed={result.largeTextAA} />
      <ResultBadge label="Large Text (AAA)" passed={result.largeTextAAA} />
      <ResultBadge label="UI components (AA)" passed={result.uiComponentAA} />
    </Panel>
  );
}