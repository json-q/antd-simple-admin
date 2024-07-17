import useStore from "@/stores";
import { ThemeProvider } from "antd-style";
import React, { useEffect } from "react";

interface ThemeControlProviderProps {
  children: React.ReactNode;
}

const ThemeControlProvider: React.FC<ThemeControlProviderProps> = ({ children }) => {
  const themeMode = useStore((state) => state.themeMode);

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-prefers-color", themeMode);
  }, [themeMode]);

  return <ThemeProvider appearance={themeMode}>{children}</ThemeProvider>;
};

export default ThemeControlProvider;
