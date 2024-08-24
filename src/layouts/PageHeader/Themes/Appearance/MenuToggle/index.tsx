import { memo } from "react";
import { Switch } from "antd";
import { useSelector } from "@/stores";
import { MenuModeEnum } from "@/enums";

const MenuToggle: React.FC = memo(() => {
  const { menuMode, layout, actionMenuMode } = useSelector([
    "menuMode",
    "layout",
    "actionMenuMode",
  ]);

  return (
    <Switch
      disabled={layout === "top"}
      checked={menuMode === MenuModeEnum.Dark}
      onChange={(checked) => actionMenuMode(checked ? MenuModeEnum.Dark : MenuModeEnum.Light)}
    />
  );
});

export default MenuToggle;
