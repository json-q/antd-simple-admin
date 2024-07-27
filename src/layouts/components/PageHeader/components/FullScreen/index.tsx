import { useRef } from "react";
import { Button } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useFullscreen } from "ahooks";

const FullScreen: React.FC = () => {
  const ref = useRef(document.querySelector("html"));
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref);

  return (
    <Button
      type="text"
      icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      onClick={toggleFullscreen}
    />
  );
};

export default FullScreen;