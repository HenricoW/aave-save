import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { ImageLoader, ImageLoaderProps } from "next/image";

export const imageLoader: ImageLoader = (args: ImageLoaderProps) => args.src;

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    config: {
      initialColorMode: "dark",
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
