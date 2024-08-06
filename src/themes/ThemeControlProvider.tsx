import { useLayoutEffect } from "react";
import { theme } from "antd";
import { ThemeProvider } from "antd-style";
import { useSelector } from "@/stores";

interface ThemeControlProviderProps {
  children: React.ReactNode;
}

const ThemeControlProvider: React.FC<ThemeControlProviderProps> = ({ children }) => {
  const { themeMode, compact } = useSelector(["themeMode", "compact"]);

  useLayoutEffect(() => {
    document.querySelector("html")?.setAttribute("data-prefers-color", themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider
      appearance={themeMode}
      customToken={{
        customHeaderHeight: 56,
      }}
      theme={{ algorithm: compact ? theme.compactAlgorithm : undefined }}
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeControlProvider;
