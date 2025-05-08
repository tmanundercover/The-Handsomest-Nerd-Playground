// component.style.ts – Styled Components for THN Landing Page
import styled, { createGlobalStyle, keyframes } from "styled-components";
const COLORS = {
  primary: "#8A2BE2",
  accent: "#6D0EB5",
  secondary: "#E0E0E0",
  white: "#FFFFFF",
  shadow: "rgba(34,34,68,0.07)",
  separator: "#D9D9EC",
};
const BORDER_RADIUS = "16px";
const SPACING = 24;
export const FOCUS_VISIBLE_RING = `
  outline: 3px solid ${COLORS.primary};
  outline-offset: 2.5px;
  box-shadow: 0 0 0 4px ${COLORS.accent}46;
  transition: outline 0.13s, box-shadow 0.2s;
`;
export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    background: ${COLORS.secondary};
    margin: 0;
    padding: 0;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    color: #222;
    scroll-behavior: smooth;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  :focus-visible {
    ${FOCUS_VISIBLE_RING}
  }
`;
export const floatAnim = keyframes`
  0%   { transform: translateY(0);}
  55%  { transform: translateY(-10px);}
  100% { transform: translateY(0);}
`;
export const HeroSVGWrapper = styled.div`
  width: 100%;
  max-width: 820px;
  min-height: 270px;
  margin: 0 auto ${SPACING * 1.5}px auto;
  @media (max-width: 700px) {
    min-height: 180px;
    max-width: 98vw;
  }
`;
export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${SPACING * 2}px ${SPACING}px ${SPACING * 2.5}px;
  background: linear-gradient(
    140deg,
    ${COLORS.primary} 0%,
    ${COLORS.secondary} 82%
  );
  min-height: 85vh;
  width: 100vw;
  position: relative;
  overflow-x: hidden;
  border-radius: 0 0 ${BORDER_RADIUS} ${BORDER_RADIUS};
  box-shadow: 0 3px 30px ${COLORS.primary}10, 0 0 0 1px ${COLORS.separator};
  @media (max-width: 700px) {
    padding: ${SPACING + 7}px ${SPACING / 2.5}px 36px;
    min-height: 90vh;
    border-radius: 0 0 ${BORDER_RADIUS} ${BORDER_RADIUS};
  }
`;
export const Heading = styled.h1`
  color: ${COLORS.white};
  font-size: 2.6rem;
  letter-spacing: -0.04em;
  margin-bottom: ${SPACING}px;
  margin-top: ${SPACING / 2}px;
  max-width: 800px;
  text-align: center;
  font-family: "Inter", Arial, Helvetica, sans-serif;
  font-weight: 700;
  line-height: 1.12;
  text-shadow: 0 2px 18px ${COLORS.primary}22;
  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 1.18;
  }
`;
export const SubHeading = styled.p`
  color: ${COLORS.white};
  font-size: 1.22rem;
  margin-bottom: ${SPACING * 0.9}px;
  font-weight: 500;
  max-width: 540px;
  text-align: center;
  line-height: 1.42;
  opacity: 0.92;
  text-shadow: 0 1px 8px ${COLORS.primary}14;
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0 4vw;
    margin-bottom: ${SPACING * 0.65}px;
  }
`;
export const CTAButton = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.98em 2.3em;
  font-size: 1.15rem;
  font-family: inherit;
  color: ${({ variant }) =>
    variant === "secondary" ? COLORS.primary : COLORS.white};
  background: ${({ variant }) =>
    variant === "secondary" ? COLORS.white : COLORS.primary};
  border: ${({ variant }) =>
    variant === "secondary" ? `2px solid ${COLORS.primary}` : "none"};
  border-radius: ${BORDER_RADIUS};
  font-weight: 700;
  box-shadow: 0 2px 12px ${COLORS.primary}15, 0 1.5px 0.5px ${COLORS.shadow};
  margin: 0;
  min-width: 220px;
  min-height: 52px;
  cursor: pointer;
  outline: none;
  letter-spacing: -0.02em;
  user-select: none;
  margin-bottom: 0;
  transition: background 0.23s, color 0.19s, box-shadow 0.17s, transform 0.13s;
  &:hover,
  &:focus-visible {
    background: ${({ variant }) =>
      variant === "secondary" ? COLORS.secondary : "#a150ee"};
    color: ${({ variant }) =>
      variant === "secondary" ? "#a150ee" : COLORS.white};
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 4px 22px ${COLORS.primary}28, 0 1.5px 0.5px ${COLORS.shadow};
  }
  &:active {
    background: ${({ variant }) =>
      variant === "secondary" ? "#F3F3FD" : COLORS.accent};
    color: ${({ variant }) =>
      variant === "secondary" ? COLORS.accent : COLORS.white};
    transform: scale(0.98);
    box-shadow: 0 1px 10px ${COLORS.primary}10, 0 1.5px 0.5px ${COLORS.shadow};
  }
  @media (max-width: 650px) {
    min-width: 100%;
    width: 100%;
    font-size: 1.08rem;
    margin-bottom: 0.7rem;
  }
`;
export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING}px;
  margin-top: ${SPACING}px;
  justify-content: center;
  width: 100%;
  align-items: center;
  @media (max-width: 650px) {
    flex-direction: column;
    gap: 11px;
    width: 100%;
    margin-top: ${SPACING * 0.7}px;
  }
`;
export const KeywordTag = styled.span`
  background: ${COLORS.white};
  color: ${COLORS.primary};
  border-radius: 22px;
  padding: 0.3em 1.15em;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 1.5px 7px #0001;
  margin: 0 4px 8px 4px;
  cursor: default;
  line-height: 1.14;
  animation: ${floatAnim} 4s ease-in-out infinite;
  display: inline-block;
  vertical-align: middle;
  user-select: text;
  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 0.33s; }
  &:nth-child(3) { animation-delay: 0.66s; }
  &:nth-child(4) { animation-delay: 0.99s; }
  &:nth-child(5) { animation-delay: 1.21s; }
  &:nth-child(6) { animation-delay: 1.49s; }
  &:nth-child(7) { animation-delay: 1.61s; }
  @media (max-width: 650px) {
    font-size: 0.97rem;
    padding: 0.22em 0.86em;
    margin-bottom: 4px;
    text-align: center;
    max-width: 97vw;
    box-sizing: border-box;
  }
`;
export const KeywordsContainer = styled.div`
  margin-top: ${SPACING / 1.2}px;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 8px;
  row-gap: 5px;
  max-width: 820px;
  @media (max-width: 700px) {
    margin-top: ${SPACING * 0.6}px;
    justify-content: center;
    max-width: 98vw;
  }
`;
