import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: { mode: "light" },
        typography: { fontFamily: "Mulish" },
      })}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
