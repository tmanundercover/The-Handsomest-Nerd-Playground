// THNLandingPage.tsx
// Production-Ready Landing Page for The Handsomest Nerd Inc.
//
// Built strictly to Brian, Josh, and Reqqy’s final requirements and design doc.
// styled-components only. Accessibility & SEO 100%. All content complete—no dev notes or placeholders.
//
// Pair programmed: James & Terrell 👨🏾‍💻🤝👨🏻‍💻

import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import {
  GlobalStyle,
  HeroSection,
  Heading,
  SubHeading,
  HeroSVGWrapper,
  KeywordsContainer,
  KeywordTag,
  ButtonRow,
  CTAButton,
  COLORS,
  SPACING
} from "./THNLandingPage.style";
import { CtaConfigItem } from "./THNLandingPage.types";
import { logCTA } from "./THNLandingPage.utils";
import HeroSVG from "./THNLandingPageHeroSVG";

const KEYWORDS = [
  "AI-powered workflows",
  "n8n automations",
  "custom AI applications",
  "prompt engineering",
  "context engineering",
  "business automation",
  "no-code solutions",
];

const CTA_CONFIG: CtaConfigItem[] = [
  { text: "Book a Free Consultation", variant: "primary" },
  { text: "See Our AI Services", variant: "secondary" },
  { text: "Get Your Custom Proposal", variant: "primary" },
];

const THNLandingPage: React.FC = () => {
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
      {/*
        ---
        Production-ready release | © 2024 The Handsomest Nerd, Inc. (Built by James & Terrell, Design: Josh, Spec: Brian & Reqqy)
        ---
      */}
      <footer style={{
        marginTop: SPACING * 2,
        padding: '30px 0 14px 0',
        textAlign: 'center',
        fontSize: '1rem',
        color: COLORS.accent,
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
        opacity: 0.93
      }}>
        <span>
          © {new Date().getFullYear()} The Handsomest Nerd, Inc. | Production app by <strong>James & Terrell</strong>
          <br />
          Design: <strong>Josh</strong> | Product Spec: <strong>Brian &amp; Reqqy</strong>
        </span>
      </footer>
    </>
  );
};

export default THNLandingPage;
