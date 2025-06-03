// ========== THEME ==========
import {createGlobalStyle, DefaultTheme} from "styled-components";

export const tokens: DefaultTheme = {
    glassBlur: "blur(12px)",
    cardShadow: "0 12px 32px rgba(0,0,0,0.75)",
    headerGlass: "rgba(10,10,12,0.85)",
    colors: {
        background: "#0E0E10",
        surface: "#1A1A1D",
        surfaceAlt: "#222224",
        surfaceElevated: "#2A2A2D",
        surfaceDepressed: "#151517",
        overlay: "rgba(14, 14, 16, 0.75)",
        text: "#FFFFFF"
    },
    brand: {
        primary: "#FF8A00",
        primaryHover: "#FF9D2E",
        secondary: "#BFBFBF",
        secondaryHover: "#D9D9D9"
    },
    status: {
        success: {
            base: "#10EF75",
            light: "#10EF7520",
            dark: "#0BC561"
        },
        error: {
            base: "#FF426A",
            light: "#FF426A20",
            dark: "#D91E49"
        },
        warning: {
            base: "#FFC940",
            light: "#FFC94020",
            dark: "#E6B018"
        },
        info: {
            base: "#4DDDF6",
            light: "#4DDDF620",
            dark: "#1EBBCD"
        }
    },
    ui: {
        button: "#FF8A00",
        buttonHover: "#FF9D2E",
        border: "#2A2A2D",
        focusRing: "#FF8A00",
        disabledBackground: "#27272A",
        hoverOverlay: "rgba(255, 255, 255, 0.05)",
        activeOverlay: "rgba(0, 0, 0, 0.1)"
    },
    borderRadius: {
        small: 6,
        medium: 12,
        large: 24,
        full: 9999,
        none: 0,
        xs: 3,
        pill: 999,
        scale: {
            0: 0,
            1: 3,
            2: 6,
            3: 12,
            4: 24,
            full: 9999,
            pill: 999
        },
        element: {
            button: 6,
            input: 6,
            card: 12,
            dialog: 12,
            panel: 6
        }
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxs: 2,
        xxl: 48,
        xxxl: 64,
        container: {
            sm: 16,
            md: 24,
            lg: 32,
            xl: 48
        },
        section: {
            sm: 32,
            md: 48,
            lg: 64,
            xl: 96
        }
    },
    space: {
        scale: {
            0: 0,
            1: 2,
            2: 4,
            3: 8,
            4: 16,
            5: 24,
            6: 32,
            7: 48,
            8: 64
        },
        component: {
            xsmall: 2,
            small: 4,
            medium: 8,
            large: 16,
            xlarge: 24,
            xxlarge: 32
        },
        layout: {
            container: {
                sm: 16,
                md: 24,
                lg: 32,
                xl: 48
            },
            section: {
                sm: 32,
                md: 48,
                lg: 64,
                xl: 96
            }
        }
    },
    typography: {
        family: {
            base: "'Inter', sans-serif",
            heading: "'Inter', sans-serif",
            mono: "monospace"
        },
        lineHeight: {
            tight: 1.2,
            normal: 1.5,
            loose: 1.8
        },
        letterSpacing: {
            tight: "-0.02em",
            normal: "0",
            wide: "0.05em"
        },
        fontSizes: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20,
            xxl: 24,
            xxxl: 32,
            xxxxl: 40
        },
        fontWeights: {
            light: 300,
            regular: 400,
            medium: 500,
            semiBold: 600,
            bold: 700
        },
        textStyles: {
            h1: {
                fontSize: 32,
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em"
            },
            h2: {
                fontSize: 24,
                fontWeight: 700,
                lineHeight: 1.3,
                letterSpacing: "-0.01em"
            },
            h3: {
                fontSize: 20,
                fontWeight: 600,
                lineHeight: 1.4,
                letterSpacing: "-0.01em"
            },
            h4: {
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 1.4,
                letterSpacing: "0"
            },
            body1: {
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: "0"
            },
            body2: {
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: "0"
            },
            caption: {
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: "0.01em"
            },
            button: {
                fontSize: 16,
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: "0"
            }
        }
    },
    transitions: {
        default: "all 0.25s cubic-bezier(.4,.1,.25,1)",
        durations: {
            fast: "0.15s",
            normal: "0.25s",
            slow: "0.4s"
        },
        easings: {
            easeInOut: "cubic-bezier(.4,.1,.25,1)",
            easeOut: "cubic-bezier(0, 0, 0.2, 1)",
            easeIn: "cubic-bezier(0.4, 0, 1, 1)",
            sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
        },
        animation: {
            fadeIn: "fadeIn 0.25s cubic-bezier(.4,.1,.25,1)",
            slideIn: "slideIn 0.3s cubic-bezier(.4,.1,.25,1)",
            pulse: "pulse 2s cubic-bezier(.4,.1,.25,1) infinite"
        }
    },
    motion: {
        duration: {
            instant: "0s",
            fastest: "0.1s",
            fast: "0.15s",
            normal: "0.25s",
            slow: "0.4s",
            slowest: "0.6s"
        },
        easing: {
            linear: "linear",
            easeIn: "cubic-bezier(0.4, 0, 1, 1)",
            easeOut: "cubic-bezier(0, 0, 0.2, 1)",
            easeInOut: "cubic-bezier(.4,.1,.25,1)",
            sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
            standard: "cubic-bezier(.4,.1,.25,1)"
        },
        animation: {
            fadeIn: "fadeIn 0.25s cubic-bezier(.4,.1,.25,1)",
            slideIn: "slideIn 0.3s cubic-bezier(.4,.1,.25,1)",
            pulse: "pulse 2s cubic-bezier(.4,.1,.25,1) infinite"
        },
        transition: {
            default: "all 0.25s cubic-bezier(.4,.1,.25,1)",
            fast: "all 0.15s cubic-bezier(.4,.1,.25,1)",
            slow: "all 0.4s cubic-bezier(.4,.1,.25,1)"
        }
    },
    elevation: {
        none: "none",
        low: "0 2px 4px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)",
        medium: "0 4px 8px rgba(0,0,0,0.3), 0 0 1px rgba(0,0,0,0.1)",
        high: "0 8px 16px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.1)",
        highest: "0 12px 24px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.1)",
        card: "0 8px 24px rgba(0,0,0,0.6)"
    },
    shadows: {
        scale: {
            0: "none",
            1: "0 2px 4px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)",
            2: "0 4px 8px rgba(0,0,0,0.3), 0 0 1px rgba(0,0,0,0.1)",
            3: "0 8px 16px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.1)",
            4: "0 12px 24px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.1)"
        },
        element: {
            card: "0 8px 24px rgba(0,0,0,0.6)",
            dropdown: "0 4px 8px rgba(0,0,0,0.3), 0 0 1px rgba(0,0,0,0.1)",
            dialog: "0 12px 24px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.1)",
            tooltip: "0 2px 4px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)"
        }
    },
    borders: {
        width: {
            none: 0,
            thin: 1,
            medium: 2,
            thick: 3
        },
        style: {
            solid: "solid",
            dashed: "dashed",
            dotted: "dotted"
        },
        radii: {
            small: 6,
            medium: 12,
            large: 24,
            full: 9999
        },
        color: "#2A2A2D"
    },
    glass: {
        header: "rgba(20,20,20,0.70)",
        blur: "blur(16px)",
        overlay: "rgba(14,14,16,0.5)",
        card: "rgba(26,26,29,0.7)"
    },
    backdrop: {
        blur: {
            default: "blur(16px)",
            light: "blur(8px)",
            heavy: "blur(24px)"
        },
        background: {
            header: "rgba(20,20,20,0.70)",
            overlay: "rgba(14,14,16,0.5)",
            card: "rgba(26,26,29,0.7)"
        }
    },
    zIndex: {
        base: 0,
        above: 1,
        dropdown: 10,
        sticky: 100,
        modal: 1000,
        tooltip: 1500,
        toast: 2000,
        hide: -1
    },
    breakpoints: {
        xs: "320px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px"
    },
    media: {
        query: {
            mobile: "(max-width: 575px)",
            tablet: "(min-width: 576px) and (max-width: 991px)",
            desktop: "(min-width: 992px)"
        }
    }
} as const;

export const GlobalStyle = createGlobalStyle`
    html, body {
        background: ${(p: any) => p.theme.colors.background};
        color: ${(p: any) => p.theme.colors.text};
        margin: 0;
        padding: 0;
        font-family: ${(p: any) => p.theme.typography.fontFamily};
        font-size: ${(p: any) => p.theme.typography.fontSize}px;
        min-height: 100vh;
        overflow-x: hidden;
        transition: background 0.3s;
    }

    * {
        box-sizing: border-box;
    }

    :focus-visible {
        outline: 2px solid ${(p: any) => p.theme.colors.focusRing};
        outline-offset: 2px;
    }
`;