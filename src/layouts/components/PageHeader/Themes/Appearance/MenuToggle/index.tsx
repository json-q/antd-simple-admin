import { memo } from "react";
import { Switch } from "antd";
import { useSelector } from "@/stores";

const MenuToggle: React.FC = memo(() => {
  const { menuMode, actionMenuMode } = useSelector(["menuMode", "actionMenuMode"]);

  return (
    <Switch
      checked={menuMode === "dark"}
      onChange={(checked) => actionMenuMode(checked ? "dark" : "light")}
    />
  );
});

export default MenuToggle;
