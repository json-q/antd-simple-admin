import { memo } from "react";
import { ColorPicker, Space } from "antd";
import { useTheme } from "antd-style";
import { CheckOutlined } from "@ant-design/icons";
import { useSelector } from "@/stores";
import { themeColors } from "./color";

interface ColorItemProps {
  bgColor: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  active: boolean;
  borderRadius?: number;
}
const ColorItem: React.FC<ColorItemProps> = ({ bgColor, active, onClick, borderRadius }) => {
  return (
    <div
      className="w-6 h-6 leading-6 text-center text-white cursor-pointer"
      style={{ backgroundColor: bgColor, borderRadius }}
      onClick={onClick}
    >
      {active && <CheckOutlined />}
    </div>
  );
};

const ColorSelect: React.FC = memo(() => {
  const { borderRadius } = useTheme();
  const { colorPrimary, actionColorPrimary } = useSelector(["colorPrimary", "actionColorPrimary"]);

  return (
    <Space wrap size="small" direction="horizontal" className="mt-1">
      {themeColors.map(({ color }) => (
        <ColorItem
          borderRadius={borderRadius}
          key={color}
          bgColor={color}
          active={colorPrimary === color}
          onClick={() => actionColorPrimary(color)}
        />
      ))}
      <ColorPicker
        value={colorPrimary}
        onChange={(_, hex) => actionColorPrimary(hex)}
        disabledAlpha
      >
        <div
          className="w-6 h-6 leading-6 text-center cursor-pointer"
          style={{
            borderRadius,
            background: "conic-gradient(red, #ff0, #0f0, #0ff, #00f, #f0f, red)",
          }}
        />
      </ColorPicker>
    </Space>
  );
});

export default ColorSelect;
