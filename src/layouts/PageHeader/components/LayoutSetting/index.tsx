import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        title={t("setting.drawer.title")}
        placement="right"
        open={openSetting}
        onClose={() => setOpenSetting(false)}
      >
        <Divider plain style={{ marginTop: 0 }}>
          <Space>
            <BgColorsOutlined />
            <span>{t("setting.appearance")}</span>
          </Space>
        </Divider>
        <ConfigItem title={t("setting.appearance.theme")} content={<ThemeToggle />} />
        <ConfigItem title={t("setting.appearance.menu")} content={<MenuToggle />} />
        <ConfigItem title={t("setting.appearance.compact")} content={<SizeToggle />} />
        <ConfigItem
          title={t("setting.appearance.color")}
          content={<ColorSelect />}
          vertical
          align="flex-start"
        />
        <ConfigItem title={t("setting.appearance.raduis")} content={<RaduisAdjust />} />

        {/* small screen only one layout */}
        {responsive.md && (
          <>
            <Divider plain>
              <Space>
                <LayoutOutlined />
                <span>{t("setting.layout")}</span>
              </Space>
            </Divider>
            <ConfigItem title={t("setting.layout.nav")} content={<NavSwitch />} />
          </>
        )}

        <Divider plain>
          <Space>
            <LayoutOutlined />
            <span>{t("setting.common")}</span>
          </Space>
        </Divider>
        <ConfigItem title={t("setting.common.watermark")} content={<WatermarkToggle />} />
        <ConfigItem title={t("setting.common.reset")} content={<ResetSetting />} />
      </Drawer>
    </>
  );
});

export default LayoutSetting;
