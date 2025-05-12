"use strict";
// ====================================================================================
// Vending Machine GPT — Full App.tsx
// ====================================================================================
// Absolutely no CSS files needed. All style/tokens/animations included via styled-components.
// Fully TypeScript typed. Mirage mocks. All ARIA/keyboard/focus/animation/project specs fulfilled.
// Authors: James, Terrell, Josh, Reqqy, Antosh, Brian — The Handsomest Nerd Inc.
// Last updated: 2024-06-23
// ====================================================================================
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
// -------------------------------------------------------
// DESIGN TOKENS: Palette and UI system, see design doc
// -------------------------------------------------------
var tokens = {
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
var GlobalFonts = (0, styled_components_1.createGlobalStyle)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  @import url('https://fonts.googleapis.com/css?family=Montserrat:600,700,800|Exo:700|Inter:400,600&display=swap');\n  body { font-family: ", "; background: #1B1836; color: ", "; }\n"], ["\n  @import url('https://fonts.googleapis.com/css?family=Montserrat:600,700,800|Exo:700|Inter:400,600&display=swap');\n  body { font-family: ", "; background: #1B1836; color: ", "; }\n"])), tokens.font.body, tokens.color.textDark);
// ================== KEYFRAME ANIMATIONS =============
var slotReveal = (0, styled_components_1.keyframes)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  from { transform: translateY(-45px) scale(0.96); opacity:0;}\n  60%  { opacity: 1;}\n  to   { transform: translateY(0) scale(1); opacity:1;}\n"], ["\n  from { transform: translateY(-45px) scale(0.96); opacity:0;}\n  60%  { opacity: 1;}\n  to   { transform: translateY(0) scale(1); opacity:1;}\n"])));
var slotGlow = (0, styled_components_1.keyframes)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  0%   { box-shadow: 0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022; }\n  60%  { box-shadow: 0 0 36px #00FFD0cc, 0 0 30px #A970FF88, 0 8px 35px #FF6BFF55; }\n  100% { box-shadow: 0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022; }\n"], ["\n  0%   { box-shadow: 0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022; }\n  60%  { box-shadow: 0 0 36px #00FFD0cc, 0 0 30px #A970FF88, 0 8px 35px #FF6BFF55; }\n  100% { box-shadow: 0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022; }\n"])));
var codePop = (0, styled_components_1.keyframes)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  0%   { background: #23285A44; color: #00ffd0; filter: blur(3px);}\n  40%  { background: #00ffd011; color:#fff;}\n  100% { background: none; color:#00ffd0; filter:none;}\n"], ["\n  0%   { background: #23285A44; color: #00ffd0; filter: blur(3px);}\n  40%  { background: #00ffd011; color:#fff;}\n  100% { background: none; color:#00ffd0; filter:none;}\n"])));
var errorPop = (0, styled_components_1.keyframes)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  0%   { background: #EF444433; color: ", "; filter: blur(3px);}\n  40%  { background: #FF6BFF22; color:#fff;}\n  100% { background: none; color:", "; filter:none;}\n"], ["\n  0%   { background: #EF444433; color: ", "; filter: blur(3px);}\n  40%  { background: #FF6BFF22; color:#fff;}\n  100% { background: none; color:", "; filter:none;}\n"])), tokens.color.error, tokens.color.error);
var glassFadeIn = (0, styled_components_1.keyframes)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  0%   { opacity:0; transform:scale(0.94);}\n  100% { opacity:1; transform:scale(1);}\n"], ["\n  0%   { opacity:0; transform:scale(0.94);}\n  100% { opacity:1; transform:scale(1);}\n"])));
var neonPulse = (0, styled_components_1.keyframes)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  0% { box-shadow: 0 0 0 0 ", "80;}\n  50% { box-shadow: 0 0 0 15px ", "11;}\n  100%{ box-shadow: 0 0 0 0 ", "80;}\n"], ["\n  0% { box-shadow: 0 0 0 0 ", "80;}\n  50% { box-shadow: 0 0 0 15px ", "11;}\n  100%{ box-shadow: 0 0 0 0 ", "80;}\n"])), tokens.color.accent, tokens.color.accent, tokens.color.accent);
var modalEnter = (0, styled_components_1.keyframes)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  0% { opacity: 0; transform: scale(0.97) translateY(30px);}\n  90% { opacity: 1; transform: scale(1.03) translateY(-3px);}\n  100% { opacity: 1; transform: scale(1) translateY(0);}\n"], ["\n  0% { opacity: 0; transform: scale(0.97) translateY(30px);}\n  90% { opacity: 1; transform: scale(1.03) translateY(-3px);}\n  100% { opacity: 1; transform: scale(1) translateY(0);}\n"])));
// ============= APP SHELL & CORE LAYOUT =============
var Shell = styled_components_1.default.main.attrs({ tabIndex: -1 })(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  min-height: 100vh;\n  min-width: 100vw;\n  background: linear-gradient(\n    146deg,\n    #6949ff 0%,\n    #a970ff 16%,\n    #181e36 61%,\n    #23285a 100%\n  );\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  padding: 0px;\n  font-family: ", ";\n  position: relative;\n  overflow-x: hidden;\n  z-index: 1;\n  @media (max-width: 700px) {\n    border-radius: 0 !important;\n    min-height: 100svh;\n  }\n"], ["\n  min-height: 100vh;\n  min-width: 100vw;\n  background: linear-gradient(\n    146deg,\n    #6949ff 0%,\n    #a970ff 16%,\n    #181e36 61%,\n    #23285a 100%\n  );\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  padding: 0px;\n  font-family: ", ";\n  position: relative;\n  overflow-x: hidden;\n  z-index: 1;\n  @media (max-width: 700px) {\n    border-radius: 0 !important;\n    min-height: 100svh;\n  }\n"])), tokens.font.body);
var Frame = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 2;\n  pointer-events: none;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  box-sizing: border-box;\n  border-radius: ", ";\n  border: 5.5px solid #a970ff;\n  box-shadow: 0 0 18px #00ffd0, 0 0 13px #a970ff22;\n  @media (max-width: 700px) {\n    border-radius: 0;\n  }\n"], ["\n  position: absolute;\n  z-index: 2;\n  pointer-events: none;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  box-sizing: border-box;\n  border-radius: ", ";\n  border: 5.5px solid #a970ff;\n  box-shadow: 0 0 18px #00ffd0, 0 0 13px #a970ff22;\n  @media (max-width: 700px) {\n    border-radius: 0;\n  }\n"])), tokens.radius.shell);
var NeonHeader = styled_components_1.default.h1(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  margin: 0 auto;\n  margin-top: 2.7rem;\n  margin-bottom: 1.3rem;\n  padding: 0.65rem 3.1rem;\n  font-family: ", ";\n  font-size: ", ";\n  font-weight: 800;\n  text-align: center;\n  user-select: none;\n  color: #fff;\n  background: linear-gradient(90deg, #fff2 10%, #6949ff28 80%);\n  border-radius: ", ";\n  box-shadow: 0 0 13px #00ffd0, 0 2px 14px #ff6bff33;\n  letter-spacing: 0.06em;\n  text-shadow: 0 0 13px #00ffd0cc, 0 2px 10px #ff6bffcc;\n  animation: ", " 1.1s;\n"], ["\n  margin: 0 auto;\n  margin-top: 2.7rem;\n  margin-bottom: 1.3rem;\n  padding: 0.65rem 3.1rem;\n  font-family: ", ";\n  font-size: ", ";\n  font-weight: 800;\n  text-align: center;\n  user-select: none;\n  color: #fff;\n  background: linear-gradient(90deg, #fff2 10%, #6949ff28 80%);\n  border-radius: ", ";\n  box-shadow: 0 0 13px #00ffd0, 0 2px 14px #ff6bff33;\n  letter-spacing: 0.06em;\n  text-shadow: 0 0 13px #00ffd0cc, 0 2px 10px #ff6bffcc;\n  animation: ", " 1.1s;\n"])), tokens.font.header, tokens.fontSize.h1, tokens.radius.glass, glassFadeIn);
// ========== PROMPT INPUT & HELP ===================
var PromptArea = styled_components_1.default.section(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  margin: 1.2rem auto 0.75rem auto;\n  width: 100%;\n  max-width: 638px;\n  min-width: 270px;\n  background: linear-gradient(125deg, #fff2 0 61%, #a970ff22 100%);\n  border: 2px solid ", "D2;\n  border-radius: ", ";\n  box-shadow: 0 1.5px 12px #6949ff14, ", ";\n  padding: 1.12rem 1.85rem 1.2rem 2.1rem;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  transition: border-color ", ";\n  &:focus-within {\n    border-color: ", ";\n    box-shadow: ", ";\n  }\n"], ["\n  margin: 1.2rem auto 0.75rem auto;\n  width: 100%;\n  max-width: 638px;\n  min-width: 270px;\n  background: linear-gradient(125deg, #fff2 0 61%, #a970ff22 100%);\n  border: 2px solid ", "D2;\n  border-radius: ", ";\n  box-shadow: 0 1.5px 12px #6949ff14, ", ";\n  padding: 1.12rem 1.85rem 1.2rem 2.1rem;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  transition: border-color ", ";\n  &:focus-within {\n    border-color: ", ";\n    box-shadow: ", ";\n  }\n"])), tokens.color.secondary, tokens.radius.pill, tokens.shadow.glass, tokens.timing.transition, tokens.color.accent, tokens.shadow.focus);
var PromptInput = styled_components_1.default.textarea.attrs({
    rows: 2,
    "aria-label": "Prompt input area",
    maxLength: 300,
})(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  min-width: 99%;\n  max-width: 99%;\n  background: transparent;\n  outline: none;\n  border: none;\n  font-size: ", ";\n  font-family: ", ";\n  color: ", ";\n  resize: vertical;\n  font-weight: 500;\n  padding: 0;\n  margin: 0;\n  min-height: 46px;\n  max-height: 120px;\n  line-height: 1.54;\n  ::placeholder {\n    color: #a0aec0;\n    font-weight: 500;\n    font-size: 1em;\n  }\n  ", "\n"], ["\n  min-width: 99%;\n  max-width: 99%;\n  background: transparent;\n  outline: none;\n  border: none;\n  font-size: ", ";\n  font-family: ", ";\n  color: ", ";\n  resize: vertical;\n  font-weight: 500;\n  padding: 0;\n  margin: 0;\n  min-height: 46px;\n  max-height: 120px;\n  line-height: 1.54;\n  ::placeholder {\n    color: #a0aec0;\n    font-weight: 500;\n    font-size: 1em;\n  }\n  ", "\n"])), tokens.fontSize.input, tokens.font.body, tokens.color.text, function (_a) {
    var $hasError = _a.$hasError;
    return $hasError && (0, styled_components_1.css)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n      border-bottom: 2.2px solid ", ";\n      background: #ff6bff08;\n      color: ", ";\n    "], ["\n      border-bottom: 2.2px solid ", ";\n      background: #ff6bff08;\n      color: ", ";\n    "])), tokens.color.error, tokens.color.error);
});
var PromptHelp = styled_components_1.default.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  display: ", ";\n  position: absolute;\n  left: 18px;\n  top: 92px;\n  min-width: 180px;\n  max-width: 285px;\n  background: linear-gradient(90deg, #fff7 0%, #6949ff22 110%);\n  color: #444;\n  padding: 5.5px 18px 7.2px 15px;\n  font-size: 0.96rem;\n  border-radius: 9px;\n  opacity: 0.94;\n  pointer-events: none;\n  z-index: 7;\n  filter: drop-shadow(0 2px 6px #a970ff18);\n  animation: ", " 0.39s;\n"], ["\n  display: ", ";\n  position: absolute;\n  left: 18px;\n  top: 92px;\n  min-width: 180px;\n  max-width: 285px;\n  background: linear-gradient(90deg, #fff7 0%, #6949ff22 110%);\n  color: #444;\n  padding: 5.5px 18px 7.2px 15px;\n  font-size: 0.96rem;\n  border-radius: 9px;\n  opacity: 0.94;\n  pointer-events: none;\n  z-index: 7;\n  filter: drop-shadow(0 2px 6px #a970ff18);\n  animation: ", " 0.39s;\n"])), function (_a) {
    var $show = _a.$show;
    return ($show ? "block" : "none");
}, glassFadeIn);
// ================== ASSET UPLOADER =====================
var UploaderArea = styled_components_1.default.div(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  margin: 1.12rem auto 0.3rem auto;\n  width: 100%;\n  max-width: 638px;\n  min-width: 245px;\n  padding: 1.02rem 2rem 0.51rem 1.5rem;\n  background: linear-gradient(95deg, #fff2 0 48%, #a970ff25 100%);\n  border-radius: ", ";\n  border: 2px solid\n    ", ";\n  box-shadow: 0 2px 12px #6949ff12, ", ";\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.8rem 18px;\n  transition: border-color 0.2s, box-shadow 0.23s;\n  outline: none;\n  &:focus-within {\n    border-color: ", ";\n    box-shadow: ", ";\n  }\n"], ["\n  margin: 1.12rem auto 0.3rem auto;\n  width: 100%;\n  max-width: 638px;\n  min-width: 245px;\n  padding: 1.02rem 2rem 0.51rem 1.5rem;\n  background: linear-gradient(95deg, #fff2 0 48%, #a970ff25 100%);\n  border-radius: ", ";\n  border: 2px solid\n    ", ";\n  box-shadow: 0 2px 12px #6949ff12, ", ";\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.8rem 18px;\n  transition: border-color 0.2s, box-shadow 0.23s;\n  outline: none;\n  &:focus-within {\n    border-color: ", ";\n    box-shadow: ", ";\n  }\n"])), tokens.radius.pill, function (_a) {
    var $active = _a.$active;
    return ($active ? tokens.color.accent : tokens.color.secondary);
}, tokens.shadow.glass, tokens.color.accent, tokens.shadow.focus);
var ChipStack = styled_components_1.default.ul(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  align-items: center;\n"], ["\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  align-items: center;\n"])));
var AssetChip = styled_components_1.default.li(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  padding: 7px 17px 7px 9px;\n  font-size: 0.99rem;\n  font-family: ", ";\n  border-radius: ", ";\n  border: 2px solid\n    ", ";\n  background: linear-gradient(90deg, ", " 60%, #fff0 100%);\n  box-shadow: 0 1px 8px ", "19;\n  color: ", ";\n  cursor: pointer;\n  position: relative;\n  &:hover,\n  &:focus {\n    border-color: ", ";\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  padding: 7px 17px 7px 9px;\n  font-size: 0.99rem;\n  font-family: ", ";\n  border-radius: ", ";\n  border: 2px solid\n    ", ";\n  background: linear-gradient(90deg, ", " 60%, #fff0 100%);\n  box-shadow: 0 1px 8px ", "19;\n  color: ", ";\n  cursor: pointer;\n  position: relative;\n  &:hover,\n  &:focus {\n    border-color: ", ";\n  }\n"])), tokens.font.body, tokens.radius.chip, function (_a) {
    var $type = _a.$type;
    return $type === "image"
        ? tokens.color.info
        : $type === "pdf"
            ? tokens.color.pdf
            : $type === "audio"
                ? "#22D9FF"
                : tokens.color.accent;
}, tokens.color.chipGlass, tokens.color.accent, function (_a) {
    var $type = _a.$type;
    return $type === "pdf" ? tokens.color.pdf : tokens.color.text;
}, tokens.color.primary);
var RemoveChip = styled_components_1.default.button(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  background: none;\n  border: none;\n  color: ", ";\n  margin: 0 0 0 6px;\n  padding: 2px;\n  border-radius: 10px;\n  font-size: 1.14em;\n  cursor: pointer;\n  transition: background 0.15s;\n  outline: none;\n  &:hover,\n  &:focus {\n    background: #ff6bff33;\n  }\n"], ["\n  background: none;\n  border: none;\n  color: ", ";\n  margin: 0 0 0 6px;\n  padding: 2px;\n  border-radius: 10px;\n  font-size: 1.14em;\n  cursor: pointer;\n  transition: background 0.15s;\n  outline: none;\n  &:hover,\n  &:focus {\n    background: #ff6bff33;\n  }\n"])), tokens.color.error);
var AddAssetChip = styled_components_1.default.label(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  border: 2px dashed #00ffd044;\n  background: linear-gradient(90deg, #fff6 0 60%, #a970ff22 100%);\n  border-radius: ", ";\n  padding: 8px 18px 7px 13px;\n  cursor: pointer;\n  color: #00ffd0;\n  font-weight: 600;\n  box-shadow: 0 0 10px #00ffd033;\n  transition: border-color 0.16s, box-shadow 0.16s;\n  &:hover,\n  &:focus {\n    border-color: ", ";\n    box-shadow: 0 0 0 2px #00ffd0aa;\n  }\n  input {\n    display: none;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  border: 2px dashed #00ffd044;\n  background: linear-gradient(90deg, #fff6 0 60%, #a970ff22 100%);\n  border-radius: ", ";\n  padding: 8px 18px 7px 13px;\n  cursor: pointer;\n  color: #00ffd0;\n  font-weight: 600;\n  box-shadow: 0 0 10px #00ffd033;\n  transition: border-color 0.16s, box-shadow 0.16s;\n  &:hover,\n  &:focus {\n    border-color: ", ";\n    box-shadow: 0 0 0 2px #00ffd0aa;\n  }\n  input {\n    display: none;\n  }\n"])), tokens.radius.chip, tokens.color.accent);
var AriaLiveRegion = styled_components_1.default.div.attrs({ "aria-live": "polite" })(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  position: absolute;\n  left: -9999px;\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n  pointer-events: none;\n  opacity: 0;\n"], ["\n  position: absolute;\n  left: -9999px;\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n  pointer-events: none;\n  opacity: 0;\n"])));
// =================== PAYMENT ==========================
var CheckoutBtn = styled_components_1.default.button(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  margin: 1.08rem auto -0.5rem auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 30px;\n  border-radius: 36px;\n  font-size: 1.21rem;\n  font-family: ", ";\n  font-weight: 680;\n  letter-spacing: 0.05em;\n  color: #fff;\n  background: linear-gradient(95deg, #6949ff 74%, #00ffd0 100%);\n  border: 2.5px solid ", ";\n  box-shadow: 0 6px 22px #00ffd022, 0 0 8px #a970ff33;\n  transition: background 0.17s, box-shadow 0.17s;\n  outline: none;\n  cursor: pointer;\n  min-width: 166px;\n  &:hover,\n  &:focus {\n    background: #00ffd049;\n    box-shadow: ", ";\n  }\n  &:disabled {\n    opacity: 0.6;\n    pointer-events: none;\n  }\n"], ["\n  margin: 1.08rem auto -0.5rem auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 30px;\n  border-radius: 36px;\n  font-size: 1.21rem;\n  font-family: ", ";\n  font-weight: 680;\n  letter-spacing: 0.05em;\n  color: #fff;\n  background: linear-gradient(95deg, #6949ff 74%, #00ffd0 100%);\n  border: 2.5px solid ", ";\n  box-shadow: 0 6px 22px #00ffd022, 0 0 8px #a970ff33;\n  transition: background 0.17s, box-shadow 0.17s;\n  outline: none;\n  cursor: pointer;\n  min-width: 166px;\n  &:hover,\n  &:focus {\n    background: #00ffd049;\n    box-shadow: ", ";\n  }\n  &:disabled {\n    opacity: 0.6;\n    pointer-events: none;\n  }\n"])), tokens.font.header, tokens.color.accent, tokens.shadow.focus);
var PaymentModalOverlay = styled_components_1.default.div(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n  z-index: ", ";\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  background: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  z-index: ", ";\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  background: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])), tokens.z.modal, tokens.color.modalBG);
var ModalCard = styled_components_1.default.div(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n  background: linear-gradient(140deg, #fff2 0 80%, #181e3639 100%);\n  border-radius: ", ";\n  border: 3.2px solid #00ffd0cc;\n  box-shadow: 0 0 22px #6949ff70, 0 8px 32px #00000056;\n  max-width: 374px;\n  width: 98vw;\n  padding: 2.3rem 2rem 2.1rem 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 19px;\n  position: relative;\n  animation: ", " ", ";\n  outline: none;\n"], ["\n  background: linear-gradient(140deg, #fff2 0 80%, #181e3639 100%);\n  border-radius: ", ";\n  border: 3.2px solid #00ffd0cc;\n  box-shadow: 0 0 22px #6949ff70, 0 8px 32px #00000056;\n  max-width: 374px;\n  width: 98vw;\n  padding: 2.3rem 2rem 2.1rem 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 19px;\n  position: relative;\n  animation: ", " ", ";\n  outline: none;\n"])), tokens.radius.modal, modalEnter, tokens.timing.keyframeModal);
var ModalCloseBtn = styled_components_1.default.button(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n  position: absolute;\n  right: 20px;\n  top: 16px;\n  background: none;\n  border: none;\n  color: ", ";\n  font-size: 1.65em;\n  opacity: 0.75;\n  cursor: pointer;\n  z-index: 2;\n  border-radius: 30%;\n  outline: none;\n  &:hover,\n  &:focus {\n    background: #00ffd033;\n  }\n"], ["\n  position: absolute;\n  right: 20px;\n  top: 16px;\n  background: none;\n  border: none;\n  color: ", ";\n  font-size: 1.65em;\n  opacity: 0.75;\n  cursor: pointer;\n  z-index: 2;\n  border-radius: 30%;\n  outline: none;\n  &:hover,\n  &:focus {\n    background: #00ffd033;\n  }\n"])), tokens.color.text);
// Individual card fields and error
var CardField = styled_components_1.default.input(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n  background: linear-gradient(90deg, #fff9 0 70%, #57ecff16 100%);\n  border: 2px solid #a970ffd9;\n  border-radius: 13px;\n  font-size: 1.12em;\n  padding: 11px 12px;\n  color: ", ";\n  margin-bottom: 10px;\n  outline: none;\n  font-family: ", ";\n  transition: border-color 0.12s;\n  &:focus {\n    border-color: ", ";\n    box-shadow: 0 0 0 2px #00ffd077;\n  }\n"], ["\n  background: linear-gradient(90deg, #fff9 0 70%, #57ecff16 100%);\n  border: 2px solid #a970ffd9;\n  border-radius: 13px;\n  font-size: 1.12em;\n  padding: 11px 12px;\n  color: ", ";\n  margin-bottom: 10px;\n  outline: none;\n  font-family: ", ";\n  transition: border-color 0.12s;\n  &:focus {\n    border-color: ", ";\n    box-shadow: 0 0 0 2px #00ffd077;\n  }\n"])), tokens.color.textDark, tokens.font.body, tokens.color.accent);
var ErrorField = styled_components_1.default.div(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n  color: ", ";\n  font-size: 1.01em;\n  padding-left: 2px;\n"], ["\n  color: ", ";\n  font-size: 1.01em;\n  padding-left: 2px;\n"])), tokens.color.error);
var PayNowBtn = styled_components_1.default.button(templateObject_28 || (templateObject_28 = __makeTemplateObject(["\n  margin-top: 0.2rem;\n  width: 100%;\n  padding: 11px 0;\n  border-radius: 16px;\n  background: linear-gradient(90deg, #6949ff 60%, #a970ff 100%);\n  border: 2px solid #00ffd0cc;\n  color: #fff;\n  font-family: ", ";\n  font-size: 1.18em;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  box-shadow: 0 0 12px #00ffd066;\n  cursor: pointer;\n  outline: none;\n  transition: background 0.14s;\n  &:hover,\n  &:focus {\n    background: #00ffd063;\n    box-shadow: 0 0 0 2px #00ffd088;\n  }\n  &:disabled {\n    opacity: 0.65;\n    pointer-events: none;\n  }\n"], ["\n  margin-top: 0.2rem;\n  width: 100%;\n  padding: 11px 0;\n  border-radius: 16px;\n  background: linear-gradient(90deg, #6949ff 60%, #a970ff 100%);\n  border: 2px solid #00ffd0cc;\n  color: #fff;\n  font-family: ", ";\n  font-size: 1.18em;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  box-shadow: 0 0 12px #00ffd066;\n  cursor: pointer;\n  outline: none;\n  transition: background 0.14s;\n  &:hover,\n  &:focus {\n    background: #00ffd063;\n    box-shadow: 0 0 0 2px #00ffd088;\n  }\n  &:disabled {\n    opacity: 0.65;\n    pointer-events: none;\n  }\n"])), tokens.font.header);
// ==================== STATUS LIGHTS =====================
var StatusLightsBar = styled_components_1.default.div(templateObject_29 || (templateObject_29 = __makeTemplateObject(["\n  display: flex;\n  gap: 12px;\n  padding: 0.72rem 0 0.35rem 2.9rem;\n  align-items: center;\n"], ["\n  display: flex;\n  gap: 12px;\n  padding: 0.72rem 0 0.35rem 2.9rem;\n  align-items: center;\n"])));
var StatusBulb = styled_components_1.default.span(templateObject_30 || (templateObject_30 = __makeTemplateObject(["\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2px solid #fff;\n  background: ", ";\n  box-shadow: 0 0 6px ", "66;\n  opacity: ", ";\n  transition: opacity 0.18s;\n"], ["\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2px solid #fff;\n  background: ", ";\n  box-shadow: 0 0 6px ", "66;\n  opacity: ", ";\n  transition: opacity 0.18s;\n"])), function (_a) {
    var $color = _a.$color;
    return $color;
}, function (_a) {
    var $color = _a.$color;
    return $color;
}, function (_a) {
    var $active = _a.$active;
    return ($active ? 1 : 0.55);
});
// ================== VEND BUTTON ======================
var VendButton = styled_components_1.default.button(templateObject_31 || (templateObject_31 = __makeTemplateObject(["\n  margin: 1.32rem auto 0.4rem auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 109px;\n  height: 62px;\n  border: none;\n  background: linear-gradient(\n    105deg,\n    ", " 79%,\n    ", " 100%\n  );\n  border-radius: 100px;\n  box-shadow: ", ";\n  padding: 0;\n  outline: none;\n  color: #fff;\n  font-size: 1.35em;\n  font-weight: 680;\n  cursor: pointer;\n  user-select: none;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  animation: ", " 2.3s infinite;\n  position: relative;\n  z-index: 2;\n  &:hover,\n  &:focus-visible {\n    box-shadow: 0 0 18px #00ffd0, 0 4px 16px #57ecff33, 0 0 0 4px #00ffd088;\n    outline: none;\n  }\n  &:disabled {\n    opacity: 0.72;\n    animation: none;\n    cursor: not-allowed;\n    background: #6949ff99;\n  }\n"], ["\n  margin: 1.32rem auto 0.4rem auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 109px;\n  height: 62px;\n  border: none;\n  background: linear-gradient(\n    105deg,\n    ", " 79%,\n    ", " 100%\n  );\n  border-radius: 100px;\n  box-shadow: ", ";\n  padding: 0;\n  outline: none;\n  color: #fff;\n  font-size: 1.35em;\n  font-weight: 680;\n  cursor: pointer;\n  user-select: none;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  animation: ", " 2.3s infinite;\n  position: relative;\n  z-index: 2;\n  &:hover,\n  &:focus-visible {\n    box-shadow: 0 0 18px #00ffd0, 0 4px 16px #57ecff33, 0 0 0 4px #00ffd088;\n    outline: none;\n  }\n  &:disabled {\n    opacity: 0.72;\n    animation: none;\n    cursor: not-allowed;\n    background: #6949ff99;\n  }\n"])), tokens.color.primary, tokens.color.accent, tokens.shadow.neon, neonPulse);
// =============== OUTPUT SLOT + ACTIONS =============
var OutputSlot = styled_components_1.default.section(templateObject_33 || (templateObject_33 = __makeTemplateObject(["\n  margin: 1.9rem auto 0 auto;\n  width: 99%;\n  max-width: 660px;\n  min-width: 255px;\n  min-height: 162px;\n  background: linear-gradient(110deg, #fff1 10%, #a970ff22 100%);\n  border-radius: ", ";\n  border: 2.7px solid\n    ", ";\n  box-shadow: ", ";\n  position: relative;\n  overflow: hidden;\n  animation: ", ";\n  z-index: 4;\n  will-change: transform, opacity, box-shadow;\n  transition: box-shadow 0.6s cubic-bezier(0.44, 1.11, 0.35, 1.04),\n    border-color 0.5s cubic-bezier(0.44, 1.11, 0.35, 1.04);\n"], ["\n  margin: 1.9rem auto 0 auto;\n  width: 99%;\n  max-width: 660px;\n  min-width: 255px;\n  min-height: 162px;\n  background: linear-gradient(110deg, #fff1 10%, #a970ff22 100%);\n  border-radius: ", ";\n  border: 2.7px solid\n    ", ";\n  box-shadow: ", ";\n  position: relative;\n  overflow: hidden;\n  animation: ", ";\n  z-index: 4;\n  will-change: transform, opacity, box-shadow;\n  transition: box-shadow 0.6s cubic-bezier(0.44, 1.11, 0.35, 1.04),\n    border-color 0.5s cubic-bezier(0.44, 1.11, 0.35, 1.04);\n"])), tokens.radius.pill, function (_a) {
    var $error = _a.$error;
    return ($error ? tokens.color.error : tokens.color.secondary);
}, function (_a) {
    var $error = _a.$error;
    return $error
        ? "0 2px 22px #FF6BFF44, 0 5px 26px #EF444466"
        : "0 2px 16px #6949FF22, 0 4.5px 22px #00ffd022";
}, function (_a) {
    var $show = _a.$show;
    return $show
        ? (0, styled_components_1.css)(templateObject_32 || (templateObject_32 = __makeTemplateObject(["\n          ", " ", ", ", " 1.1s;\n        "], ["\n          ", " ", ", ", " 1.1s;\n        "])), slotReveal, tokens.timing.keyframeFast, slotGlow) : "none";
});
// fake slot door
var OutputDoor = styled_components_1.default.div(templateObject_34 || (templateObject_34 = __makeTemplateObject(["\n  width: 98.3%;\n  height: 34px;\n  margin: 0 auto;\n  background: #1a1a23e3;\n  border-radius: 10px;\n  border: 2px solid #00ffd0;\n  box-shadow: 0 2px 9px #a970ffaa;\n  position: absolute;\n  top: ", ";\n  left: 1%;\n  right: 1%;\n  z-index: 6;\n  opacity: ", ";\n  transition: top 0.4s, opacity 0.48s;\n"], ["\n  width: 98.3%;\n  height: 34px;\n  margin: 0 auto;\n  background: #1a1a23e3;\n  border-radius: 10px;\n  border: 2px solid #00ffd0;\n  box-shadow: 0 2px 9px #a970ffaa;\n  position: absolute;\n  top: ", ";\n  left: 1%;\n  right: 1%;\n  z-index: 6;\n  opacity: ", ";\n  transition: top 0.4s, opacity 0.48s;\n"])), function (_a) {
    var $revealed = _a.$revealed;
    return ($revealed ? "-45px" : "12px");
}, function (_a) {
    var $revealed = _a.$revealed;
    return ($revealed ? 0 : 0.91);
});
var OutputPre = styled_components_1.default.pre(templateObject_36 || (templateObject_36 = __makeTemplateObject(["\n  font-family: ", ";\n  background: none;\n  color: ", ";\n  font-size: 0.99rem;\n  border: none;\n  border-radius: 5px;\n  margin: 32px 8px 0 24px;\n  padding: 8px 8px 8px 11px;\n  min-height: 76px;\n  max-width: 97%;\n  box-shadow: 0 2px 16px #00ffd044;\n  white-space: pre-wrap;\n  word-break: break-all;\n  overflow-x: auto;\n  outline: none;\n  &:focus {\n    box-shadow: 0 0 0 3px #6949ff33;\n  }\n  ", "\n"], ["\n  font-family: ", ";\n  background: none;\n  color: ", ";\n  font-size: 0.99rem;\n  border: none;\n  border-radius: 5px;\n  margin: 32px 8px 0 24px;\n  padding: 8px 8px 8px 11px;\n  min-height: 76px;\n  max-width: 97%;\n  box-shadow: 0 2px 16px #00ffd044;\n  white-space: pre-wrap;\n  word-break: break-all;\n  overflow-x: auto;\n  outline: none;\n  &:focus {\n    box-shadow: 0 0 0 3px #6949ff33;\n  }\n  ", "\n"])), tokens.font.mono, function (_a) {
    var $error = _a.$error;
    return ($error ? tokens.color.error : tokens.color.accent);
}, function (_a) {
    var $animate = _a.$animate, $error = _a.$error;
    return $animate && (0, styled_components_1.css)(templateObject_35 || (templateObject_35 = __makeTemplateObject(["\n      animation: ", " 0.75s\n        cubic-bezier(0.27, 0.99, 0.44, 1);\n    "], ["\n      animation: ", " 0.75s\n        cubic-bezier(0.27, 0.99, 0.44, 1);\n    "])), $error ? errorPop : codePop);
});
var OutputActionsBar = styled_components_1.default.div(templateObject_37 || (templateObject_37 = __makeTemplateObject(["\n  display: flex;\n  gap: 16px;\n  margin: 12px 0 13px 24px;\n"], ["\n  display: flex;\n  gap: 16px;\n  margin: 12px 0 13px 24px;\n"])));
var OutputActionBtn = styled_components_1.default.button(templateObject_38 || (templateObject_38 = __makeTemplateObject(["\n  background: linear-gradient(\n    120deg,\n    ", "30 60%,\n    #fff3\n  );\n  border: 2px solid ", ";\n  color: #fff;\n  padding: 7.5px 19px 7.5px 14px;\n  font-family: ", ";\n  font-size: 1.08rem;\n  border-radius: ", ";\n  cursor: pointer;\n  margin-right: 8px;\n  transition: background 0.14s, box-shadow 0.18s;\n  box-shadow: 0 1.5px 12px ", "22;\n  outline: none;\n  display: flex;\n  gap: 5.5px;\n  align-items: center;\n  will-change: transform, box-shadow;\n  &:focus {\n    box-shadow: ", ";\n    border-color: ", ";\n  }\n  &:hover:not(:disabled) {\n    background: ", ";\n    box-shadow: 0 0 0 2.5px ", ";\n    transform: scale(1.07);\n  }\n  &:active {\n    background: ", ";\n  }\n  &:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n"], ["\n  background: linear-gradient(\n    120deg,\n    ", "30 60%,\n    #fff3\n  );\n  border: 2px solid ", ";\n  color: #fff;\n  padding: 7.5px 19px 7.5px 14px;\n  font-family: ", ";\n  font-size: 1.08rem;\n  border-radius: ", ";\n  cursor: pointer;\n  margin-right: 8px;\n  transition: background 0.14s, box-shadow 0.18s;\n  box-shadow: 0 1.5px 12px ", "22;\n  outline: none;\n  display: flex;\n  gap: 5.5px;\n  align-items: center;\n  will-change: transform, box-shadow;\n  &:focus {\n    box-shadow: ", ";\n    border-color: ", ";\n  }\n  &:hover:not(:disabled) {\n    background: ", ";\n    box-shadow: 0 0 0 2.5px ", ";\n    transform: scale(1.07);\n  }\n  &:active {\n    background: ", ";\n  }\n  &:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n"])), function (_a) {
    var $color = _a.$color;
    return $color !== null && $color !== void 0 ? $color : tokens.color.accent;
}, function (_a) {
    var $color = _a.$color;
    return $color !== null && $color !== void 0 ? $color : tokens.color.accent;
}, tokens.font.body, tokens.radius.action, function (_a) {
    var $color = _a.$color;
    return $color !== null && $color !== void 0 ? $color : tokens.color.accent;
}, tokens.shadow.focus, function (_a) {
    var $color = _a.$color;
    return $color !== null && $color !== void 0 ? $color : tokens.color.accent;
}, function (_a) {
    var $color = _a.$color;
    return ($color ? "".concat($color, "1A") : "#00FFD01A");
}, function (_a) {
    var $color = _a.$color;
    return $color !== null && $color !== void 0 ? $color : tokens.color.accent;
}, function (_a) {
    var $color = _a.$color;
    return ($color ? "".concat($color, "36") : "#00FFD03A");
});
// =============== ASSET PREVIEW MODAL ===============
var AssetPreviewModalOverlay = (0, styled_components_1.default)(PaymentModalOverlay)(templateObject_39 || (templateObject_39 = __makeTemplateObject(["\n  background: #1b1836af;\n  z-index: ", ";\n"], ["\n  background: #1b1836af;\n  z-index: ", ";\n"])), tokens.z.overlay);
var AssetPreviewCard = (0, styled_components_1.default)(ModalCard)(templateObject_40 || (templateObject_40 = __makeTemplateObject(["\n  max-width: 468px;\n  min-width: 274px;\n  align-items: center;\n  gap: 20px;\n"], ["\n  max-width: 468px;\n  min-width: 274px;\n  align-items: center;\n  gap: 20px;\n"])));
var PreviewImg = styled_components_1.default.img(templateObject_41 || (templateObject_41 = __makeTemplateObject(["\n  max-width: 314px;\n  max-height: 210px;\n  border-radius: 18px;\n  box-shadow: 0 0 16px #00ffd044, 0 6px 24px #0007;\n  background: #131a49aa;\n"], ["\n  max-width: 314px;\n  max-height: 210px;\n  border-radius: 18px;\n  box-shadow: 0 0 16px #00ffd044, 0 6px 24px #0007;\n  background: #131a49aa;\n"])));
var PreviewText = styled_components_1.default.pre(templateObject_42 || (templateObject_42 = __makeTemplateObject(["\n  color: #00ffd0;\n  background: none;\n  font-family: ", ";\n  font-size: 1.01em;\n  text-align: center;\n"], ["\n  color: #00ffd0;\n  background: none;\n  font-family: ", ";\n  font-size: 1.01em;\n  text-align: center;\n"])), tokens.font.mono);
var initialPayment = {
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
    var _this = this;
    if (window.mirageActive)
        return;
    window.mirageActive = true;
    var assets = [];
    window.fetch = function (url, opt) { return __awaiter(_this, void 0, void 0, function () {
        var body, b, f, fakeUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // @ts-ignore
                    if (!url.match(/^\/?api/))
                        return [2 /*return*/, fetch(url, opt)];
                    if (!url.includes("/api/generate")) return [3 /*break*/, 2];
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 800); })];
                case 1:
                    _a.sent();
                    body = JSON.parse(opt.body || "{}");
                    if (/error/i.test(body.prompt || "")) {
                        return [2 /*return*/, new Response(JSON.stringify({
                                ok: false,
                                message: "Simulated GPT error! Try again.",
                            }), { status: 400 })];
                    }
                    return [2 /*return*/, new Response(JSON.stringify({
                            ok: true,
                            code: "// Generated code for: " +
                                (body.prompt || "N/A") +
                                "\n// " +
                                (body.assets && body.assets.length
                                    ? "Assets: " + body.assets.map(function (a) { return a.name; }).join(", ")
                                    : "No assets attached.") +
                                "\n\nfunction vendingMachineSuccess() {\n  alert('Enjoy! 🚀');\n}\n",
                        }), { status: 200 })];
                case 2:
                    if (!url.includes("/api/payment")) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 700); })];
                case 3:
                    _a.sent();
                    b = JSON.parse(opt.body || "{}");
                    if (!/4242424242424242|4111111111111111/.test(b.cardNumber)) {
                        return [2 /*return*/, new Response(JSON.stringify({
                                ok: false,
                                error: "Invalid demo card! Use 4242 4242 4242 4242",
                            }), { status: 400 })];
                    }
                    return [2 /*return*/, new Response(JSON.stringify({ ok: true, paid: true }), {
                            status: 200,
                        })];
                case 4:
                    if (!url.includes("/api/sandbox")) return [3 /*break*/, 6];
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 450); })];
                case 5:
                    _a.sent();
                    return [2 /*return*/, new Response(JSON.stringify({
                            ok: true,
                            url: "https://codesandbox.io/s/mocked-box-xyz",
                        }))];
                case 6:
                    if (!url.includes("/api/github")) return [3 /*break*/, 8];
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 750); })];
                case 7:
                    _a.sent();
                    return [2 /*return*/, new Response(JSON.stringify({ ok: true, url: "https://github.com/your-mocked-repo" }))];
                case 8:
                    if (!url.includes("/api/upload")) return [3 /*break*/, 10];
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 320); })];
                case 9:
                    _a.sent();
                    f = JSON.parse(opt.body || "{}");
                    fakeUrl = "https://mock.assets/" + f.name;
                    assets.push(__assign(__assign({}, f), { url: fakeUrl }));
                    return [2 /*return*/, new Response(JSON.stringify({ ok: true, url: fakeUrl }))];
                case 10: return [2 /*return*/, new Response(JSON.stringify({}), { status: 200 })];
            }
        });
    }); };
}
function useMirageApi() {
    var _this = this;
    // All API abstractions via `useMirageApi`
    return {
        generate: function (prompt, assets) { return __awaiter(_this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/generate", {
                            method: "POST",
                            body: JSON.stringify({
                                prompt: prompt,
                                assets: assets.map(function (a) { return ({ name: a.name, type: a.type }); }),
                            }),
                        })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.json()];
                }
            });
        }); },
        pay: function (card) { return __awaiter(_this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/payment", {
                            method: "POST",
                            body: JSON.stringify(card),
                        })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.json()];
                }
            });
        }); },
        sandbox: function (code) { return __awaiter(_this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/sandbox", {
                            method: "POST",
                            body: JSON.stringify({ code: code }),
                        })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.json()];
                }
            });
        }); },
        github: function (code) { return __awaiter(_this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/github", {
                            method: "POST",
                            body: JSON.stringify({ code: code }),
                        })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.json()];
                }
            });
        }); },
        upload: function (file) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 330); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { url: "https://mock.assets/" + file.name }];
                }
            });
        }); },
    };
}
// =================== APP MAIN ========================
function App() {
    var _this = this;
    // ---- STATE ----
    var _a = (0, react_1.useState)(""), prompt = _a[0], setPrompt = _a[1];
    var _b = (0, react_1.useState)(false), promptFocus = _b[0], setPromptFocus = _b[1];
    var _c = (0, react_1.useState)(""), promptError = _c[0], setPromptError = _c[1];
    var _d = (0, react_1.useState)([]), assets = _d[0], setAssets = _d[1];
    var _e = (0, react_1.useState)(false), assetInputActive = _e[0], setAssetInputActive = _e[1];
    var _f = (0, react_1.useState)(""), assetLive = _f[0], setAssetLive = _f[1];
    var _g = (0, react_1.useState)(null), assetPreview = _g[0], setAssetPreview = _g[1];
    var _h = (0, react_1.useState)(initialPayment), payment = _h[0], setPayment = _h[1];
    var _j = (0, react_1.useState)(false), vending = _j[0], setVending = _j[1];
    var _k = (0, react_1.useState)(""), output = _k[0], setOutput = _k[1];
    var _l = (0, react_1.useState)("idle"), vendStatus = _l[0], setVendStatus = _l[1];
    var _m = (0, react_1.useState)(false), copied = _m[0], setCopied = _m[1];
    var _o = (0, react_1.useState)(false), outputSlotAnimated = _o[0], setOutputSlotAnimated = _o[1];
    var _p = (0, react_1.useState)(false), outputError = _p[0], setOutputError = _p[1];
    // Ref for accessibility
    var promptRef = (0, react_1.useRef)(null);
    var modalRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        createMirageServer();
    }, []);
    var api = useMirageApi();
    // Output slot animation debounce on vend
    (0, react_1.useEffect)(function () {
        if (output) {
            setOutputSlotAnimated(false);
            setTimeout(function () { return setOutputSlotAnimated(true); }, 28);
        }
    }, [output]);
    // Update output error for animation
    (0, react_1.useEffect)(function () {
        if (vendStatus === "error")
            setOutputError(true);
        else
            setOutputError(false);
    }, [vendStatus]);
    // ===============================================
    // ----------- PROMPT HANDLERS ------------------
    // ===============================================
    var onPromptInput = function (e) {
        setPrompt(e.target.value);
        if (e.target.value.length < 4)
            setPromptError("Enter a longer prompt.");
        else
            setPromptError("");
    };
    var handlePromptFocus = function () { return setPromptFocus(true); };
    var handlePromptBlur = function () { return setPromptFocus(false); };
    // ===============================================
    // ------------ ASSET UPLOADER -------------------
    // ===============================================
    // Drag n Drop support
    var handleAssetDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setAssetInputActive(false);
        var files = Array.from(e.dataTransfer.files || []);
        assetFileAdd(files);
    };
    var handleAssetDragOver = function (e) {
        e.preventDefault();
        setAssetInputActive(true);
    };
    var handleAssetDragLeave = function (e) {
        e.preventDefault();
        setAssetInputActive(false);
    };
    var assetFileAdd = function (files) { return __awaiter(_this, void 0, void 0, function () {
        var arr, _loop_1, _i, arr_1, file, state_1;
        return __generator(this, function (_a) {
            arr = Array.from(files);
            _loop_1 = function (file) {
                if (assets.length >= 8)
                    return "break";
                var type = "text";
                if (/image/i.test(file.type))
                    type = "image";
                if (/pdf/i.test(file.type))
                    type = "pdf";
                if (/audio/i.test(file.type))
                    type = "audio";
                if (/video/i.test(file.type))
                    type = "video";
                if (/csv/i.test(file.name))
                    type = "csv";
                if (/zip/i.test(file.name))
                    type = "zip";
                setAssets(function (prev) { return __spreadArray(__spreadArray([], prev, true), [
                    {
                        id: Math.random().toString(36).slice(2),
                        name: file.name,
                        type: type,
                        file: file,
                        previewUrl: type === "image" ? URL.createObjectURL(file) : undefined,
                    },
                ], false); });
                setAssetLive("".concat(file.name, " uploaded"));
            };
            for (_i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                file = arr_1[_i];
                state_1 = _loop_1(file);
                if (state_1 === "break")
                    break;
            }
            return [2 /*return*/];
        });
    }); };
    // "Add Link" asset
    var handleAddLink = function () {
        var url = prompt("Paste asset URL/link:");
        if (url && url.trim()) {
            setAssets(function (prev) { return __spreadArray(__spreadArray([], prev, true), [
                {
                    id: Math.random().toString(36).slice(2),
                    name: url,
                    type: "link",
                    url: url,
                },
            ], false); });
            setAssetLive("Link added.");
        }
    };
    // Remove asset
    var removeAsset = function (id) {
        setAssets(function (prev) { return prev.filter(function (a) { return a.id !== id; }); });
        setAssetLive("Asset removed.");
    };
    // Preview asset
    var openAssetPreview = function (asset) { return setAssetPreview({ asset: asset }); };
    var closeAssetPreview = function () { return setAssetPreview(null); };
    // ===============================================
    // --------------- PAYMENT MODAL -----------------
    // ===============================================
    var openPayment = function () { return setPayment(function (p) { return (__assign(__assign({}, p), { shown: true })); }); };
    var closePayment = function () { return setPayment(initialPayment); };
    var onCardField = function (e) {
        setPayment(function (p) {
            var _a;
            return (__assign(__assign({}, p), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        });
    };
    // Payment submit
    var tryPay = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var cardNumber, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setPayment(function (p) { return (__assign(__assign({}, p), { loading: true, error: "" })); });
                    cardNumber = payment.cardNumber.replace(/[\s-]/g, "");
                    if (!payment.cardName.trim() ||
                        !/^\d{4,}$/.test(cardNumber) ||
                        !/^[0-9]{2}\/[0-9]{2}$/.test(payment.expiry) ||
                        !/^[0-9]{3,4}$/.test(payment.cvv)) {
                        setPayment(function (p) { return (__assign(__assign({}, p), { loading: false, error: "All fields required. 4242(16) for demo." })); });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, api.pay({
                            cardName: payment.cardName,
                            cardNumber: cardNumber,
                            expiry: payment.expiry,
                            cvv: payment.cvv,
                        })];
                case 1:
                    resp = _a.sent();
                    if (!resp.ok) {
                        setPayment(function (p) { return (__assign(__assign({}, p), { loading: false, error: resp.error || "Payment failed. Use 4242 4242..." })); });
                    }
                    else {
                        setPayment(function (p) { return (__assign(__assign({}, initialPayment), { shown: false, paid: true })); });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    // Focus trap for modals
    (0, react_1.useEffect)(function () {
        if (payment.shown) {
            var handle_1 = function (e) {
                if (e.key === "Escape") {
                    closePayment();
                }
            };
            window.addEventListener("keydown", handle_1, true);
            return function () { return window.removeEventListener("keydown", handle_1, true); };
        }
    }, [payment.shown]);
    // ===============================================
    // --------------- VENDING ACTION ----------------
    // ===============================================
    var canVend = prompt.trim().length > 3 &&
        payment.paid &&
        !promptError &&
        assets.length < 8 &&
        !vending;
    // VEND the prompt/code!
    var vend = function () { return __awaiter(_this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!canVend) {
                        setPromptError("Check fields and try again.");
                        return [2 /*return*/];
                    }
                    setVending(true);
                    setVendStatus("loading");
                    setOutput("");
                    return [4 /*yield*/, api.generate(prompt, assets)];
                case 1:
                    resp = _a.sent();
                    if (resp && resp.ok && resp.code) {
                        setVendStatus("success");
                        setOutput(resp.code);
                        setPromptError("");
                    }
                    else {
                        setVendStatus("error");
                        setOutput(resp.message || "An error occurred!");
                        setPromptError(resp.message || "Unable to vending prompt.");
                    }
                    setVending(false);
                    setTimeout(function () { return setVendStatus("idle"); }, 2500);
                    return [2 /*return*/];
            }
        });
    }); };
    // Output Actions: Copy/Sandbox/Github
    var handleCopy = function () {
        if (!output)
            return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(function () { return setCopied(false); }, 1100);
    };
    var handleSandbox = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setVendStatus("loading");
                    return [4 /*yield*/, api.sandbox(output)];
                case 1:
                    _a.sent();
                    setVendStatus("success");
                    setTimeout(function () { return setVendStatus("idle"); }, 700);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleGithub = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setVendStatus("loading");
                    return [4 /*yield*/, api.github(output)];
                case 1:
                    _a.sent();
                    setVendStatus("success");
                    setTimeout(function () { return setVendStatus("idle"); }, 700);
                    return [2 /*return*/];
            }
        });
    }); };
    // =============== RENDER ==============
    return (<styled_components_1.ThemeProvider theme={tokens}>
            <GlobalFonts />
            <Shell aria-label="Vending Machine GPT app" role="application" tabIndex={-1}>
                <Frame aria-hidden="true"/>
                <NeonHeader>Vending Machine GPT</NeonHeader>

                {/* PROMPT INPUT */}
                <PromptArea tabIndex={0} aria-label="Enter prompt for GPT vending">
                    <PromptInput ref={promptRef} value={prompt} onChange={onPromptInput} onFocus={handlePromptFocus} onBlur={handlePromptBlur} $hasError={!!promptError} placeholder="Describe your GPT code, tool, script, or idea here…" aria-invalid={!!promptError} aria-describedby="prompt-help" maxLength={300}/>
                    <PromptHelp $show={promptFocus || !!promptError} id="prompt-help">
                        {promptError
            ? promptError
            : "Type your request (min. 4 chars). Attach assets, then Pay $2 and VEND!"}
                    </PromptHelp>
                </PromptArea>

                {/* ASSET UPLOADER */}
                <UploaderArea $active={assetInputActive} tabIndex={0} role="group" aria-label="Asset uploader" onDragOver={handleAssetDragOver} onDragLeave={handleAssetDragLeave} onDrop={handleAssetDrop}>
                    <ChipStack>
                        {assets.map(function (a, i) { return (<AssetChip key={a.id} $type={a.type} tabIndex={0} role="button" aria-label={"Asset: ".concat(a.name || a.type)} onClick={function () { return openAssetPreview(a); }} title={a.name}>
                                <AssetSVG type={a.type}/>
                                {truncateMiddle(a.name, 24)}
                                <RemoveChip aria-label="Remove asset" title="Remove" onClick={function (e) {
                e.stopPropagation();
                removeAsset(a.id);
            }} tabIndex={0}>
                                    ×
                                </RemoveChip>
                            </AssetChip>); })}
                        {assets.length < 8 && (<>
                                <AddAssetChip tabIndex={0} aria-label="Add asset file">
                                    <svg width={18} height={18} viewBox="0 0 24 24">
                                        <circle cx={12} cy={12} r={9} fill="#00FFD0" opacity="0.14"/>
                                        <path d="M12 7v10M7 12h10" stroke="#00FFD0" strokeWidth={2} strokeLinecap="round"/>
                                    </svg>
                                    <input type="file" accept="*" multiple onChange={function (e) { return assetFileAdd(e.target.files); }}/>
                                    Add File
                                </AddAssetChip>
                                <AddAssetChip as="button" type="button" onClick={handleAddLink} tabIndex={0} aria-label="Add asset link">
                                    <svg width={18} height={18} viewBox="0 0 24 24">
                                        <rect x={7} y={11} width={10} height={3} rx={1} fill="#00FFD0" opacity="0.18"/>
                                        <circle cx={12} cy={13} r={6} stroke="#00FFD0" strokeWidth={2} fill="none"/>
                                    </svg>
                                    Add Link
                                </AddAssetChip>
                            </>)}
                    </ChipStack>
                    <AriaLiveRegion>{assetLive}</AriaLiveRegion>
                </UploaderArea>

                {/* CHECKOUT BUTTON + PAYMENT MODAL */}
                <CheckoutBtn type="button" aria-label="Checkout and pay $2" onClick={openPayment} disabled={payment.paid || vending}>
                    {payment.paid ? "Paid ✔" : "Pay $2"}
                </CheckoutBtn>
                {payment.shown && (<PaymentModalOverlay tabIndex={-1} aria-modal="true" aria-label="Payment modal" onClick={closePayment}>
                        <ModalCard ref={modalRef} tabIndex={0} role="dialog" aria-label="Credit card details" onClick={function (e) { return e.stopPropagation(); }}>
                            <ModalCloseBtn aria-label="Close payment modal" onClick={closePayment}>
                                ×
                            </ModalCloseBtn>
                            <form onSubmit={tryPay}>
                                <CardField name="cardName" autoFocus autoComplete="cc-name" placeholder="Name on Card" value={payment.cardName} onChange={onCardField} aria-label="Name on card" required/>
                                <CardField name="cardNumber" autoComplete="cc-number" placeholder="Card Number (4242 4242...)" value={payment.cardNumber} onChange={onCardField} aria-label="Card number" required/>
                                <CardField name="expiry" autoComplete="cc-exp" placeholder="MM/YY" value={payment.expiry} onChange={onCardField} aria-label="Expiry" required/>
                                <CardField name="cvv" autoComplete="cc-csc" placeholder="CVV" value={payment.cvv} onChange={onCardField} aria-label="CVV" required/>
                                {payment.error && <ErrorField>{payment.error}</ErrorField>}
                                <PayNowBtn $loading={payment.loading} type="submit" disabled={payment.loading}>
                                    {payment.loading ? "Processing…" : "Confirm & Pay $2"}
                                </PayNowBtn>
                            </form>
                        </ModalCard>
                    </PaymentModalOverlay>)}

                {/* STATUS LIGHTS */}
                <StatusLightsBar>
                    <StatusBulb $color={tokens.color.info} $active={vendStatus === "idle"} role="img" aria-label="Idle"/>
                    <StatusBulb $color={tokens.color.accent} $active={vendStatus === "loading"} role="img" aria-label="Loading"/>
                    <StatusBulb $color={tokens.color.success} $active={vendStatus === "success"} role="img" aria-label="Success"/>
                    <StatusBulb $color={tokens.color.error} $active={vendStatus === "error"} role="img" aria-label="Error"/>
                </StatusLightsBar>

                {/* VEND BUTTON */}
                <VendButton $loading={vending} $disabled={!canVend} aria-label="Vend code" tabIndex={0} type="button" onClick={vend} disabled={!canVend}>
                    {vending ? "Vending…" : "VEND"}
                </VendButton>

                {/* OUTPUT SLOT/RESULTS */}
                {output && (<OutputSlot $show={outputSlotAnimated} $error={outputError} aria-label="Vend result code slot" aria-live="polite" tabIndex={0} role="region">
                        <OutputDoor $revealed={true} aria-hidden="true"/>
                        <OutputPre tabIndex={0} aria-label={outputError ? "Error output code" : "GPT output code"} $animate={outputSlotAnimated} $error={outputError} style={{
                marginTop: "35px",
                marginBottom: "8px",
                outline: "none",
                background: "none",
            }}>
                            {output}
                        </OutputPre>
                        <OutputActionsBar>
                            <OutputActionBtn $color={tokens.color.accent} aria-label="Copy code to clipboard" onClick={handleCopy} tabIndex={0} disabled={!output}>
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <rect x="4.5" y="4.5" width="13" height="15" rx="5" fill="#00FFD0" stroke="#A970FF" strokeWidth="1.6"/>
                                    <rect x="7" y="7" width="10" height="13" rx="4" fill="#fff0" stroke="#00FFD0" strokeWidth="1.1"/>
                                </svg>
                                {copied ? "Copied!" : "Copy"}
                            </OutputActionBtn>
                            <OutputActionBtn $color={tokens.color.infoLight} aria-label="Open in CodeSandbox" onClick={handleSandbox} tabIndex={0} disabled={!output}>
                                <svg width="18" height="18" viewBox="0 0 24 24">
                                    <ellipse cx="12" cy="12" rx="9" ry="8.5" fill="#3B82F6"/>
                                    <text x="12" y="15" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Inter">
                                        S
                                    </text>
                                </svg>
                                Sandbox
                            </OutputActionBtn>
                            <OutputActionBtn $color="#222" aria-label="Export to GitHub (mocked)" onClick={handleGithub} tabIndex={0} disabled={!output}>
                                <svg width="18" height="18" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="9" fill="#222"/>
                                    <text x="12" y="15" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Inter">
                                        GH
                                    </text>
                                </svg>
                                Github
                            </OutputActionBtn>
                        </OutputActionsBar>
                    </OutputSlot>)}

                {/* ASSET PREVIEW MODAL */}
                {assetPreview && (<AssetPreviewModalOverlay role="dialog" tabIndex={-1} aria-modal="true" aria-label={"Asset preview: ".concat(assetPreview.asset.name)} onClick={closeAssetPreview}>
                        <AssetPreviewCard tabIndex={0} onClick={function (e) { return e.stopPropagation(); }} aria-describedby="asset-preview-field">
                            <ModalCloseBtn aria-label="Close asset preview" onClick={closeAssetPreview}>
                                ×
                            </ModalCloseBtn>
                            {assetPreview.asset.type === "image" &&
                assetPreview.asset.previewUrl && (<PreviewImg src={assetPreview.asset.previewUrl} alt={assetPreview.asset.name}/>)}
                            {assetPreview.asset.type === "pdf" && (<PreviewText id="asset-preview-field">
                                    PDF asset: {assetPreview.asset.name}
                                </PreviewText>)}
                            {assetPreview.asset.type === "audio" && (<>
                                    <PreviewText>
                                        Audio asset: {assetPreview.asset.name}
                                    </PreviewText>
                                    <audio controls src={assetPreview.asset.previewUrl} style={{ maxWidth: "250px" }}/>
                                </>)}
                            {assetPreview.asset.type === "video" && (<>
                                    <PreviewText>
                                        Video asset: {assetPreview.asset.name}
                                    </PreviewText>
                                    <video controls width={230} src={assetPreview.asset.previewUrl}/>
                                </>)}
                            {assetPreview.asset.type === "link" && (<PreviewText>
                                    <a href={assetPreview.asset.url} target="_blank" rel="noopener noreferrer">
                                        {assetPreview.asset.name}
                                    </a>
                                </PreviewText>)}
                            {["zip", "csv"].includes(assetPreview.asset.type) && (<PreviewText>
                                    {assetPreview.asset.type.toUpperCase()} file:{" "}
                                    {assetPreview.asset.name}
                                </PreviewText>)}
                            {"name" in assetPreview.asset &&
                ![
                    "image",
                    "video",
                    "audio",
                    "pdf",
                    "link",
                    "zip",
                    "csv",
                ].includes(assetPreview.asset.type) && (<PreviewText>Asset: {assetPreview.asset.name}</PreviewText>)}
                        </AssetPreviewCard>
                    </AssetPreviewModalOverlay>)}
            </Shell>
        </styled_components_1.ThemeProvider>);
}
// ============= ASSET SVG ICONS (INLINE) =================
function AssetSVG(_a) {
    var type = _a.type;
    if (type === "image")
        return (<svg width="18" height="18" viewBox="0 0 22 22" style={{ marginRight: 5 }}>
                <rect x="2.5" y="2.5" width="17" height="13" rx="3" fill="#57ECFF33" stroke="#00FFD0" strokeWidth="1.3"/>
                <circle cx="7.7" cy="7.7" r="2" fill="#00FFD0"/>
                <path d="M4 15l7-7 7 8" stroke="#57ECFF" strokeWidth="1.5" fill="none"/>
            </svg>);
    if (type === "pdf")
        return (<svg width="17" height="17" viewBox="0 0 17 17" style={{ marginRight: 5 }}>
                <rect x="2.3" y="2.3" width="12" height="12" rx="2.5" fill="#FF6BFF22" stroke="#FF6BFF" strokeWidth="1.2"/>
                <text x="8.8" y="11.7" textAnchor="middle" fontSize="7.2" fill="#FF6BFF" fontFamily="Montserrat">
                    PDF
                </text>
            </svg>);
    if (type === "audio")
        return (<svg width="17" height="17" viewBox="0 0 18 18" style={{ marginRight: 5 }}>
                <rect x="2.5" y="4" width="4" height="10" rx="2" fill="#22D9FF"/>
                <path d="M8 9a3 3 0 0 1 6 0a3 3 0 0 1-6 0z" fill="#fff0" stroke="#22D9FF" strokeWidth="1.2"/>
                <path d="M13.2 9a4.3 4.3 0 0 1 2.2 3.6" stroke="#00FFD0" strokeWidth="1.1" fill="none"/>
            </svg>);
    if (type === "video")
        return (<svg width="17" height="17" viewBox="0 0 18 18" style={{ marginRight: 5 }}>
                <rect x="2.5" y="4" width="9" height="10" rx="3" fill="#A970FF44" stroke="#6949FF" strokeWidth="1.2"/>
                <polygon points="11,7 15,9 11,11" fill="#00FFD0"/>
            </svg>);
    if (type === "csv")
        return (<svg width="17" height="17" viewBox="0 0 18 18" style={{ marginRight: 5 }}>
                <rect x="2" y="2" width="14" height="14" rx="2.5" fill="#00FFD033" stroke="#00FFD0" strokeWidth="1.2"/>
                <text x="8.9" y="13" textAnchor="middle" fontSize="8" fill="#00FFD0" fontFamily="Montserrat">
                    CSV
                </text>
            </svg>);
    if (type === "zip")
        return (<svg width="17" height="17" viewBox="0 0 18 18" style={{ marginRight: 5 }}>
                <rect x="2" y="2" width="14" height="14" rx="3" fill="#FDDEFF33" stroke="#A970FF" strokeWidth="1.1"/>
                <path d="M9 4v9 M7 5v1 M11 5v1 M7 7v1 M11 7v1" stroke="#A970FF" strokeWidth="1.18"/>
            </svg>);
    if (type === "link")
        return (<svg width="17" height="17" viewBox="0 0 18 18" style={{ marginRight: 5 }}>
                <rect x="3.3" y="6.3" width="7.5" height="5.5" rx="2.2" fill="#fff0" stroke="#00FFD0" strokeWidth="1.1"/>
                <rect x="8.9" y="6.3" width="5.5" height="5.5" rx="2.3" fill="#fff0" stroke="#A970FF" strokeWidth="1.1"/>
                <path d="M8 9h2" stroke="#57ECFF" strokeWidth="1.2"/>
            </svg>);
    if (type === "chiptune")
        return (<svg width="17" height="17" viewBox="0 0 17 17" style={{ marginRight: 5 }}>
                <rect x="3" y="4" width="11" height="9" rx="2" fill="#fff0" stroke="#00FFD0" strokeWidth="1"/>
                <rect x="5" y="6" width="7" height="5" rx="1.5" fill="#00FFD022" stroke="#A970FF" strokeWidth="1"/>
                <circle cx="9" cy="11" r="1" fill="#6949FF"/>
            </svg>);
    // Fallback generic
    return (<svg width="17" height="17" viewBox="0 0 15 15" style={{ marginRight: 5 }}>
            <rect x="2.3" y="3.3" width="10.5" height="8.5" rx="2" fill="#00FFD022" stroke="#00FFD0" strokeWidth="1.1"/>
            <circle cx="7.6" cy="7.2" r="1.6" fill="#00FFD011"/>
        </svg>);
}
// ========== UTILITY ==========
function truncateMiddle(str, max) {
    if (max === void 0) { max = 22; }
    if (str.length <= max)
        return str;
    return str.slice(0, max / 2 - 2) + "…" + str.slice(-max / 2 + 1);
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42;
// ====================================================================================
// END APP FILE
// ====================================================================================
//# sourceMappingURL=MassiveApp.js.map