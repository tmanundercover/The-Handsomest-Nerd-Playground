import styled from "styled-components";
import { DefaultTheme } from "styled-components";

export const AppContainer = styled.div<{ theme: DefaultTheme }>`
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

export const Header = styled.header<{ theme: DefaultTheme }>`
    padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.lg}px; 
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface};
    box-shadow: ${({ theme }: { theme: DefaultTheme }) => theme.shadows.element.card};
`;

export const Title = styled.h1<{ theme: DefaultTheme }>`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.textStyles.h1.fontSize}px;
    font-weight: ${({ theme }: { theme: DefaultTheme }) => theme.typography.textStyles.h1.fontWeight};
    margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.md}px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.brand.primary};
    letter-spacing: -0.5px;
`;

export const Content = styled.div<{ theme: DefaultTheme }>`
    flex: 1;
    padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.lg}px;
    margin: 0 auto;
    width: 100%;
`;

export const LoadingText = styled.p<{ theme: DefaultTheme }>`
    font-size: ${({ theme }) => theme.typography.textStyles.body1.fontSize}px;
    color: ${({ theme }) => theme.brand.primary}; 
    font-weight: ${({ theme }) => theme.typography.textStyles.body1.fontWeight};
`;

export const ErrorText = styled.p<{ theme: DefaultTheme }>`
    color: ${({ theme }: { theme: DefaultTheme }) => theme.status.error.base};
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.textStyles.body1.fontSize}px;
    font-weight: ${({ theme }: { theme: DefaultTheme }) => theme.typography.textStyles.body1.fontWeight};
    padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.md}px;
    border-radius: ${({ theme }: { theme: DefaultTheme }) => theme.borderRadius.scale[2]}px;
    background-color: ${({ theme }: { theme: DefaultTheme }) => `${theme.status.error.light}`};
`;

export const UserList = styled.ul<{ theme: DefaultTheme }>`
    list-style: none;
    padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.md}px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.lg}px;
    max-width: ${({ theme }: { theme: DefaultTheme }) => theme.media.query.desktop};
    margin: 0 auto;
`;

export const UserCard = styled.li<{ theme: DefaultTheme }>`
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface};
    border-radius: ${({ theme }: { theme: DefaultTheme }) => theme.borderRadius.element.card}px;
    padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.lg}px;
    box-shadow: ${({ theme }: { theme: DefaultTheme }) => theme.shadows.element.card};
    transition: ${({ theme }: { theme: DefaultTheme }) => theme.transitions.default};
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => `${theme.brand.primary}15`};

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${({ theme }: { theme: DefaultTheme }) => theme.shadows.scale[2]};
        border-color: ${({ theme }: { theme: DefaultTheme }) => `${theme.brand.primary}30`};
    }

    h3 {
        margin: 0 0 ${({ theme }: { theme: DefaultTheme }) => theme.spacing.sm}px;
        color: ${({ theme }: { theme: DefaultTheme }) => theme.brand.primary};
        font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.textStyles.h3.fontSize}px;
        font-weight: ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontWeights.semiBold};
    }

    p {
        margin: 0;
        color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
        font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontSizes.md}px;
    }
`;

export const SubTitle = styled.h2<{ theme: DefaultTheme }>`
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.textStyles.h2.fontSize}px;
    font-weight: ${({ theme }: { theme: DefaultTheme }) => theme.typography.textStyles.h2.fontWeight};
    margin: ${({ theme }: { theme: DefaultTheme }) => `${theme.spacing.lg}px 0`};
`;
