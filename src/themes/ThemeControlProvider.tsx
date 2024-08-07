import { useLayoutEffect } from "react";
import { theme } from "antd";
import { ThemeProvider } from "antd-style";
import { useSelector } from "@/stores";

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

  return (
    <ThemeProvider
      appearance={themeMode}
      customToken={{
        customHeaderHeight: 56,
      }}
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
