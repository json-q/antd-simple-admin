import { memo } from "react";
import { Badge, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";

const Notify: React.FC = memo(() => {
  return (
    <Button
      type="text"
      icon={
        <Badge dot>
          <BellOutlined />
        </Badge>
      }
    />
  );
});

export default Notify;
