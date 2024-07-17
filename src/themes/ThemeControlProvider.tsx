import { useEffect } from "react";
import { ThemeProvider } from "antd-style";
import useStore from "@/stores";

interface ThemeControlProviderProps {
  children: React.ReactNode;
}

const ThemeControlProvider: React.FC<ThemeControlProviderProps> = ({ children }) => {
  const themeMode = useStore((state) => state.themeMode);

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-prefers-color", themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider
      appearance={themeMode}
      customToken={{
        customHeaderHeight: 48,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeControlProvider;
