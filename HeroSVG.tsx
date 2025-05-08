// HeroSVG.tsx – SVG Hero Asset for The Handsomest Nerd Landing Page
import React from "react";
import { COLORS } from "./LandingHero.style";

const KEYWORDS = [
  "AI-powered workflows",
  "n8n automations",
  "custom AI applications",
  "prompt engineering",
  "context engineering",
  "business automation",
  "no-code solutions",
];

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
    <rect width="1440" height="360" rx="32" fill="url(#hero-gradient)" />
    <g>
      <path d="M 120 220 Q 320 80 480 200 T 900 100 Q 1280 220 1340 280" stroke="url(#line-grad)" strokeWidth="6" fill="none" opacity="0.22" />
      <path d="M 320 310 Q 420 150 900 220 Q 1250 250 1200 90" stroke="url(#line-grad)" strokeWidth="3.5" fill="none" opacity="0.2" />
      <path d="M250 70 C 410 220, 940 190, 1150 320" stroke="url(#line-grad)" strokeWidth="2.5" fill="none" opacity="0.13" />
    </g>
    <g>
      <circle cx="320" cy="80" r="30" fill={COLORS.white} stroke={COLORS.primary} strokeWidth="4" opacity="0.94" />
      <circle cx="900" cy="100" r="34" fill={COLORS.primary} opacity="0.82" />
      <circle cx="1280" cy="220" r="28" fill={COLORS.secondary} stroke={COLORS.primary} strokeWidth="3" />
      <circle cx="480" cy="200" r="22" fill={COLORS.white} opacity="0.67" />
      <circle cx="750" cy="220" r="17" fill={COLORS.primary} opacity="0.73" />
      <circle cx="1200" cy="90" r="15" fill={COLORS.primary} opacity="0.67" />
      <circle cx="1100" cy="180" r="12" fill={COLORS.accent} opacity="0.62" />
    </g>
    <g fontFamily="'Inter',Arial,sans-serif" fontWeight="600">
      <text x="314" y="87" fontSize="22" fill={COLORS.primary} textAnchor="middle">{KEYWORDS[0]}</text>
      <text x="910" y="108" fontSize="20" fill={COLORS.white} textAnchor="middle">{KEYWORDS[1]}</text>
      <text x="1287" y="228" fontSize="18" fill={COLORS.primary} textAnchor="middle">{KEYWORDS[6]}</text>
      <text x="490" y="214" fontSize="20" fill={COLORS.primary} textAnchor="middle">{KEYWORDS[3]}</text>
      <text x="1200" y="98" fontSize="18" fill={COLORS.white} textAnchor="middle">{KEYWORDS[4]}</text>
      <text x="750" y="220" fontSize="19" fill={COLORS.primary} textAnchor="middle">{KEYWORDS[2]}</text>
      <text x="1100" y="180" fontSize="17" fill={COLORS.accent} textAnchor="middle">{KEYWORDS[5]}</text>
    </g>
  </svg>
);

export default HeroSVG;
