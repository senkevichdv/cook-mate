import { Html, Head, Main, NextScript } from "next/document";
import { AppRoot } from "@telegram-apps/telegram-ui";
import "@telegram-apps/telegram-ui/dist/styles.css";

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
