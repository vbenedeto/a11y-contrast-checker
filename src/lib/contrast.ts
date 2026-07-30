
export type RGB = { r: number; g: number; b: number };

export function hexToRgb(hex: string): RGB | null {
  const coreHex = hex.startsWith('#') ? hex.slice(1) : hex;
  if (coreHex.length !== 6) {
    console.log("Invalid Hex Color Code");
    return null;
  }

  const hexR = coreHex.substring(0, 2);
  const hexG = coreHex.substring(2, 4);
  const hexB = coreHex.substring(4);

  const r = parseInt(hexR, 16);
  const g = parseInt(hexG, 16);
  const b = parseInt(hexB, 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    console.log("Invalid Hex Color Code");
    return null;
  }

  return {r, g, b};
}

export function rgbToHex({r, g, b}: RGB): string {
  function hexaCorrect(hexa: string): string {
    if (hexa.length == 1) {
      hexa = "0" + hexa;
    }
    return hexa;
  }

  let hexaR = r.toString(16);
  hexaR = hexaCorrect(hexaR);
  let hexaG = g.toString(16);
  hexaG = hexaCorrect(hexaG);
  let hexaB = b.toString(16);
  hexaB = hexaCorrect(hexaB);

  return "#" + hexaR + hexaG + hexaB;
}

export function getRelativeLuminance(rgb: RGB): number {
  function gammaCorrect(channel: number): number {
    if (channel <= 0.03928) {
      return channel / 12.92;
    } else { 
      return ((channel + 0.055) / 1.055) ** 2.4;
    }
  }

  const normalizedR = rgb.r / 255;
  const normalizedG = rgb.g / 255;
  const normalizedB = rgb.b / 255;
    
  const correctedR = gammaCorrect(normalizedR);
  const correctedG = gammaCorrect(normalizedG);
  const correctedB = gammaCorrect(normalizedB);

  return 0.2126*correctedR +  0.7152*correctedG + 0.0722*correctedB;
}

export function getContrastRatio(rgb1: RGB, rgb2: RGB):number {
  const luminance1 = getRelativeLuminance(rgb1);
  const luminance2 = getRelativeLuminance(rgb2);
  const l1 = Math.max(luminance1, luminance2);
  const l2 = Math.min(luminance1, luminance2);

  return (l1 + 0.05) / (l2 + 0.05);
}

export type ContrastResult = {
  ratio: number;
  normalTextAA: boolean;
  normalTextAAA: boolean;
  largeTextAA: boolean;
  largeTextAAA: boolean;
  uiComponentAA: boolean;
};

export const WCAG_THRESHOLDS = {
  normalTextAA: 4.5,
  normalTextAAA: 7,
  largeTextAA: 3,
  largeTextAAA: 4.5,
  uiComponentAA: 3,
} as const;

export function evaluateContrast(ratio: number): ContrastResult {
  return {
    ratio,
    normalTextAA: ratio >= WCAG_THRESHOLDS.normalTextAA,
    normalTextAAA: ratio >= WCAG_THRESHOLDS.normalTextAAA,
    largeTextAA: ratio >= WCAG_THRESHOLDS.largeTextAA,
    largeTextAAA: ratio >= WCAG_THRESHOLDS.largeTextAAA,
    uiComponentAA: ratio >= WCAG_THRESHOLDS.uiComponentAA,
  };
}