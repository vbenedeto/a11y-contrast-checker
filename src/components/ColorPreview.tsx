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

const VisuallyHiddenLiveRegion = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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

      <VisuallyHiddenLiveRegion aria-live="polite">
        {`Text color set to ${foregroundHex}. Background color set to ${backgroundHex}.`}
      </VisuallyHiddenLiveRegion>
    </Section>
  )
}