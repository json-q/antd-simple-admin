import { memo, useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import BaseSider from "../components/BaseSider";
import BaseMenu from "../components/BaseMenu";

const DrawSider: React.FC = memo(() => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="text" icon={<MenuOutlined />} onClick={() => setOpen(true)} />
      <Drawer
        title={null}
        closeIcon={null}
        styles={{ body: { padding: 0, height: "100%" } }}
        placement="left"
        open={open}
        width={210}
        onClose={() => setOpen(false)}
      >
        <OverlayScrollbarsComponent
          defer
          options={{ scrollbars: { autoHide: "leave", autoHideDelay: 200 } }}
          className="h-full"
        >
          <BaseSider>
            <BaseMenu />
          </BaseSider>
        </OverlayScrollbarsComponent>
      </Drawer>
    </>
  );
});

export default DrawSider;
