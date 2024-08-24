import { memo } from "react";
import { Switch } from "antd";
import { useSelector } from "@/stores";
import { ThemeModeEnum } from "@/enums";

const ThemeToggle: React.FC = memo(() => {
  const { themeMode, actionThemeMode } = useSelector(["themeMode", "actionThemeMode"]);

  return (
    <Switch
      checked={themeMode === "dark"}
      onChange={(checked) => actionThemeMode(checked ? ThemeModeEnum.Dark : ThemeModeEnum.Light)}
    />
  );
});

export default ThemeToggle;
