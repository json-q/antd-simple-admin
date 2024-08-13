import { memo } from "react";
import { Switch } from "antd";
import { useSelector } from "@/stores";

const ThemeToggle: React.FC = memo(() => {
  const { themeMode, actionThemeMode } = useSelector(["themeMode", "actionThemeMode"]);

  return (
    <Switch
      checked={themeMode === "dark"}
      onChange={(checked) => actionThemeMode(checked ? "dark" : "ligth")}
    />
  );
});

export default ThemeToggle;
