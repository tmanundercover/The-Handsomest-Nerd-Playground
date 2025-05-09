// THNLandingPage.types.tsx
// Types and interfaces for The Handsomest Nerd Landing Page

import React from "react";

// Design tokens
export interface Colors {
  primary: string;
  accent: string;
  secondary: string;
  white: string;
  shadow: string;
  separator: string;
}

export interface CtaConfigItem {
  text: string;
  variant: "primary" | "secondary";
}

export type Keyword = string;

// Props for hero subcomponents, if compositional expansion is needed
export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {}
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface SubHeadingProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface KeywordsContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ButtonRowProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

// SVG Keyword for accessibility
export interface KeywordTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export interface HeroSVGWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Main exported App type
export type AppFC = React.FC;