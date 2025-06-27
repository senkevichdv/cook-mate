import { Html, Head, Main, NextScript } from "next/document";
import { AppRoot } from "@telegram-apps/telegram-ui";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <AppRoot>
        <body style={{ margin: 0, padding: 0 }}>
          <Main />
          <NextScript />
        </body>
      </AppRoot>
    </Html>
  );
}
