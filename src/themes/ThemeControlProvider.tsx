import { useCallback, useLayoutEffect } from "react";
import { theme } from "antd";
import { CustomTokenParams, ThemeProvider } from "antd-style";
import { useSelector } from "@/stores";
import { createCustomToken } from "./customToken";

interface ThemeControlProviderProps {
  children: React.ReactNode;
}

const ThemeControlProvider: React.FC<ThemeControlProviderProps> = ({ children }) => {
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
        algorithm: sizeMode === "compact" ? theme.compactAlgorithm : undefined,
        token: {
          colorPrimary,
          borderRadius,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeControlProvider;
