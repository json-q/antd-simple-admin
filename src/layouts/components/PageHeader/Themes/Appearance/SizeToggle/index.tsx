import { memo } from "react";
import { Switch } from "antd";
import { useSelector } from "@/stores";

const SizeToggle: React.FC = memo(() => {
  const { sizeMode, actionSizeMode } = useSelector(["sizeMode", "actionSizeMode"]);

  return (
    <Switch
      checked={sizeMode === "compact"}
      onChange={(checked) => actionSizeMode(checked ? "compact" : "default")}
    />
  );
});

export default SizeToggle;
