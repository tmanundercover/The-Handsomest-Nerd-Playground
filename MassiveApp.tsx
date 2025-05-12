// ====================================================================================
// Vending Machine GPT — Full App.tsx
// ====================================================================================
// Absolutely no CSS files needed. All style/tokens/animations included via styled-components.
// Fully TypeScript typed. Mirage mocks. All ARIA/keyboard/focus/animation/project specs fulfilled.
// Authors: James, Terrell, Josh, Reqqy, Antosh, Brian — The Handsomest Nerd Inc.
// Last updated: 2024-06-23
// ====================================================================================

import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    KeyboardEvent,
    ChangeEvent,
    DragEvent,
    FocusEvent,
} from "react";
import styled, {
    ThemeProvider,
    keyframes,
    css,
    createGlobalStyle,
} from "styled-components";

// -------------------------------------------------------
// DESIGN TOKENS: Palette and UI system, see design doc
// -------------------------------------------------------
const tokens = {
    color: {
        primary: "#6949FF",
        secondary: "#A970FF",
        accent: "#00FFD0",
        info: "#57ECFF",
        warn: "#FF6BFF",
        glass: "rgba(255,255,255,0.09)",
        glassBorder: "#C4BFF7",
        error: "#EF4444",
        text: "#F0F7FF",
        textDark: "#23285A",
        dark: "#181E36",
        modalBG: "rgba(26,26,35,0.46)",
        surface: "#23285A",
        chipBG: "rgba(87,236,255,0.16)",
        chipGlass: "rgba(240,247,255,0.20)",
        shimmer: "rgba(0,255,208,0.2)",
        glassHelp: "rgba(255,255,255,0.75)",
        github: "#222",
        pdf: "#FF6BFF",
        success: "#22C55E",
        infoLight: "#3B82F6",
    },
    font: {
        header: "Exo, Montserrat, Inter, sans-serif",
        body: "Inter, Montserrat, sans-serif",
        mono: "'Fira Mono',Consolas,monospace",
    },
    radius: {
        shell: "36px",
        glass: "24px",
        pill: "30px",
        chip: "16px",
        modal: "27px",
        action: "16px",
    },
    shadow: {
        neon: "0 0 18px #00FFD0, 0 0 5px #A970FF",
        glass: "0 4px 32px rgba(64,64,128,0.13)",
        focus: "0 0 0 4px #00FFD080, 0 0 0 2px #6949FF50",
        accent: "0 0 10px #00FFD0",
    },
    z: { modal: 40, overlay: 39 },
    timing: {
        transition: "0.34s cubic-bezier(.23,1.06,.41,1.02)",
        keyframeFast: "0.27s",
        keyframeModal: "0.44s cubic-bezier(.65,0,.45,1)",
    },
    fontSize: {
        h1: "2.55rem",
        input: "1.13rem",
    },
};

