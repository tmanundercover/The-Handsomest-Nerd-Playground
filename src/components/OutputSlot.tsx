import React from 'react';
import styled, { css } from 'styled-components';
import { tokens } from '../theme/tokens';

const slotReveal =  css`@keyframes slotReveal { from { transform: translateY(-45px) scale(0.96); opacity:0;} 60%  { opacity: 1;} to   { transform: translateY(0) scale(1); opacity:1;} }`;
const slotGlow = css`@keyframes slotGlow { 0%   { box-shadow: 0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022; } 60%  { box-shadow: 0 0 36px #00FFD0cc, 0 0 30px #A970FF88, 0 8px 35px #FF6BFF55; } 100% { box-shadow: 0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022; } }`;
const codePop = css`@keyframes codePop { 0%   { background: #23285A44; color: #00ffd0; filter: blur(3px);} 40%  { background: #00ffd011; color:#fff;} 100% { background: none; color:#00ffd0; filter:none;} }`;
const errorPop = css`@keyframes errorPop { 0%   { background: #EF444433; color: ${tokens.color.error}; filter: blur(3px);} 40%  { background: #FF6BFF22; color:#fff;} 100% { background: none; color:${tokens.color.error}; filter:none;} }`;

const OutputSlotWrp = styled.section<{ $show: boolean; $error?: boolean }>`
  margin: 1.9rem auto 0 auto;
  width: 99%; max-width: 660px; min-width:255px;
  min-height: 162px;
  background: linear-gradient(110deg, #fff1 10%, #A970FF22 100%);
  border-radius: ${tokens.radius.pill};
  border: 2.7px solid ${({ $error }) => $error ? tokens.color.error : tokens.color.secondary};
  box-shadow: ${({ $error }) =>
    $error
      ? "0 2px 22px #FF6BFF44, 0 5px 26px #EF444466"
      : "0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022"};
  position: relative;
  overflow: hidden;
  animation:
    ${({ $show }) =>
      $show
        ? css`slotReveal 0.27s, slotGlow 1.1s;`
        : "none"};
  z-index: 4;
  will-change: transform, opacity, box-shadow;
  transition:
    box-shadow 0.6s cubic-bezier(.44,1.11,.35,1.04),
    border-color 0.5s cubic-bezier(.44,1.11,.35,1.04);
`;
const OutputDoor = styled.div<{ $revealed: boolean }>`
  width: 98.3%; height: 34px; margin: 0 auto;
  background: #1A1A23E3;
  border-radius: 10px;
  border:2px solid #00FFD0;
  box-shadow: 0 2px 9px #A970FFAA;
  position: absolute;
  top: ${({ $revealed }) => ($revealed ? "-45px" : "12px")};
  left: 1%; right:1%; z-index: 6;
  opacity: ${({ $revealed }) => ($revealed ? 0 : 0.91)};
  transition: top 0.4s, opacity 0.48s;
`;
const OutputPre = styled.pre<{ $animate?: boolean; $error?: boolean }>`
  font-family: ${tokens.font.mono};
  background: none;
  color: ${({$error})=> $error ? tokens.color.error : tokens.color.accent};
  font-size: 0.99rem;
  border: none;
  border-radius: 5px;
  margin: 32px 8px 0 24px;
  padding: 8px 8px 8px 11px;
  min-height: 76px; max-width: 97%;
  box-shadow: 0 2px 16px #00ffd044;
  white-space: pre-wrap; word-break: break-all;
  overflow-x:auto; outline:none;
  &:focus { box-shadow: 0 0 0 3px #6949FF33;}
  ${({$animate, $error}) => $animate && css`
    animation: ${$error? errorPop: codePop} 0.75s cubic-bezier(.27,.99,.44,1.00);
  `}
`;

const OutputActionsBar = styled.div`
  display: flex;
  gap: 16px;
  margin: 12px 0 13px 24px;
`;

const OutputActionBtn = styled.button<{ $color?: string }>`
  background: linear-gradient(
    120deg,
    ${({ $color }) => $color ?? tokens.color.accent}30 60%,
    #fff3
  );
  border: 2px solid ${({ $color }) => $color ?? tokens.color.accent};
  color: #fff;
  padding: 7.5px 19px 7.5px 14px;
  font-family: ${tokens.font.body};
  font-size: 1.08rem;
  border-radius: ${tokens.radius.action};
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.14s, box-shadow 0.18s;
  box-shadow: 0 1.5px 12px ${({ $color }) => $color ?? tokens.color.accent}22;
  outline: none; display: flex; gap:5.5px; align-items: center;
  will-change: transform,box-shadow;
  &:focus { box-shadow: ${tokens.shadow.focus};
    border-color: ${({ $color }) => $color ?? tokens.color.accent};
  }
  &:hover:not(:disabled) {
    background: ${({ $color }) =>
      $color ? `${$color}1A` : "#00FFD01A"};
    box-shadow: 0 0 0 2.5px ${({ $color }) => $color ?? tokens.color.accent};
    transform: scale(1.07);
  }
  &:active {
    background: ${({ $color }) =>
      $color ? `${$color}36` : "#00FFD03A"};
  }
  &:disabled {
    cursor: not-allowed; opacity:0.5;
  }
`;

type OutputSlotProps = {
  show: boolean;
  error?: boolean;
  output: string;
  outputSlotAnimated: boolean;
  tokens: typeof tokens;
  copied: boolean;
  handleCopy: () => void;
  handleSandbox: () => void;
  handleGithub: () => void;
};

export const OutputSlot: React.FC<OutputSlotProps> = ({
  show,
  error,
  output,
  outputSlotAnimated,
  tokens,
  copied,
  handleCopy,
  handleSandbox,
  handleGithub
}) => {
  return (
    <OutputSlotWrp
      $show={outputSlotAnimated}
      $error={error}
      aria-label="Vend result code slot"
      aria-live="polite"
      tabIndex={0}
      role="region"
    >
      <OutputDoor $revealed={true} aria-hidden="true"/>
      <OutputPre
        tabIndex={0}
        aria-label={error ? "Error output code" : "GPT output code"}
        $animate={outputSlotAnimated}
        $error={error}
        style={{
          marginTop: "35px",
          marginBottom: "8px",
          outline: "none",
          background: "none"
        }}
      >
        {output}
      </OutputPre>
      <OutputActionsBar>
        <OutputActionBtn
          $color={tokens.color.accent}
          aria-label="Copy code to clipboard"
          onClick={handleCopy}
          tabIndex={0}
          disabled={!output}
        >
          {/* SVG here intentionally omitted for brevity, import inline svg as needed */}
          {copied ? "Copied!" : "Copy"}
        </OutputActionBtn>
        <OutputActionBtn
          $color={tokens.color.infoLight}
          aria-label="Open in CodeSandbox"
          onClick={handleSandbox}
          tabIndex={0}
          disabled={!output}
        >
          Sandbox
        </OutputActionBtn>
        <OutputActionBtn
          $color="#222"
          aria-label="Export to GitHub (mocked)"
          onClick={handleGithub}
          tabIndex={0}
          disabled={!output}
        >
          Github
        </OutputActionBtn>
      </OutputActionsBar>
    </OutputSlotWrp>
  );
};
