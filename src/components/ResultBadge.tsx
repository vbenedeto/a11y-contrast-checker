import styled from "@emotion/styled";
import { Check, X } from "lucide-react";

type ResultBadgeProps = { label: string; passed: boolean };

const BadgeRow = styled.div<{ $passed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme, $passed }) =>
  $passed ? `${theme.colors.pass}1a` : `${theme.colors.fail}1a`};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text};
`;

const StatusGroup = styled.span<{ $passed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, $passed }) => ($passed ? theme.colors.pass : theme.colors.fail)};
`;


export function ResultBadge({ label, passed }: ResultBadgeProps) {
  return (
    <BadgeRow $passed={passed}>
      <Label>{label}</Label>
      <StatusGroup $passed={passed}>
        {passed ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
        {passed ? 'PASS' : 'FAIL'}
      </StatusGroup>
    </BadgeRow>
  );
}