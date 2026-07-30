import { rgbToHex } from "@/lib/contrast";
import styled from "@emotion/styled";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";

type PickTarget = 'foreground' | 'background';

type ImageColorPickerProps = {
  onForegroundPick: (hex: string) => void;
  onBackgroundPick: (hex: string) => void;
};

const Container = styled.fieldset`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  legend {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    padding: 0 ${({ theme }) => theme.spacing.xs};
  }
`;

const UploadRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  label {
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const VisuallyHidden = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textMuted};

  label {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    cursor: pointer;
  }

  input[type="radio"] {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledCanvas = styled.canvas<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  max-width: 100%;
   height: auto;
  max-width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: crosshair;
`;

export function ImageColorPicker({ onForegroundPick, onBackgroundPick }: ImageColorPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pickTarget, setPickTarget] = useState<PickTarget>('foreground');
  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file);

    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      setImageLoaded(true);
    };
    img.src = URL.createObjectURL(file);
  }

  function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex({ r: pixel[0], g: pixel[1], b: pixel[2] });

    if (pickTarget === 'foreground') {
      onForegroundPick(hex);
    } else {
      onBackgroundPick(hex);
    }
  }

  return (
    <Container>
      <legend>Pick Colors from an Image</legend>

      <UploadRow>
        <VisuallyHidden htmlFor="image-upload">
          Upload an image
        </VisuallyHidden>
        <input id="image-upload" type="file" accept="image/*" 
        onChange={handleFileChange} />
      </UploadRow>

      {imageLoaded && (
        <RadioGroup role="radiogrup" aria-label="Choose which color you're picking">
          <label htmlFor="radio-foreground">
            <input 
              id="radio-foreground"
              type="radio" 
              name="pick-target"
              checked={pickTarget === 'foreground'}
              onChange={() => setPickTarget('foreground')}
            />
            Pick text color
          </label>
          <label htmlFor="radio-background">
            <input 
              id="radio-background"
              type="radio" 
              name="pick-target"
              checked={pickTarget === 'background'}
              onChange={() => setPickTarget('background')}
            />
            Pick background color
          </label>
        </RadioGroup>
      )}

      <StyledCanvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        role="img"
        aria-label={
          imageLoaded
            ? `Uploaded image. Click anywhere to choose the ${pickTarget} color.`
            : 'No image uploaded yet'
        }
        $visible={imageLoaded}
      />
    </Container>
  )
}