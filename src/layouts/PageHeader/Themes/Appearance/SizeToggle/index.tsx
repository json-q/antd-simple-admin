import { memo } from "react";
import { Switch } from "antd";
import { useSelector } from "@/stores";
import { SizeModeEnum } from "@/enums";

const SizeToggle: React.FC = memo(() => {
  const { sizeMode, actionSizeMode } = useSelector(["sizeMode", "actionSizeMode"]);

  return (
    <Switch
      checked={sizeMode === "compact"}
      onChange={(checked) => actionSizeMode(checked ? SizeModeEnum.Compact : SizeModeEnum.Default)}
    />
  );
});

export default SizeToggle;
