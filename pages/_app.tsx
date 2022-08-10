import "../styles/App.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../contexts/ThemeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
