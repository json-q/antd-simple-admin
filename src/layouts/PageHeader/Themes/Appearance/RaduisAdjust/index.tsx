import { InputNumber } from "antd";
import { useSelector } from "@/stores";
import { memo } from "react";

const RaduisAdjust: React.FC = memo(() => {
  const { borderRadius, actionBorderRadius } = useSelector(["borderRadius", "actionBorderRadius"]);

  return (
    <InputNumber
      size="small"
      value={borderRadius}
      min={0}
      max={16}
      onChange={(val) => actionBorderRadius(val ?? 0)}
    />
  );
});

export default RaduisAdjust;
