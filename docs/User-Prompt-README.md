This Is supposed to be a Landing Page:
// App.tsx – Production-Ready Landing Page for The Handsomest Nerd Inc.
//
// Built strictly to Brian, Josh, and Reqqy’s final requirements and design doc.
// styled-components only. Accessibility & SEO 100%. All content complete—no dev notes or placeholders.
//
// Pair programmed: James & Terrell 👨🏾‍💻🤝👨🏻‍💻

import React, { useCallback } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { Helmet } from "react-helmet";

// ====== DESIGN TOKENS (from Josh's Style Guide) ======
const COLORS = {
primary: "#8A2BE2", // Electric Violet
accent: "#6D0EB5", // Dark Violet
secondary: "#E0E0E0", // Neuromorphic Gray
white: "#FFFFFF",
shadow: "rgba(34,34,68,0.07)",
separator: "#D9D9EC",
};
const BORDER_RADIUS = "16px";
const SPACING = 24;
const FOCUS_VISIBLE_RING = `
  outline: 3px solid ${COLORS.primary};
  outline-offset: 2.5px;
  box-shadow: 0 0 0 4px ${COLORS.accent}46;
  transition: outline 0.13s, box-shadow 0.2s;
`;

// ====== GLOBAL STYLES ======
const GlobalStyle = createGlobalStyle`
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

// ====== KEYWORDS & ANIMATION ======
const KEYWORDS = [
"AI-powered workflows",
"n8n automations",
"custom AI applications",
"prompt engineering",
"context engineering",
"business automation",
"no-code solutions",
];
const floatAnim = keyframes`
  0%   { transform: translateY(0);}
  55%  { transform: translateY(-10px);}
  100% { transform: translateY(0);}
`;

// ====== SVG HERO – Responsive, Accessible, Animated ======
const HeroSVGWrapper = styled.div`
  width: 100%;
  max-width: 820px;
  min-height: 270px;
  margin: 0 auto ${SPACING * 1.5}px auto;
  @media (max-width: 700px) {
    min-height: 180px;
    max-width: 98vw;
  }
