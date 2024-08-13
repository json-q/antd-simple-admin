import { memo } from "react";
import { Switch } from "antd";
import { useSelector } from "@/stores";

const MenuToggle: React.FC = memo(() => {
  const { menuMode, layout, actionMenuMode } = useSelector([
    "menuMode",
    "layout",
    "actionMenuMode",
  ]);

  return (
    <Switch
      disabled={layout === "top"}
      checked={menuMode === "dark"}
      onChange={(checked) => actionMenuMode(checked ? "dark" : "light")}
    />
  );
});

export default MenuToggle;
