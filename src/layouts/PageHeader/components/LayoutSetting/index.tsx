import { memo, useState } from "react";
import { Button, Card, Divider, Drawer, Flex, Space, Tooltip, type FlexProps } from "antd";
import {
  BgColorsOutlined,
  LayoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useSelector } from "@/stores";
import {
  ColorSelect,
  MenuToggle,
  RaduisAdjust,
  SizeToggle,
  ThemeToggle,
} from "../../Themes/Appearance";
import { NavSwitch } from "../../Themes/Layout";
import { WatermarkToggle, ResetSetting } from "../../Themes/Common";

type ConfigItemProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  description?: React.ReactNode;
} & Omit<FlexProps, "children" | "content">;

/** 设置区域内容的 Card 组件 */
const ConfigItem: React.FC<ConfigItemProps> = ({ title, content, description, ...rest }) => {
  return (
    <Card size="small" bordered={false} hoverable className="mb-4">
      <Flex justify="space-between" align="center" wrap {...rest}>
        <div>
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
  const { responsive } = useSelector(["responsive"]);

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
        <Divider plain style={{ marginTop: 0 }}>
          <Space>
            <BgColorsOutlined />
            <span>外观设置</span>
          </Space>
        </Divider>
        <ConfigItem title="暗黑主题" content={<ThemeToggle />} />
        <ConfigItem title="暗色菜单" content={<MenuToggle />} />
        <ConfigItem title="紧凑风格" content={<SizeToggle />} />
        <ConfigItem title="主题颜色" content={<ColorSelect />} vertical align="flex-start" />
        <ConfigItem title="圆角大小" content={<RaduisAdjust />} />

        {/* small screen only one layout */}
        {responsive.md && (
          <>
            <Divider plain>
              <Space>
                <LayoutOutlined />
                <span>布局设置</span>
              </Space>
            </Divider>
            <ConfigItem title="导航模式" content={<NavSwitch />} />
          </>
        )}

        <Divider plain>
          <Space>
            <LayoutOutlined />
            <span>通用设置</span>
          </Space>
        </Divider>
        <ConfigItem title="水印" content={<WatermarkToggle />} />
        <ConfigItem title="重置主题" content={<ResetSetting />} />
      </Drawer>
    </>
  );
});

export default LayoutSetting;
