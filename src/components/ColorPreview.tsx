import styled from "@emotion/styled";

type ColorPreviewProps = {
  foregroundHex: string;
  backgroundHex: string;
}

const Section = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const PreviewBox = styled.div<{ $currentBg: string, $currentFg: string }>`
  background-color: ${({ $currentBg }) => $currentBg || '#000000'};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};

  p {
    color: ${({ $currentFg }) => $currentFg || '#000000'};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: bold;
    text-align: center;
  }
`

export function ColorPreview({ foregroundHex, backgroundHex}: ColorPreviewProps) {
  return (
    <Section>
      <h3>Live Preview</h3>

      <PreviewBox
        $currentBg={backgroundHex}
        $currentFg={foregroundHex}
        aria-label={`Preview of text color ${foregroundHex} on background color ${backgroundHex}`}
      >
        <p aria-hidden="true">Sample Text</p>
      </PreviewBox>
    </Section>
  )
}