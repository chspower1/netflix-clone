import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import App from "./App";
import { theme } from "./theme";
import "./fonts/fonts.css";

const GlobalStyle = createGlobalStyle`
    ${reset};
    *{
    font-family: "Sebang";
    box-sizing: border-box;
    text-decoration: none;
    };
    body{
    font-family: "Sebang";
    color:#636e72;
    background-color:black;
    };
    a{
    color:#636e72;
    };
`;

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <QueryClientProvider client={client}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>
);