`;

const HeroSVG: React.FC = () => (
<svg
width="100%"
height="100%"
viewBox="0 0 1440 360"
role="img"
aria-label="Abstract workflow network illustration with keywords: AI-powered workflows, n8n automations, custom AI applications, prompt engineering, context engineering, business automation, no-code solutions."
focusable="false"
style={{ display: "block", width: "100%", height: "auto" }}
xmlns="http://www.w3.org/2000/svg"
>
    <title>AI Automation Network – The Handsomest Nerd: Landing Hero</title>
    <desc>
      Abstract network of nodes and lines with overlayed AI, automation and
      workflow service keywords.
    </desc>
    {/* ======= SVG LAYERS & ANIMATION ======= */}
    <defs>
      <radialGradient id="hero-gradient" cx="50%" cy="40%" r="100%">
        <stop offset="0%" stopColor={COLORS.primary} />
        <stop offset="70%" stopColor={COLORS.secondary} />
        <stop offset="100%" stopColor={COLORS.secondary} />
      </radialGradient>
      <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.18" />
        <stop offset="100%" stopColor={COLORS.accent} stopOpacity="0.30" />
      </linearGradient>
    </defs>
    {/* BG PANEL */}
    <rect width="1440" height="360" rx="32" fill="url(#hero-gradient)" />
    {/* NETWORK LINES */}
    <g>
      <path
        d="M 120 220 Q 320 80 480 200 T 900 100 Q 1280 220 1340 280"
        stroke="url(#line-grad)"
        strokeWidth="6"
        fill="none"
        opacity="0.22"
      />
      <path
        d="M 320 310 Q 420 150 900 220 Q 1250 250 1200 90"
        stroke="url(#line-grad)"
        strokeWidth="3.5"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M250 70 C 410 220, 940 190, 1150 320"
        stroke="url(#line-grad)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.13"
      />
    </g>
    {/* NETWORK NODES */}
    <g>
      <circle
        cx="320"
        cy="80"
        r="30"
        fill={COLORS.white}
        stroke={COLORS.primary}
        strokeWidth="4"
        opacity="0.94"
      />
      <circle cx="900" cy="100" r="34" fill={COLORS.primary} opacity="0.82" />
      <circle
        cx="1280"
        cy="220"
        r="28"
        fill={COLORS.secondary}
        stroke={COLORS.primary}
        strokeWidth="3"
      />
      <circle cx="480" cy="200" r="22" fill={COLORS.white} opacity="0.67" />
      <circle cx="750" cy="220" r="17" fill={COLORS.primary} opacity="0.73" />
      <circle cx="1200" cy="90" r="15" fill={COLORS.primary} opacity="0.67" />
      <circle cx="1100" cy="180" r="12" fill={COLORS.accent} opacity="0.62" />
    </g>
    {/* OVERLAYED KEYWORDS */}
    <g fontFamily="'Inter',Arial,sans-serif" fontWeight="600">
      <text
        x="314"
        y="87"
        fontSize="22"
        fill={COLORS.primary}
        textAnchor="middle"
      >
        {KEYWORDS[0]}
      </text>
      <text
        x="910"
        y="108"
        fontSize="20"
        fill={COLORS.white}
        textAnchor="middle"
      >
        {KEYWORDS[1]}
      </text>
      <text
        x="1287"
        y="228"
        fontSize="18"
        fill={COLORS.primary}
        textAnchor="middle"
      >
        {KEYWORDS[6]}
      </text>
      <text
        x="490"
        y="214"
        fontSize="20"
        fill={COLORS.primary}
        textAnchor="middle"
      >
        {KEYWORDS[3]}
      </text>
      <text
        x="1200"
        y="98"
        fontSize="18"
        fill={COLORS.white}
        textAnchor="middle"
      >
        {KEYWORDS[4]}
      </text>
      <text
        x="750"
        y="220"
        fontSize="19"
        fill={COLORS.primary}
        textAnchor="middle"
      >
        {KEYWORDS[2]}
      </text>
      <text
        x="1100"
        y="180"
        fontSize="17"
        fill={COLORS.accent}
        textAnchor="middle"
      >
        {KEYWORDS[5]}
      </text>
    </g>
  </svg>
);

// ====== MAIN LAYOUT (HERO SECTION & INTERACTIVE) ======
const HeroSection = styled.section`
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

const Heading = styled.h1`
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

const SubHeading = styled.p`
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

const CTAButton = styled.button<{ variant?: "primary" | "secondary" }>`
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

const ButtonRow = styled.div`
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

// Accessibility/animation tags for keywords
const KeywordTag = styled.span`
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
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.33s;
  }
  &:nth-child(3) {
    animation-delay: 0.66s;
  }
  &:nth-child(4) {
    animation-delay: 0.99s;
  }
  &:nth-child(5) {
    animation-delay: 1.21s;
  }
  &:nth-child(6) {
    animation-delay: 1.49s;
  }
  &:nth-child(7) {
    animation-delay: 1.61s;
  }
  @media (max-width: 650px) {
    font-size: 0.97rem;
    padding: 0.22em 0.86em;
    margin-bottom: 4px;
    text-align: center;
    max-width: 97vw;
    box-sizing: border-box;
  }
`;