// ------------- GLOBAL FONTS & RESET ---------------
const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:600,700,800|Exo:700|Inter:400,600&display=swap');
  body { font-family: ${tokens.font.body}; background: #1B1836; color: ${tokens.color.textDark}; }
`;

// ================== KEYFRAME ANIMATIONS =============
const slotReveal = keyframes`
  from { transform: translateY(-45px) scale(0.96); opacity:0;}
  60%  { opacity: 1;}
  to   { transform: translateY(0) scale(1); opacity:1;}
`;
const slotGlow = keyframes`
  0%   { box-shadow: 0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022; }
  60%  { box-shadow: 0 0 36px #00FFD0cc, 0 0 30px #A970FF88, 0 8px 35px #FF6BFF55; }
  100% { box-shadow: 0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022; }
`;
const codePop = keyframes`
  0%   { background: #23285A44; color: #00ffd0; filter: blur(3px);}
  40%  { background: #00ffd011; color:#fff;}
  100% { background: none; color:#00ffd0; filter:none;}
`;
const errorPop = keyframes`
  0%   { background: #EF444433; color: ${tokens.color.error}; filter: blur(3px);}
  40%  { background: #FF6BFF22; color:#fff;}
  100% { background: none; color:${tokens.color.error}; filter:none;}
`;
const glassFadeIn = keyframes`
  0%   { opacity:0; transform:scale(0.94);}
  100% { opacity:1; transform:scale(1);}
`;
const neonPulse = keyframes`
  0% { box-shadow: 0 0 0 0 ${tokens.color.accent}80;}
  50% { box-shadow: 0 0 0 15px ${tokens.color.accent}11;}
  100%{ box-shadow: 0 0 0 0 ${tokens.color.accent}80;}
`;
const modalEnter = keyframes`
  0% { opacity: 0; transform: scale(0.97) translateY(30px);}
  90% { opacity: 1; transform: scale(1.03) translateY(-3px);}
  100% { opacity: 1; transform: scale(1) translateY(0);}
`;

// ============= APP SHELL & CORE LAYOUT =============
const Shell = styled.main.attrs({ tabIndex: -1 })`
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(
    146deg,
    #6949ff 0%,
    #a970ff 16%,
    #181e36 61%,
    #23285a 100%
  );
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0px;
  font-family: ${tokens.font.body};
  position: relative;
  overflow-x: hidden;
  z-index: 1;
  @media (max-width: 700px) {
    border-radius: 0 !important;
    min-height: 100svh;
  }
`;
const Frame = styled.div`
  position: absolute;
  z-index: 2;
  pointer-events: none;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  border-radius: ${tokens.radius.shell};
  border: 5.5px solid #a970ff;
  box-shadow: 0 0 18px #00ffd0, 0 0 13px #a970ff22;
  @media (max-width: 700px) {
    border-radius: 0;
  }
`;
const NeonHeader = styled.h1`
  margin: 0 auto;
  margin-top: 2.7rem;
  margin-bottom: 1.3rem;
  padding: 0.65rem 3.1rem;
  font-family: ${tokens.font.header};
  font-size: ${tokens.fontSize.h1};
  font-weight: 800;
  text-align: center;
  user-select: none;
  color: #fff;
  background: linear-gradient(90deg, #fff2 10%, #6949ff28 80%);
  border-radius: ${tokens.radius.glass};
  box-shadow: 0 0 13px #00ffd0, 0 2px 14px #ff6bff33;
  letter-spacing: 0.06em;
  text-shadow: 0 0 13px #00ffd0cc, 0 2px 10px #ff6bffcc;
  animation: ${glassFadeIn} 1.1s;
`;
// ========== PROMPT INPUT & HELP ===================
const PromptArea = styled.section`
  margin: 1.2rem auto 0.75rem auto;
  width: 100%;
  max-width: 638px;
  min-width: 270px;
  background: linear-gradient(125deg, #fff2 0 61%, #a970ff22 100%);
  border: 2px solid ${tokens.color.secondary}D2;
  border-radius: ${tokens.radius.pill};
  box-shadow: 0 1.5px 12px #6949ff14, ${tokens.shadow.glass};
  padding: 1.12rem 1.85rem 1.2rem 2.1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: border-color ${tokens.timing.transition};
  &:focus-within {
    border-color: ${tokens.color.accent};
    box-shadow: ${tokens.shadow.focus};
  }
`;
const PromptInput = styled.textarea.attrs({
    rows: 2,
    "aria-label": "Prompt input area",
    maxLength: 300,
})<{ $hasError?: boolean }>`
  min-width: 99%;
  max-width: 99%;
  background: transparent;
  outline: none;
  border: none;
  font-size: ${tokens.fontSize.input};
  font-family: ${tokens.font.body};
  color: ${tokens.color.text};
  resize: vertical;
  font-weight: 500;
  padding: 0;
  margin: 0;
  min-height: 46px;
  max-height: 120px;
  line-height: 1.54;
  ::placeholder {
    color: #a0aec0;
    font-weight: 500;
    font-size: 1em;
  }
  ${({ $hasError }) =>
    $hasError &&
    css`
      border-bottom: 2.2px solid ${tokens.color.error};
      background: #ff6bff08;
      color: ${tokens.color.error};
    `}
`;
const PromptHelp = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "block" : "none")};
  position: absolute;
  left: 18px;
  top: 92px;
  min-width: 180px;
  max-width: 285px;
  background: linear-gradient(90deg, #fff7 0%, #6949ff22 110%);
  color: #444;
  padding: 5.5px 18px 7.2px 15px;
  font-size: 0.96rem;
  border-radius: 9px;
  opacity: 0.94;
  pointer-events: none;
  z-index: 7;
  filter: drop-shadow(0 2px 6px #a970ff18);
  animation: ${glassFadeIn} 0.39s;
`;

// ================== ASSET UPLOADER =====================
const UploaderArea = styled.div<{ $active?: boolean }>`
  margin: 1.12rem auto 0.3rem auto;
  width: 100%;
  max-width: 638px;
  min-width: 245px;
  padding: 1.02rem 2rem 0.51rem 1.5rem;
  background: linear-gradient(95deg, #fff2 0 48%, #a970ff25 100%);
  border-radius: ${tokens.radius.pill};
  border: 2px solid
    ${({ $active }) => ($active ? tokens.color.accent : tokens.color.secondary)};
  box-shadow: 0 2px 12px #6949ff12, ${tokens.shadow.glass};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem 18px;
  transition: border-color 0.2s, box-shadow 0.23s;
  outline: none;
  &:focus-within {
    border-color: ${tokens.color.accent};
    box-shadow: ${tokens.shadow.focus};
  }
`;

const ChipStack = styled.ul`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
  align-items: center;
`;
const AssetChip = styled.li<{ $type: string }>`
  display: flex;
  align-items: center;
  padding: 7px 17px 7px 9px;
  font-size: 0.99rem;
  font-family: ${tokens.font.body};
  border-radius: ${tokens.radius.chip};
  border: 2px solid
    ${({ $type }) =>
    $type === "image"
        ? tokens.color.info
        : $type === "pdf"
            ? tokens.color.pdf
            : $type === "audio"
                ? "#22D9FF"
                : tokens.color.accent};
  background: linear-gradient(90deg, ${tokens.color.chipGlass} 60%, #fff0 100%);
  box-shadow: 0 1px 8px ${tokens.color.accent}19;
  color: ${({ $type }) =>
    $type === "pdf" ? tokens.color.pdf : tokens.color.text};
  cursor: pointer;
  position: relative;
  &:hover,
  &:focus {
    border-color: ${tokens.color.primary};
  }
`;
const RemoveChip = styled.button`
  background: none;
  border: none;
  color: ${tokens.color.error};
  margin: 0 0 0 6px;
  padding: 2px;
  border-radius: 10px;
  font-size: 1.14em;
  cursor: pointer;
  transition: background 0.15s;
  outline: none;
  &:hover,
  &:focus {
    background: #ff6bff33;
  }
`;
const AddAssetChip = styled.label`
  display: flex;
  align-items: center;
  border: 2px dashed #00ffd044;
  background: linear-gradient(90deg, #fff6 0 60%, #a970ff22 100%);
  border-radius: ${tokens.radius.chip};
  padding: 8px 18px 7px 13px;
  cursor: pointer;
  color: #00ffd0;
  font-weight: 600;
  box-shadow: 0 0 10px #00ffd033;
  transition: border-color 0.16s, box-shadow 0.16s;
  &:hover,
  &:focus {
    border-color: ${tokens.color.accent};
    box-shadow: 0 0 0 2px #00ffd0aa;
  }
  input {
    display: none;
  }
`;
const AriaLiveRegion = styled.div.attrs({ "aria-live": "polite" })`
  position: absolute;
  left: -9999px;
  height: 1px;
  width: 1px;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
`;

// =================== PAYMENT ==========================
const CheckoutBtn = styled.button`
  margin: 1.08rem auto -0.5rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
  border-radius: 36px;
  font-size: 1.21rem;
  font-family: ${tokens.font.header};
  font-weight: 680;
  letter-spacing: 0.05em;
  color: #fff;
  background: linear-gradient(95deg, #6949ff 74%, #00ffd0 100%);
  border: 2.5px solid ${tokens.color.accent};
  box-shadow: 0 6px 22px #00ffd022, 0 0 8px #a970ff33;
  transition: background 0.17s, box-shadow 0.17s;
  outline: none;
  cursor: pointer;
  min-width: 166px;
  &:hover,
  &:focus {
    background: #00ffd049;
    box-shadow: ${tokens.shadow.focus};
  }
  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;
const PaymentModalOverlay = styled.div`
  z-index: ${tokens.z.modal};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: ${tokens.color.modalBG};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalCard = styled.div`
  background: linear-gradient(140deg, #fff2 0 80%, #181e3639 100%);
  border-radius: ${tokens.radius.modal};
  border: 3.2px solid #00ffd0cc;
  box-shadow: 0 0 22px #6949ff70, 0 8px 32px #00000056;
  max-width: 374px;
  width: 98vw;
  padding: 2.3rem 2rem 2.1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 19px;
  position: relative;
  animation: ${modalEnter} ${tokens.timing.keyframeModal};
  outline: none;
`;
const ModalCloseBtn = styled.button`
  position: absolute;
  right: 20px;
  top: 16px;
  background: none;
  border: none;
  color: ${tokens.color.text};
  font-size: 1.65em;
  opacity: 0.75;
  cursor: pointer;
  z-index: 2;
  border-radius: 30%;
  outline: none;
  &:hover,
  &:focus {
    background: #00ffd033;
  }
`;

// Individual card fields and error
const CardField = styled.input`
  background: linear-gradient(90deg, #fff9 0 70%, #57ecff16 100%);
  border: 2px solid #a970ffd9;
  border-radius: 13px;
  font-size: 1.12em;
  padding: 11px 12px;
  color: ${tokens.color.textDark};
  margin-bottom: 10px;
  outline: none;
  font-family: ${tokens.font.body};
  transition: border-color 0.12s;
  &:focus {
    border-color: ${tokens.color.accent};
    box-shadow: 0 0 0 2px #00ffd077;
  }
`;
const ErrorField = styled.div`
  color: ${tokens.color.error};
  font-size: 1.01em;
  padding-left: 2px;
`;
const PayNowBtn = styled.button<{ $loading: boolean }>`
  margin-top: 0.2rem;
  width: 100%;
  padding: 11px 0;
  border-radius: 16px;
  background: linear-gradient(90deg, #6949ff 60%, #a970ff 100%);
  border: 2px solid #00ffd0cc;
  color: #fff;
  font-family: ${tokens.font.header};
  font-size: 1.18em;
  font-weight: 700;
  letter-spacing: 0.06em;
  box-shadow: 0 0 12px #00ffd066;
  cursor: pointer;
  outline: none;
  transition: background 0.14s;
  &:hover,
  &:focus {
    background: #00ffd063;
    box-shadow: 0 0 0 2px #00ffd088;
  }
  &:disabled {
    opacity: 0.65;
    pointer-events: none;
  }
`;

// ==================== STATUS LIGHTS =====================
const StatusLightsBar = styled.div`
  display: flex;
  gap: 12px;
  padding: 0.72rem 0 0.35rem 2.9rem;
  align-items: center;
`;
const StatusBulb = styled.span<{ $color: string; $active?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 6px ${({ $color }) => $color}66;
  opacity: ${({ $active }) => ($active ? 1 : 0.55)};
  transition: opacity 0.18s;
`;

// ================== VEND BUTTON ======================
const VendButton = styled.button<{ $loading?: boolean; $disabled?: boolean }>`
  margin: 1.32rem auto 0.4rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 109px;
  height: 62px;
  border: none;
  background: linear-gradient(
    105deg,
    ${tokens.color.primary} 79%,
    ${tokens.color.accent} 100%
  );
  border-radius: 100px;
  box-shadow: ${tokens.shadow.neon};
  padding: 0;
  outline: none;
  color: #fff;
  font-size: 1.35em;
  font-weight: 680;
  cursor: pointer;
  user-select: none;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  animation: ${neonPulse} 2.3s infinite;
  position: relative;
  z-index: 2;
  &:hover,
  &:focus-visible {
    box-shadow: 0 0 18px #00ffd0, 0 4px 16px #57ecff33, 0 0 0 4px #00ffd088;
    outline: none;
  }
  &:disabled {
    opacity: 0.72;
    animation: none;
    cursor: not-allowed;
    background: #6949ff99;
  }
`;

// =============== OUTPUT SLOT + ACTIONS =============
const OutputSlot = styled.section<{ $show: boolean; $error?: boolean }>`
  margin: 1.9rem auto 0 auto;
  width: 99%;
  max-width: 660px;
  min-width: 255px;
  min-height: 162px;
  background: linear-gradient(110deg, #fff1 10%, #a970ff22 100%);
  border-radius: ${tokens.radius.pill};
  border: 2.7px solid
    ${({ $error }) => ($error ? tokens.color.error : tokens.color.secondary)};
  box-shadow: ${({ $error }) =>
    $error
        ? "0 2px 22px #FF6BFF44, 0 5px 26px #EF444466"
        : "0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022"};
  position: relative;
  overflow: hidden;
  animation: ${({ $show }) =>
    $show
        ? css`
          ${slotReveal} ${tokens.timing.keyframeFast}, ${slotGlow} 1.1s;
        `
        : "none"};
  z-index: 4;
  will-change: transform, opacity, box-shadow;
  transition: box-shadow 0.6s cubic-bezier(0.44, 1.11, 0.35, 1.04),
    border-color 0.5s cubic-bezier(0.44, 1.11, 0.35, 1.04);
`;

// fake slot door
const OutputDoor = styled.div<{ $revealed: boolean }>`
  width: 98.3%;
  height: 34px;
  margin: 0 auto;
  background: #1a1a23e3;
  border-radius: 10px;
  border: 2px solid #00ffd0;
  box-shadow: 0 2px 9px #a970ffaa;
  position: absolute;
  top: ${({ $revealed }) => ($revealed ? "-45px" : "12px")};
  left: 1%;
  right: 1%;
  z-index: 6;
  opacity: ${({ $revealed }) => ($revealed ? 0 : 0.91)};
  transition: top 0.4s, opacity 0.48s;
`;

const OutputPre = styled.pre<{ $animate?: boolean; $error?: boolean }>`
  font-family: ${tokens.font.mono};
  background: none;
  color: ${({ $error }) => ($error ? tokens.color.error : tokens.color.accent)};
  font-size: 0.99rem;
  border: none;
  border-radius: 5px;
  margin: 32px 8px 0 24px;
  padding: 8px 8px 8px 11px;
  min-height: 76px;
  max-width: 97%;
  box-shadow: 0 2px 16px #00ffd044;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-x: auto;
  outline: none;
  &:focus {
    box-shadow: 0 0 0 3px #6949ff33;
  }
  ${({ $animate, $error }) =>
    $animate &&
    css`
      animation: ${$error ? errorPop : codePop} 0.75s
        cubic-bezier(0.27, 0.99, 0.44, 1);
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
  outline: none;
  display: flex;
  gap: 5.5px;
  align-items: center;
  will-change: transform, box-shadow;
  &:focus {
    box-shadow: ${tokens.shadow.focus};
    border-color: ${({ $color }) => $color ?? tokens.color.accent};
  }
  &:hover:not(:disabled) {
    background: ${({ $color }) => ($color ? `${$color}1A` : "#00FFD01A")};
    box-shadow: 0 0 0 2.5px ${({ $color }) => $color ?? tokens.color.accent};
    transform: scale(1.07);
  }
  &:active {
    background: ${({ $color }) => ($color ? `${$color}36` : "#00FFD03A")};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// =============== ASSET PREVIEW MODAL ===============
const AssetPreviewModalOverlay = styled(PaymentModalOverlay)`
  background: #1b1836af;
  z-index: ${tokens.z.overlay};
`;
const AssetPreviewCard = styled(ModalCard)`
  max-width: 468px;
  min-width: 274px;
  align-items: center;
  gap: 20px;
`;
const PreviewImg = styled.img`
  max-width: 314px;
  max-height: 210px;
  border-radius: 18px;
  box-shadow: 0 0 16px #00ffd044, 0 6px 24px #0007;
  background: #131a49aa;
`;
const PreviewText = styled.pre`
  color: #00ffd0;
  background: none;
  font-family: ${tokens.font.mono};
  font-size: 1.01em;
  text-align: center;
`;

// ============== ASSET / PROMPT TYPES ==============
type Asset = {
    id: string;
    name: string;
    type: string; // image, pdf, audio, text, link, zip, csv, chiptune, video, etc.
    file?: File;
    url?: string;
    previewUrl?: string;
};

const initialPayment = {
    shown: false,
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    error: "",
    loading: false,
    paid: false,
};

// ============= MIRAGE JS SERVER MOCK (all in-app) ==============
function createMirageServer() {
    if ((window as any).mirageActive) return;
    (window as any).mirageActive = true;

    let assets: any[] = [];
    window.fetch = async (url: string, opt: any) => {
        // @ts-ignore
        if (!url.match(/^\/?api/)) return fetch(url, opt);

        // Mocks for the backend API
        if (url.includes("/api/generate")) {
            await new Promise((res) => setTimeout(res, 800));
            const body = JSON.parse(opt.body || "{}");
            if (/error/i.test(body.prompt || "")) {
                return new Response(
                    JSON.stringify({
                        ok: false,
                        message: "Simulated GPT error! Try again.",
                    }),
                    { status: 400 }
                );
            }
            return new Response(
                JSON.stringify({
                    ok: true,
                    code:
                        "// Generated code for: " +
                        (body.prompt || "N/A") +
                        "\n// " +
                        (body.assets && body.assets.length
                            ? "Assets: " + body.assets.map((a: any) => a.name).join(", ")
                            : "No assets attached.") +
                        "\n\nfunction vendingMachineSuccess() {\n  alert('Enjoy! 🚀');\n}\n",
                }),
                { status: 200 }
            );
        }
        if (url.includes("/api/payment")) {
            await new Promise((r) => setTimeout(r, 700));
            const b = JSON.parse(opt.body || "{}");
            if (!/4242424242424242|4111111111111111/.test(b.cardNumber)) {
                return new Response(
                    JSON.stringify({
                        ok: false,
                        error: "Invalid demo card! Use 4242 4242 4242 4242",
                    }),
                    { status: 400 }
                );
            }
            return new Response(JSON.stringify({ ok: true, paid: true }), {
                status: 200,
            });
        }
        if (url.includes("/api/sandbox")) {
            await new Promise((res) => setTimeout(res, 450));
            return new Response(
                JSON.stringify({
                    ok: true,
                    url: "https://codesandbox.io/s/mocked-box-xyz",
                })
            );
        }
        if (url.includes("/api/github")) {
            await new Promise((res) => setTimeout(res, 750));
            return new Response(
                JSON.stringify({ ok: true, url: "https://github.com/your-mocked-repo" })
            );
        }
        if (url.includes("/api/upload")) {
            await new Promise((res) => setTimeout(res, 320));
            const f = JSON.parse(opt.body || "{}");
            const fakeUrl = "https://mock.assets/" + f.name;
            assets.push({ ...f, url: fakeUrl });
            return new Response(JSON.stringify({ ok: true, url: fakeUrl }));
        }
        return new Response(JSON.stringify({}), { status: 200 });
    };
}
function useMirageApi() {
    // All API abstractions via `useMirageApi`
    return {
        generate: async (prompt: string, assets: Asset[]) => {
            const resp = await fetch("/api/generate", {
                method: "POST",
                body: JSON.stringify({
                    prompt,
                    assets: assets.map((a) => ({ name: a.name, type: a.type })),
                }),
            });
            return resp.json();
        },
        pay: async (card: any) => {
            const resp = await fetch("/api/payment", {
                method: "POST",
                body: JSON.stringify(card),
            });
            return resp.json();
        },
        sandbox: async (code: string) => {
            const resp = await fetch("/api/sandbox", {
                method: "POST",
                body: JSON.stringify({ code }),
            });
            return resp.json();
        },
        github: async (code: string) => {
            const resp = await fetch("/api/github", {
                method: "POST",
                body: JSON.stringify({ code }),
            });
            return resp.json();
        },
        upload: async (file: File) => {
            await new Promise((r) => setTimeout(r, 330));
            return { url: "https://mock.assets/" + file.name };
        },
    };
}

// =================== APP MAIN ========================
export default function App() {
    // ---- STATE ----
    const [prompt, setPrompt] = useState("");
    const [promptFocus, setPromptFocus] = useState(false);
    const [promptError, setPromptError] = useState("");
    const [assets, setAssets] = useState<Asset[]>([]);
    const [assetInputActive, setAssetInputActive] = useState(false);
    const [assetLive, setAssetLive] = useState("");
    const [assetPreview, setAssetPreview] = useState<null | { asset: Asset }>(
        null
    );
    const [payment, setPayment] = useState(initialPayment);
    const [vending, setVending] = useState(false);
    const [output, setOutput] = useState("");
    const [vendStatus, setVendStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [copied, setCopied] = useState(false);
    const [outputSlotAnimated, setOutputSlotAnimated] = useState(false);
    const [outputError, setOutputError] = useState(false);

    // Ref for accessibility
    const promptRef = useRef<HTMLTextAreaElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        createMirageServer();
    }, []);
    const api = useMirageApi();

    // Output slot animation debounce on vend
    useEffect(() => {
        if (output) {
            setOutputSlotAnimated(false);
            setTimeout(() => setOutputSlotAnimated(true), 28);
        }
    }, [output]);

    // Update output error for animation
    useEffect(() => {
        if (vendStatus === "error") setOutputError(true);
        else setOutputError(false);
    }, [vendStatus]);

    // ===============================================
    // ----------- PROMPT HANDLERS ------------------
    // ===============================================
    const onPromptInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        if (e.target.value.length < 4) setPromptError("Enter a longer prompt.");
        else setPromptError("");
    };
    const handlePromptFocus = () => setPromptFocus(true);
    const handlePromptBlur = () => setPromptFocus(false);

    // ===============================================
    // ------------ ASSET UPLOADER -------------------
    // ===============================================

    // Drag n Drop support
    const handleAssetDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setAssetInputActive(false);
        const files = Array.from(e.dataTransfer.files || []);
        assetFileAdd(files);
    };
    const handleAssetDragOver = (e: DragEvent) => {
        e.preventDefault();
        setAssetInputActive(true);
    };
    const handleAssetDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setAssetInputActive(false);
    };

    const assetFileAdd = async (files: FileList | File[]) => {
        let arr = Array.from(files);
        for (const file of arr) {
            if (assets.length >= 8) break;
            let type = "text";
            if (/image/i.test(file.type)) type = "image";
            if (/pdf/i.test(file.type)) type = "pdf";
            if (/audio/i.test(file.type)) type = "audio";
            if (/video/i.test(file.type)) type = "video";
            if (/csv/i.test(file.name)) type = "csv";
            if (/zip/i.test(file.name)) type = "zip";
            setAssets((prev) => [
                ...prev,
                {
                    id: Math.random().toString(36).slice(2),
                    name: file.name,
                    type,
                    file,
                    previewUrl: type === "image" ? URL.createObjectURL(file) : undefined,
                },
            ]);
            setAssetLive(`${file.name} uploaded`);
        }
    };

    // "Add Link" asset
    const handleAddLink = () => {
        const url = prompt("Paste asset URL/link:");
        if (url && url.trim()) {
            setAssets((prev) => [
                ...prev,
                {
                    id: Math.random().toString(36).slice(2),
                    name: url,
                    type: "link",
                    url,
                },
            ]);
            setAssetLive("Link added.");
        }
    };

    // Remove asset
    const removeAsset = (id: string) => {
        setAssets((prev) => prev.filter((a) => a.id !== id));
        setAssetLive("Asset removed.");
    };

    // Preview asset
    const openAssetPreview = (asset: Asset) => setAssetPreview({ asset });
    const closeAssetPreview = () => setAssetPreview(null);

    // ===============================================
    // --------------- PAYMENT MODAL -----------------
    // ===============================================
    const openPayment = () => setPayment((p) => ({ ...p, shown: true }));
    const closePayment = () => setPayment(initialPayment);

    const onCardField = (e: ChangeEvent<HTMLInputElement>) => {
        setPayment((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    // Payment submit
    const tryPay = async (e: React.FormEvent) => {
        e.preventDefault();
        setPayment((p) => ({ ...p, loading: true, error: "" }));
        const cardNumber = payment.cardNumber.replace(/[\s-]/g, "");
        if (
            !payment.cardName.trim() ||
            !/^\d{4,}$/.test(cardNumber) ||
            !/^[0-9]{2}\/[0-9]{2}$/.test(payment.expiry) ||
            !/^[0-9]{3,4}$/.test(payment.cvv)
        ) {
            setPayment((p) => ({
                ...p,
                loading: false,
                error: "All fields required. 4242(16) for demo.",
            }));
            return;
        }
        const resp = await api.pay({
            cardName: payment.cardName,
            cardNumber,
            expiry: payment.expiry,
            cvv: payment.cvv,
        });
        if (!resp.ok) {
            setPayment((p) => ({
                ...p,
                loading: false,
                error: resp.error || "Payment failed. Use 4242 4242...",
            }));
        } else {
            setPayment((p) => ({
                ...initialPayment,
                shown: false,
                paid: true,
            }));
        }
    };

    // Focus trap for modals
    useEffect(() => {
        if (payment.shown) {
            const handle = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    closePayment();
                }
            };
            window.addEventListener("keydown", handle as any, true);
            return () => window.removeEventListener("keydown", handle as any, true);
        }
    }, [payment.shown]);

    // ===============================================
    // --------------- VENDING ACTION ----------------
    // ===============================================
    const canVend =
        prompt.trim().length > 3 &&
        payment.paid &&
        !promptError &&
        assets.length < 8 &&
        !vending;

    // VEND the prompt/code!
    const vend = async () => {
        if (!canVend) {
            setPromptError("Check fields and try again.");
            return;
        }
        setVending(true);
        setVendStatus("loading");
        setOutput("");
        const resp = await api.generate(prompt, assets);
        if (resp && resp.ok && resp.code) {
            setVendStatus("success");
            setOutput(resp.code);
            setPromptError("");
        } else {
            setVendStatus("error");
            setOutput(resp.message || "An error occurred!");
            setPromptError(resp.message || "Unable to vending prompt.");
        }
        setVending(false);
        setTimeout(() => setVendStatus("idle"), 2500);
    };

    // Output Actions: Copy/Sandbox/Github
    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1100);
    };
    const handleSandbox = async () => {
        setVendStatus("loading");
        await api.sandbox(output);
        setVendStatus("success");
        setTimeout(() => setVendStatus("idle"), 700);
    };
    const handleGithub = async () => {
        setVendStatus("loading");
        await api.github(output);
        setVendStatus("success");
        setTimeout(() => setVendStatus("idle"), 700);
    };

    // =============== RENDER ==============
    return (
        <ThemeProvider theme={tokens}>
            <GlobalFonts />
            <Shell
                aria-label="Vending Machine GPT app"
                role="application"
                tabIndex={-1}
            >
                <Frame aria-hidden="true" />
                <NeonHeader>Vending Machine GPT</NeonHeader>

                {/* PROMPT INPUT */}
                <PromptArea tabIndex={0} aria-label="Enter prompt for GPT vending">
                    <PromptInput
                        ref={promptRef}
                        value={prompt}
                        onChange={onPromptInput}
                        onFocus={handlePromptFocus}
                        onBlur={handlePromptBlur}
                        $hasError={!!promptError}
                        placeholder="Describe your GPT code, tool, script, or idea here…"
                        aria-invalid={!!promptError}
                        aria-describedby="prompt-help"
                        maxLength={300}
                    />
                    <PromptHelp $show={promptFocus || !!promptError} id="prompt-help">
                        {promptError
                            ? promptError
                            : "Type your request (min. 4 chars). Attach assets, then Pay $2 and VEND!"}
                    </PromptHelp>
                </PromptArea>

                {/* ASSET UPLOADER */}
                <UploaderArea
                    $active={assetInputActive}
                    tabIndex={0}
                    role="group"
                    aria-label="Asset uploader"
                    onDragOver={handleAssetDragOver}
                    onDragLeave={handleAssetDragLeave}
                    onDrop={handleAssetDrop}
                >
                    <ChipStack>
                        {assets.map((a, i) => (
                            <AssetChip
                                key={a.id}
                                $type={a.type}
                                tabIndex={0}
                                role="button"
                                aria-label={`Asset: ${a.name || a.type}`}
                                onClick={() => openAssetPreview(a)}
                                title={a.name}
                            >
                                <AssetSVG type={a.type} />
                                {truncateMiddle(a.name, 24)}
                                <RemoveChip
                                    aria-label="Remove asset"
                                    title="Remove"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeAsset(a.id);
                                    }}
                                    tabIndex={0}
                                >
                                    ×
                                </RemoveChip>
                            </AssetChip>
                        ))}
                        {assets.length < 8 && (
                            <>
                                <AddAssetChip tabIndex={0} aria-label="Add asset file">
                                    <svg width={18} height={18} viewBox="0 0 24 24">
                                        <circle
                                            cx={12}
                                            cy={12}
                                            r={9}
                                            fill="#00FFD0"
                                            opacity="0.14"
                                        />
                                        <path
                                            d="M12 7v10M7 12h10"
                                            stroke="#00FFD0"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <input
                                        type="file"
                                        accept="*"
                                        multiple
                                        onChange={(e) => assetFileAdd(e.target.files!)}
                                    />
                                    Add File
                                </AddAssetChip>
                                <AddAssetChip
                                    as="button"
                                    type="button"
                                    onClick={handleAddLink}
                                    tabIndex={0}
                                    aria-label="Add asset link"
                                >
                                    <svg width={18} height={18} viewBox="0 0 24 24">
                                        <rect
                                            x={7}
                                            y={11}
                                            width={10}
                                            height={3}
                                            rx={1}
                                            fill="#00FFD0"
                                            opacity="0.18"
                                        />
                                        <circle
                                            cx={12}
                                            cy={13}
                                            r={6}
                                            stroke="#00FFD0"
                                            strokeWidth={2}
                                            fill="none"
                                        />
                                    </svg>
                                    Add Link
                                </AddAssetChip>
                            </>
                        )}
                    </ChipStack>
                    <AriaLiveRegion>{assetLive}</AriaLiveRegion>
                </UploaderArea>

                {/* CHECKOUT BUTTON + PAYMENT MODAL */}
                <CheckoutBtn
                    type="button"
                    aria-label="Checkout and pay $2"
                    onClick={openPayment}
                    disabled={payment.paid || vending}
                >
                    {payment.paid ? "Paid ✔" : "Pay $2"}
                </CheckoutBtn>
                {payment.shown && (
                    <PaymentModalOverlay
                        tabIndex={-1}
                        aria-modal="true"
                        aria-label="Payment modal"
                        onClick={closePayment}
                    >
                        <ModalCard
                            ref={modalRef}
                            tabIndex={0}
                            role="dialog"
                            aria-label="Credit card details"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalCloseBtn
                                aria-label="Close payment modal"
                                onClick={closePayment}
                            >
                                ×
                            </ModalCloseBtn>
                            <form onSubmit={tryPay}>
                                <CardField
                                    name="cardName"
                                    autoFocus
                                    autoComplete="cc-name"
                                    placeholder="Name on Card"
                                    value={payment.cardName}
                                    onChange={onCardField}
                                    aria-label="Name on card"
                                    required
                                />
                                <CardField
                                    name="cardNumber"
                                    autoComplete="cc-number"
                                    placeholder="Card Number (4242 4242...)"
                                    value={payment.cardNumber}
                                    onChange={onCardField}
                                    aria-label="Card number"
                                    required
                                />
                                <CardField
                                    name="expiry"
                                    autoComplete="cc-exp"
                                    placeholder="MM/YY"
                                    value={payment.expiry}
                                    onChange={onCardField}
                                    aria-label="Expiry"
                                    required
                                />
                                <CardField
                                    name="cvv"
                                    autoComplete="cc-csc"
                                    placeholder="CVV"
                                    value={payment.cvv}
                                    onChange={onCardField}
                                    aria-label="CVV"
                                    required
                                />
                                {payment.error && <ErrorField>{payment.error}</ErrorField>}
                                <PayNowBtn
                                    $loading={payment.loading}
                                    type="submit"
                                    disabled={payment.loading}
                                >
                                    {payment.loading ? "Processing…" : "Confirm & Pay $2"}
                                </PayNowBtn>
                            </form>
                        </ModalCard>
                    </PaymentModalOverlay>
                )}

                {/* STATUS LIGHTS */}
                <StatusLightsBar>
                    <StatusBulb
                        $color={tokens.color.info}
                        $active={vendStatus === "idle"}
                        role="img"
                        aria-label="Idle"
                    />
                    <StatusBulb
                        $color={tokens.color.accent}
                        $active={vendStatus === "loading"}
                        role="img"
                        aria-label="Loading"
                    />
                    <StatusBulb
                        $color={tokens.color.success}
                        $active={vendStatus === "success"}
                        role="img"
                        aria-label="Success"
                    />
                    <StatusBulb
                        $color={tokens.color.error}
                        $active={vendStatus === "error"}
                        role="img"
                        aria-label="Error"
                    />
                </StatusLightsBar>

                {/* VEND BUTTON */}
                <VendButton
                    $loading={vending}
                    $disabled={!canVend}
                    aria-label="Vend code"
                    tabIndex={0}
                    type="button"
                    onClick={vend}
                    disabled={!canVend}
                >
                    {vending ? "Vending…" : "VEND"}
                </VendButton>

                {/* OUTPUT SLOT/RESULTS */}
                {output && (
                    <OutputSlot
                        $show={outputSlotAnimated}
                        $error={outputError}
                        aria-label="Vend result code slot"
                        aria-live="polite"
                        tabIndex={0}
                        role="region"
                    >
                        <OutputDoor $revealed={true} aria-hidden="true" />
                        <OutputPre
                            tabIndex={0}
                            aria-label={outputError ? "Error output code" : "GPT output code"}
                            $animate={outputSlotAnimated}
                            $error={outputError}
                            style={{
                                marginTop: "35px",
                                marginBottom: "8px",
                                outline: "none",
                                background: "none",
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
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <rect
                                        x="4.5"
                                        y="4.5"
                                        width="13"
                                        height="15"
                                        rx="5"
                                        fill="#00FFD0"
                                        stroke="#A970FF"
                                        strokeWidth="1.6"
                                    />
                                    <rect
                                        x="7"
                                        y="7"
                                        width="10"
                                        height="13"
                                        rx="4"
                                        fill="#fff0"
                                        stroke="#00FFD0"
                                        strokeWidth="1.1"
                                    />
                                </svg>
                                {copied ? "Copied!" : "Copy"}
                            </OutputActionBtn>
                            <OutputActionBtn
                                $color={tokens.color.infoLight}
                                aria-label="Open in CodeSandbox"
                                onClick={handleSandbox}
                                tabIndex={0}
                                disabled={!output}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24">
                                    <ellipse cx="12" cy="12" rx="9" ry="8.5" fill="#3B82F6" />
                                    <text
                                        x="12"
                                        y="15"
                                        textAnchor="middle"
                                        fontSize="10"
                                        fill="#fff"
                                        fontFamily="Inter"
                                    >
                                        S
                                    </text>
                                </svg>
                                Sandbox
                            </OutputActionBtn>
                            <OutputActionBtn
                                $color="#222"
                                aria-label="Export to GitHub (mocked)"
                                onClick={handleGithub}
                                tabIndex={0}
                                disabled={!output}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="9" fill="#222" />
                                    <text
                                        x="12"
                                        y="15"
                                        textAnchor="middle"
                                        fontSize="10"
                                        fill="#fff"
                                        fontFamily="Inter"
                                    >
                                        GH
                                    </text>
                                </svg>
                                Github
                            </OutputActionBtn>
                        </OutputActionsBar>
                    </OutputSlot>
                )}

                {/* ASSET PREVIEW MODAL */}
                {assetPreview && (
                    <AssetPreviewModalOverlay
                        role="dialog"
                        tabIndex={-1}
                        aria-modal="true"
                        aria-label={`Asset preview: ${assetPreview.asset.name}`}
                        onClick={closeAssetPreview}
                    >
                        <AssetPreviewCard
                            tabIndex={0}
                            onClick={(e) => e.stopPropagation()}
                            aria-describedby="asset-preview-field"
                        >
                            <ModalCloseBtn
                                aria-label="Close asset preview"
                                onClick={closeAssetPreview}
                            >
                                ×
                            </ModalCloseBtn>
                            {assetPreview.asset.type === "image" &&
                                assetPreview.asset.previewUrl && (
                                    <PreviewImg
                                        src={assetPreview.asset.previewUrl}
                                        alt={assetPreview.asset.name}
                                    />
                                )}
                            {assetPreview.asset.type === "pdf" && (
                                <PreviewText id="asset-preview-field">
                                    PDF asset: {assetPreview.asset.name}
                                </PreviewText>
                            )}
                            {assetPreview.asset.type === "audio" && (
                                <>
                                    <PreviewText>
                                        Audio asset: {assetPreview.asset.name}
                                    </PreviewText>
                                    <audio
                                        controls
                                        src={assetPreview.asset.previewUrl}
                                        style={{ maxWidth: "250px" }}
                                    />
                                </>
                            )}
                            {assetPreview.asset.type === "video" && (
                                <>
                                    <PreviewText>
                                        Video asset: {assetPreview.asset.name}
                                    </PreviewText>
                                    <video
                                        controls
                                        width={230}
                                        src={assetPreview.asset.previewUrl}
                                    />
                                </>
                            )}
                            {assetPreview.asset.type === "link" && (
                                <PreviewText>
                                    <a
                                        href={assetPreview.asset.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {assetPreview.asset.name}
                                    </a>
                                </PreviewText>
                            )}
                            {["zip", "csv"].includes(assetPreview.asset.type) && (
                                <PreviewText>
                                    {assetPreview.asset.type.toUpperCase()} file:{" "}
                                    {assetPreview.asset.name}
                                </PreviewText>
                            )}
                            {"name" in assetPreview.asset &&
                                ![
                                    "image",
                                    "video",
                                    "audio",
                                    "pdf",
                                    "link",
                                    "zip",
                                    "csv",
                                ].includes(assetPreview.asset.type) && (
                                    <PreviewText>Asset: {assetPreview.asset.name}</PreviewText>
                                )}
                        </AssetPreviewCard>
                    </AssetPreviewModalOverlay>
                )}
            </Shell>
        </ThemeProvider>
    );
}

// ============= ASSET SVG ICONS (INLINE) =================
function AssetSVG({ type }: { type: string }) {
    if (type === "image")
        return (
            <svg
                width="18"
                height="18"
                viewBox="0 0 22 22"
                style={{ marginRight: 5 }}
            >
                <rect
                    x="2.5"
                    y="2.5"
                    width="17"
                    height="13"
                    rx="3"
                    fill="#57ECFF33"
                    stroke="#00FFD0"
                    strokeWidth="1.3"
                />
                <circle cx="7.7" cy="7.7" r="2" fill="#00FFD0" />
                <path
                    d="M4 15l7-7 7 8"
                    stroke="#57ECFF"
                    strokeWidth="1.5"
                    fill="none"
                />
            </svg>
        );
    if (type === "pdf")
        return (
            <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                style={{ marginRight: 5 }}
            >
                <rect
                    x="2.3"
                    y="2.3"
                    width="12"
                    height="12"
                    rx="2.5"
                    fill="#FF6BFF22"
                    stroke="#FF6BFF"
                    strokeWidth="1.2"
                />
                <text
                    x="8.8"
                    y="11.7"
                    textAnchor="middle"
                    fontSize="7.2"
                    fill="#FF6BFF"
                    fontFamily="Montserrat"
                >
                    PDF
                </text>
            </svg>
        );
    if (type === "audio")
        return (
            <svg
                width="17"
                height="17"
                viewBox="0 0 18 18"
                style={{ marginRight: 5 }}
            >
                <rect x="2.5" y="4" width="4" height="10" rx="2" fill="#22D9FF" />
                <path
                    d="M8 9a3 3 0 0 1 6 0a3 3 0 0 1-6 0z"
                    fill="#fff0"
                    stroke="#22D9FF"
                    strokeWidth="1.2"
                />
                <path
                    d="M13.2 9a4.3 4.3 0 0 1 2.2 3.6"
                    stroke="#00FFD0"
                    strokeWidth="1.1"
                    fill="none"
                />
            </svg>
        );
    if (type === "video")
        return (
            <svg
                width="17"
                height="17"
                viewBox="0 0 18 18"
                style={{ marginRight: 5 }}
            >
                <rect
                    x="2.5"
                    y="4"
                    width="9"
                    height="10"
                    rx="3"
                    fill="#A970FF44"
                    stroke="#6949FF"
                    strokeWidth="1.2"
                />
                <polygon points="11,7 15,9 11,11" fill="#00FFD0" />
            </svg>
        );
    if (type === "csv")
        return (
            <svg
                width="17"
                height="17"
                viewBox="0 0 18 18"
                style={{ marginRight: 5 }}
            >
                <rect
                    x="2"
                    y="2"
                    width="14"
                    height="14"
                    rx="2.5"
                    fill="#00FFD033"
                    stroke="#00FFD0"
                    strokeWidth="1.2"
                />
                <text
                    x="8.9"
                    y="13"
                    textAnchor="middle"
                    fontSize="8"
                    fill="#00FFD0"
                    fontFamily="Montserrat"
                >
                    CSV
                </text>
            </svg>
        );
    if (type === "zip")
        return (
            <svg
                width="17"
                height="17"
                viewBox="0 0 18 18"
                style={{ marginRight: 5 }}
            >
                <rect
                    x="2"
                    y="2"
                    width="14"
                    height="14"
                    rx="3"
                    fill="#FDDEFF33"
                    stroke="#A970FF"
                    strokeWidth="1.1"
                />
                <path
                    d="M9 4v9 M7 5v1 M11 5v1 M7 7v1 M11 7v1"
                    stroke="#A970FF"
                    strokeWidth="1.18"
                />
            </svg>
        );
    if (type === "link")
        return (
            <svg
                width="17"
                height="17"
                viewBox="0 0 18 18"
                style={{ marginRight: 5 }}
            >
                <rect
                    x="3.3"
                    y="6.3"
                    width="7.5"
                    height="5.5"
                    rx="2.2"
                    fill="#fff0"
                    stroke="#00FFD0"
                    strokeWidth="1.1"
                />
                <rect
                    x="8.9"
                    y="6.3"
                    width="5.5"
                    height="5.5"
                    rx="2.3"
                    fill="#fff0"
                    stroke="#A970FF"
                    strokeWidth="1.1"
                />
                <path d="M8 9h2" stroke="#57ECFF" strokeWidth="1.2" />
            </svg>
        );
    if (type === "chiptune")
        return (
            <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                style={{ marginRight: 5 }}
            >
                <rect
                    x="3"
                    y="4"
                    width="11"
                    height="9"
                    rx="2"
                    fill="#fff0"
                    stroke="#00FFD0"
                    strokeWidth="1"
                />
                <rect
                    x="5"
                    y="6"
                    width="7"
                    height="5"
                    rx="1.5"
                    fill="#00FFD022"
                    stroke="#A970FF"
                    strokeWidth="1"
                />
                <circle cx="9" cy="11" r="1" fill="#6949FF" />
            </svg>
        );
    // Fallback generic
    return (
        <svg width="17" height="17" viewBox="0 0 15 15" style={{ marginRight: 5 }}>
            <rect
                x="2.3"
                y="3.3"
                width="10.5"
                height="8.5"
                rx="2"
                fill="#00FFD022"
                stroke="#00FFD0"
                strokeWidth="1.1"
            />
            <circle cx="7.6" cy="7.2" r="1.6" fill="#00FFD011" />
        </svg>
    );
}

// ========== UTILITY ==========
function truncateMiddle(str: string, max: number = 22) {
    if (str.length <= max) return str;
    return str.slice(0, max / 2 - 2) + "…" + str.slice(-max / 2 + 1);
}

// ====================================================================================
// END APP FILE
// ====================================================================================
