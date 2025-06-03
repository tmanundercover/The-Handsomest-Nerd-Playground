import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            background: string;
            surface: string;
            surfaceAlt: string;
            surfaceElevated: string;
            surfaceDepressed: string;
            overlay: string;
            text?: string;
        };
        brand: {
            primary: string;
            primaryHover: string;
            secondary: string;
            secondaryHover: string;
        };
        status: {
            success: {
                base: string;
                light: string;
                dark: string;
            };
            error: {
                base: string;
                light: string;
                dark: string;
            };
            warning: {
                base: string;
                light: string;
                dark: string;
            };
            info: {
                base: string;
                light: string;
                dark: string;
            };
        };
        ui: {
            button: string;
            buttonHover: string;
            border: string;
            focusRing: string;
            disabledBackground: string;
            hoverOverlay: string;
            activeOverlay: string;
        };
        borderRadius: {
            small: number;
            medium: number;
            large: number;
            full: number;
            none: number;
            xs: number;
            pill: number;
            scale: {
                0: number;
                1: number;
                2: number;
                3: number;
                4: number;
                full: number;
                pill: number;
            };
            element: {
                button: number;
                input: number;
                card: number;
                dialog: number;
                panel: number;
            };
        };
        spacing: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
            xxs: number;
            xxl: number;
            xxxl: number;
            container: {
                sm: number;
                md: number;
                lg: number;
                xl: number;
            };
            section: {
                sm: number;
                md: number;
                lg: number;
                xl: number;
            };
        };
        space: {
            scale: {
                0: number;
                1: number;
                2: number;
                3: number;
                4: number;
                5: number;
                6: number;
                7: number;
                8: number;
            };
            component: {
                xsmall: number;
                small: number;
                medium: number;
                large: number;
                xlarge: number;
                xxlarge: number;
            };
            layout: {
                container: {
                    sm: number;
                    md: number;
                    lg: number;
                    xl: number;
                };
                section: {
                    sm: number;
                    md: number;
                    lg: number;
                    xl: number;
                };
            };
        };
        typography: {
            family: {
                base: string;
                heading: string;
                mono: string;
            };
            lineHeight: {
                tight: number;
                normal: number;
                loose: number;
            };
            letterSpacing: {
                tight: string;
                normal: string;
                wide: string;
            };
            fontSizes: {
                xs: number;
                sm: number;
                md: number;
                lg: number;
                xl: number;
                xxl: number;
                xxxl: number;
                xxxxl: number;
            };
            fontWeights: {
                light: number;
                regular: number;
                medium: number;
                semiBold: number;
                bold: number;
            };
            textStyles: {
                h1: {
                    fontSize: number;
                    fontWeight: number;
                    lineHeight: number;
                    letterSpacing: string;
                };
                h2: {
                    fontSize: number;
                    fontWeight: number;
                    lineHeight: number;
                    letterSpacing: string;
                };
                h3: {
                    fontSize: number;
                    fontWeight: number;
                    lineHeight: number;
                    letterSpacing: string;
                };
                h4: {
                    fontSize: number;
                    fontWeight: number;
                    lineHeight: number;
                    letterSpacing: string;
                };
                body1: {
                    fontSize: number;
                    fontWeight: number;
                    lineHeight: number;
                    letterSpacing: string;
                };
                body2: {
                    fontSize: number;
                    fontWeight: number;
                    lineHeight: number;
                    letterSpacing: string;
                };
                caption: {
                    fontSize: number;
                    fontWeight: number;
                    lineHeight: number;
                    letterSpacing: string;
                };
                button: {
                    fontSize: number;
                    fontWeight: number;
                    lineHeight: number;
                    letterSpacing: string;
                };
            };
        };

        transitions: {
            default: string;
            durations: {
                fast: string;
                normal: string;
                slow: string;
            };
            easings: {
                easeInOut: string;
                easeOut: string;
                easeIn: string;
                sharp: string;
            };
            animation: {
                fadeIn: string;
                slideIn: string;
                pulse: string;
            };
        };
        motion: {
            duration: {
                instant: string;
                fastest: string;
                fast: string;
                normal: string;
                slow: string;
                slowest: string;
            };
            easing: {
                linear: string;
                easeIn: string;
                easeOut: string;
                easeInOut: string;
                sharp: string;
                standard: string;
            };
            animation: {
                fadeIn: string;
                slideIn: string;
                pulse: string;
            };
            transition: {
                default: string;
                fast: string;
                slow: string;
            };
        };
        elevation: {
            none: string;
            low: string;
            medium: string;
            high: string;
            highest: string;
            card: string;
        };
        shadows: {
            scale: {
                0: string;
                1: string;
                2: string;
                3: string;
                4: string;
            };
            element: {
                card: string;
                dropdown: string;
                dialog: string;
                tooltip: string;
            };
        };
        borders: {
            width: {
                none: number;
                thin: number;
                medium: number;
                thick: number;
            };
            style: {
                solid: string;
                dashed: string;
                dotted: string;
            };
            radii: {
                small: number;
                medium: number;
                large: number;
                full: number;
            };
            color: string;
        };
        glass: {
            header: string;
            blur: string;
            overlay: string;
            card: string;
        };
        backdrop: {
            blur: {
                default: string;
                light: string;
                heavy: string;
            };
            background: {
                header: string;
                overlay: string;
                card: string;
            };
        };
        cardShadow: string;
        headerGlass: string;
        glassBlur: string;
        zIndex: {
            base: number;
            above: number;
            dropdown: number;
            sticky: number;
            modal: number;
            tooltip: number;
            toast: number;
            hide: number;
        };
        breakpoints: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
        };
        media: {
            query: {
                mobile: string;
                tablet: string;
                desktop: string;
            };
        };
    }
}