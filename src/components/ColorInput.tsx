import { hexToRgb } from "@/lib/contrast";

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
    <fieldset>
      <legend>{label}</legend>

      <label htmlFor={pickerId}>Pick a color</label>
      <input 
        id={pickerId}
        type="color"
        value={isValid ? hexValue : '#000000'}
        onChange={(e) => onChange(e.target.value)} 
      />

      <label htmlFor={textId}>Hex Code</label>
      <input 
        id={textId}
        type="text"  
        value={hexValue}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={showError}
        aria-describedby={showError ? errorId : undefined}
      />

      {showError && (
        <p id={errorId} role="alert">
          Please enter a valid hex color, e.g. #ff5733
        </p>
      )}
    </fieldset>
  )
}