'use client';

import { useState } from "react";
import { ColorInput } from "@/components/ColorInput";
import { ContrastResult, evaluateContrast, getContrastRatio, hexToRgb } from "@/lib/contrast";
import { ResultsPanel } from "@/components/ResultsPanel";

export default function Home() {
  const [foregroundHex, setForegroundHex] = useState('#000000');
  const [backgroundHex, setBackgroundHex] = useState('#ffffff');

  const foregroundRgb = hexToRgb(foregroundHex);
  const backgroundRgb = hexToRgb(backgroundHex);

  const result: ContrastResult | null = 
    foregroundRgb && backgroundRgb 
      ? evaluateContrast(getContrastRatio(foregroundRgb, backgroundRgb)) 
      : null;

  return (
    <main>
      <ColorInput 
        id="foreground"
        label="Text Color"
        hexValue={foregroundHex}
        onChange={setForegroundHex}
      />
       <ColorInput 
        id="background"
        label="Background Color"
        hexValue={backgroundHex}
        onChange={setBackgroundHex}
      />

      <ResultsPanel result={result} />
    </main>
  );
}
