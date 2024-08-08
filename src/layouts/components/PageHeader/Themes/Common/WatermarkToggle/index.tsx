import { memo } from "react";
import { Switch } from "antd";
import { useSelector } from "@/stores";

const WatermarkToggle: React.FC = memo(() => {
  const { watermark, actionWatermark } = useSelector(["watermark", "actionWatermark"]);

  return <Switch checked={watermark} onChange={actionWatermark} />;
});

export default WatermarkToggle;
