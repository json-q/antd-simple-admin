import { memo } from "react";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const LayoutSetting: React.FC = memo(() => {
  return <Button type="text" shape="circle" icon={<SettingOutlined />} />;
});

export default LayoutSetting;
