import { rgbToHex } from "@/lib/contrast";
import { useRef, useState } from "react";

type PickTarget = 'foreground' | 'background';

type ImageColorPickerProps = {
  onForegroundPick: (hex: string) => void;
  onBackgroundPick: (hex: string) => void;
};

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
    <div>
      <label htmlFor="image-upload">Upload an image</label>
      <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />

      {imageLoaded && (
        <div role="radiogrup" aria-label="Choose which color you're picking">
          <label htmlFor="">
            <input 
              type="radio" 
              name="pick-target"
              checked={pickTarget === 'foreground'}
              onChange={() => setPickTarget('foreground')}
            />
            Pick text color
          </label>
          <label htmlFor="">
            <input 
              type="radio" 
              name="pick-target"
              checked={pickTarget === 'background'}
              onChange={() => setPickTarget('background')}
            />
            Pick background color
          </label>
        </div>
      )}

      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        role="img"
        aria-label={
          imageLoaded
            ? `Uploaded image. Click anywhere to choose the ${pickTarget} color.`
            : 'No image uploaded yet'
        }
        style={{ cursor: imageLoaded ? 'crosshair' : 'default', maxWidth: '100%' }}
      >

      </canvas>
    </div>
  )
}