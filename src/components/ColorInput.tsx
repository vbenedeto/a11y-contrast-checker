import { hexToRgb } from "@/lib/contrast";
import styled from "@emotion/styled";

const StyledFieldset = styled.fieldset`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius:  ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  legend {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    padding: 0 ${({ theme }) => theme.spacing.xs};
  }
`
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

const ColorSwatch = styled.input`
  width: 48px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  padding: 2px;
  background: transparent;
`;

const TextField = styled.input<{ $isInvalid: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme, $isInvalid }) => ($isInvalid ? theme.colors.fail : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.fail};
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

type ColorInputProps = {
  id: string;
  label: string;
  hexValue: string;
  onChange: (newHex: string) => void;
}

export function ColorInput({ id, label, hexValue, onChange }: ColorInputProps) {
  const pickerId = `${id}-picker`;
  const textId = `${id}-text`;
  const errorId = `${id}-error`;

  const isValid = hexToRgb(hexValue) !== null;
  const showError = hexValue.length > 0 && !isValid;

  return (
    <StyledFieldset>
      <legend>{label}</legend>

      <Row>
        <Label htmlFor={pickerId}>Pick a color</Label>
      <ColorSwatch 
        id={pickerId}
        type="color"
        value={isValid ? hexValue : '#000000'}
        onChange={(e) => onChange(e.target.value)} 
      />

      <Label htmlFor={textId}>Hex Code</Label>
      <TextField 
        id={textId}
        type="text"  
        value={hexValue}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={showError}
        aria-describedby={showError ? errorId : undefined}
        $isInvalid={showError}
      />
      </Row>
      
      {showError && (
        <ErrorText id={errorId} role="alert">
          Please enter a valid hex color, e.g. #ff5733
        </ErrorText>
      )}
    </StyledFieldset>
  )
}