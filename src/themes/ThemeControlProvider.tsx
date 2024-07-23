import { useEffect } from "react";
import { ThemeProvider } from "antd-style";
import { useSelector } from "@/stores";

interface ThemeControlProviderProps {
  children: React.ReactNode;
}

const ThemeControlProvider: React.FC<ThemeControlProviderProps> = ({ children }) => {
  const { themeMode } = useSelector(["themeMode"]);

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-prefers-color", themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider
      appearance={themeMode}
      customToken={{
        customHeaderHeight: 56,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeControlProvider;
