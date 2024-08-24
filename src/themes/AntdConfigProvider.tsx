import { useCallback, useLayoutEffect } from "react";
import { App as AntApp, ConfigProvider, theme } from "antd";
import { CustomTokenParams, ThemeProvider, StyleProvider } from "antd-style";
import { useSelector } from "@/stores";
import { createCustomToken } from "./customToken";
import useLang from "@/locales/useLang";

interface AntdConfigProviderProps {
  children: React.ReactNode;
}

const AntdConfigProvider: React.FC<AntdConfigProviderProps> = ({ children }) => {
  const { langConfig } = useLang();
  const { themeMode, sizeMode, colorPrimary, borderRadius } = useSelector([
    "themeMode",
    "sizeMode",
    "colorPrimary",
    "borderRadius",
  ]);

  useLayoutEffect(() => {
    document.querySelector("html")?.setAttribute("data-prefers-color", themeMode);
  }, [themeMode]);

  const getCustomToken = useCallback((params: CustomTokenParams) => {
    const base = createCustomToken(params);
    return base;
  }, []);

  return (
    <ThemeProvider
      appearance={themeMode}
      customToken={getCustomToken}
      theme={{
        cssVar: true,
        hashed: false,
        algorithm: sizeMode === "compact" ? theme.compactAlgorithm : undefined,
        token: {
          colorPrimary,
          borderRadius,
        },
      }}
    >
      <ConfigProvider locale={langConfig.antdLocal}>
        <StyleProvider hashPriority="high">
          <AntApp>{children}</AntApp>
        </StyleProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default AntdConfigProvider;
