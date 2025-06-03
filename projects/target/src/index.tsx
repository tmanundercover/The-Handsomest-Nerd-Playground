import React from "react";
import * as ReactDOM from 'react-dom/client';
import App from "./App";
import {makeServer} from './server';
import {GlobalStyle, tokens} from "./styles/theme";
import {ThemeProvider} from "styled-components";

makeServer({environment: 'development'});

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={tokens}>
            <GlobalStyle/>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
);
