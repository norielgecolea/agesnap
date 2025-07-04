
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    &lt;ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange&gt;
      &lt;Component {...pageProps} /&gt;
    &lt;/ThemeProvider&gt;
  );
}
