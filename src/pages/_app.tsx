import "@/styles/globals.css";
import {
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Link,
  Container,
} from "@mui/material";
import NavLink from "next/link";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: { mode: "light" },
        typography: { fontFamily: "Mulish" },
      })}>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">LOGO</Typography>
            <Stack direction="row" gap={2}>
              <Link
                component={NavLink}
                href="/"
                color="#fff"
                variant="body1"
                underline="none">
                Form
              </Link>
              <Link
                component={NavLink}
                href="/form-builder"
                color="#fff"
                variant="body1"
                underline="none">
                Form Builder
              </Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar></Toolbar>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
