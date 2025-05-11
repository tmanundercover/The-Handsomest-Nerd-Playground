// See original file above for full code (content replicated without styled-components/types/services/utils/assets, which are split out as imports)
import React from "react";
import { AppComponent } from "./component";
import { ThemeProvider } from "styled-components";
import { tokens } from "./component.style";
import GlobalFonts from "./component.style";

export default function App() {
  return (
    <ThemeProvider theme={tokens}>
      <GlobalFonts />
      <AppComponent />
    </ThemeProvider>
  );
}
