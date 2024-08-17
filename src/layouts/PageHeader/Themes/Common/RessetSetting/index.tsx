import { memo } from "react";
import { Button } from "antd";
import { useSelector } from "@/stores";
import { RedoOutlined } from "@ant-design/icons";

const ResetSetting: React.FC = memo(() => {
  const { resetSetting } = useSelector(["resetSetting"]);

  return <Button size="small" type="primary" icon={<RedoOutlined />} onClick={resetSetting} />;
});

export default ResetSetting;