const KeywordsContainer = styled.div`
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

// ====== CTA BUTTON LOGGING HANDLER ======
function logCTA(label: string) {
// Event logging for CTA analytics integration; Antosh’s hook can go here.
if (window && typeof window !== "undefined" && "dataLayer" in window) {
// Analytics event (for GTM or similar)
// @ts-ignore
window.dataLayer.push({ event: "cta_click", label });
} else {
// Fallback for demo/dev environments
// eslint-disable-next-line no-console
console.log(`CTA_CLICK:${label}`);
}
}

const CTA_CONFIG = [
{ text: "Book a Free Consultation", variant: "primary" },
{ text: "See Our AI Services", variant: "secondary" },
{ text: "Get Your Custom Proposal", variant: "primary" },
];

// =========== MAIN APP EXPORT ===========
const App: React.FC = () => {
const getCTAHandler = useCallback((label: string) => () => logCTA(label), []);

return (
<>
<Helmet>
<title>Supercharge Your Business with AI – The Handsomest Nerd</title>
<meta
name="description"
content="Unlock the power of AI-powered workflows, n8n automations, and custom solutions for your business. Book a free AI consultation today!"
/>
<meta
property="og:title"
content="Supercharge Your Business with AI – The Handsomest Nerd"
/>
<meta property="og:image" content="/og_image.png" />
<meta
property="og:description"
content="AI-powered workflows, n8n automations, business automation and custom prompt engineering. Book your free AI consult today!"
/>
{/* Google Fonts: Inter */}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
rel="preconnect"
href="https://fonts.gstatic.com"
crossOrigin="anonymous"
/>
<link
href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
rel="stylesheet"
/>
</Helmet>
<GlobalStyle />
<HeroSection
role="region"
aria-label="Landing Page Hero and Service Overview"
>
<Heading
tabIndex={0}
aria-label="Supercharge Your Business with AI – Let The Handsomest Nerd Show You How"
>
Supercharge Your Business with AI – Let The Handsomest Nerd Show You
How
</Heading>
<SubHeading
tabIndex={0}
aria-label="Unleash the power of AI-powered workflows, n8n automations, and custom solutions. Propel your business with cutting-edge context and prompt engineering."
>
Unleash the power of AI-powered workflows, n8n automations, and custom
solutions.
<br />
Propel your business with cutting-edge context &amp; prompt
engineering.
</SubHeading>
<HeroSVGWrapper aria-label="Hero Illustration – AI Workflow Network">
<HeroSVG />
</HeroSVGWrapper>
<KeywordsContainer role="list" aria-label="Service Types">
{KEYWORDS.map((kw, i) => (
<KeywordTag key={i} role="listitem" aria-label={kw} tabIndex={0}>
{kw}
</KeywordTag>
))}
</KeywordsContainer>
<ButtonRow role="group" aria-label="Call-to-Action Buttons">
{CTA_CONFIG.map(({ text, variant }, idx) => (
<CTAButton
key={text}
variant={variant as "primary" | "secondary"}
aria-label={text}
tabIndex={0}
onClick={getCTAHandler(text)}
>
{text}
</CTAButton>
))}
</ButtonRow>
</HeroSection>
</>
);
};

export default App;
but the Graphic in the middle is not very good. Please get Josh to work hard on that and draft up a png that is a svg style mockup. Once he has that have him generate svg mockups or assets that the developers can use to implement the Design and Requirements. Please Brian kick off the pair programming with an examination of the project-structure sub-directory on github it will have the Design Document Template that you us to create a detailed design following the template for this application at hand. Then Reqqy generates the requirements and breaks them down into 1 to 3 point size issues in JSON format and stores those appropriately encoded in base64 format for Github. Reqqy passes the Requirements and the Design to Josh who Generates an inspiration picture with a 3500 or word less prompt to Open AI Dall-E. The from that image he generates svg assets for the team to us in the next stages. Terrell looks at the Design and the Requirements and implements the mockup using any assets that Josh created. Terrell Starts by grabbing an issue that has a tag with his name and implements it. Leaves a comment on the issue about status and then moves to the next issue. Then Terrell does a thorough code review with issues created in github for James. Then James takes the code performs all issues from code review leaving comments and issues for Terrell to integrate his change. Terrell checks the comments for things he can do and they pair program to complete the remaining issues for the deliverable of a functioning application. Reqqy then follows the testing document to make sure all requriements are met then Brian does last QA to make sure it runs error free and is deployed to firebase hosting and other firebase services required for this app.   Please deliver a working Much better SVG Diiagram in the middle. Also it's super wordy. Eliminate the clutter by singling out 3 things an AI Consultant would offer.