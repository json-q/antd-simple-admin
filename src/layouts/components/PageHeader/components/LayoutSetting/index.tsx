import { memo, useState } from "react";
import { Button, Card, Drawer, Flex, type FlexProps, Segmented, Tooltip } from "antd";
import { QuestionCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { useTheme } from "antd-style";
import {
  ColorSelect,
  MenuToggle,
  RaduisAdjust,
  SizeToggle,
  ThemeToggle,
} from "../../Themes/Appearance";

type ConfigItemProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  description?: React.ReactNode;
} & Omit<FlexProps, "children" | "content">;

/** 设置区域内容的 Card 组件 */
const ConfigItem: React.FC<ConfigItemProps> = ({ title, content, description, ...rest }) => {
  const { margin, boxShadow } = useTheme();

  return (
    <Card size="small" bordered={false} style={{ marginBottom: margin, boxShadow: boxShadow }}>
      <Flex justify="space-between" align="center" wrap {...rest}>
        <div className="text-left">
          {title}
          {description && (
            <Tooltip title={description}>
              <QuestionCircleOutlined className="text-xs ml-1" />
            </Tooltip>
          )}
        </div>
        {content}
      </Flex>
    </Card>
  );
};

const LayoutSetting: React.FC = memo(() => {
  const [openSetting, setOpenSetting] = useState(false);
  const [segmentValue, setSegmentValue] = useState("appearance");

  return (
    <>
      <Button
        type="text"
        shape="circle"
        icon={<SettingOutlined />}
        onClick={() => setOpenSetting(true)}
      />

      <Drawer
        title="系统本地设置"
        placement="right"
        open={openSetting}
        onClose={() => setOpenSetting(false)}
      >
        <Segmented
          className="mb-3"
          options={[
            { label: "外观", value: "appearance" },
            { label: "布局", value: "layout" },
            { label: "通用", value: "common" },
          ]}
          onChange={setSegmentValue}
          block
        />

        {segmentValue === "appearance" && (
          <>
            <ConfigItem title="暗黑主题" content={<ThemeToggle />} />
            <ConfigItem title="暗色菜单" content={<MenuToggle />} />
            <ConfigItem title="紧凑风格" content={<SizeToggle />} />
            <ConfigItem title="主题颜色" content={<ColorSelect />} />
            <ConfigItem title="圆角大小" content={<RaduisAdjust />} />
          </>
        )}

        {segmentValue === "layout" && <></>}
        {segmentValue === "common" && <></>}
      </Drawer>
    </>
  );
});

export default LayoutSetting;
