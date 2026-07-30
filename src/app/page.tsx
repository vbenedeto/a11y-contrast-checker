'use client';

import { useState } from "react";
import { ColorInput } from "@/components/ColorInput";
import { ContrastResult, evaluateContrast, getContrastRatio, hexToRgb } from "@/lib/contrast";
import { ResultsPanel } from "@/components/ResultsPanel";
import { ImageColorPicker } from "@/components/ImageColorPicker";
import styled from "@emotion/styled";

const StyledHeader = styled.header`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  text-align: center;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 575px;
    margin: 0 auto;
  }
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 720px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const StyledFooter = styled.footer`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
     display: inline-block;
    transition: transform 0.2s ease, color 0.2s ease;

    &:hover,
    &:focus-visible {
      transform: translateY(-3px);
      color: ${({ theme }) => theme.colors.primary};
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 4px;
    }
  }
`;

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
    <>
      <StyledHeader>
        <h1>A11y Contrast Checker</h1>
        <p>Check WCAG color contrast for any two colors or image</p>
      </StyledHeader>
      <StyledMain>
        <ImageColorPicker
          onForegroundPick={setForegroundHex}
          onBackgroundPick={setBackgroundHex}
        />

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
      </StyledMain>
      <StyledFooter>
        <a href="https://github.com/vbenedeto/a11y-contrast-checker" target="_blank" rel="noopener noreferrer">
          View source on Github
        </a>
      </StyledFooter>
    </>
  );
}
