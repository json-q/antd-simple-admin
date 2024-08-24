import { Space, Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useSelector } from "@/stores";
import { LayoutEnum, MenuModeEnum } from "@/enums";
import useLayoutToggleStyles from "./styles";

interface LayoutShapeItemProps {
  type: LayoutEnum;
  layoutMode: LayoutEnum;
  onSelected: (type: LayoutEnum) => void;
}

enum typeEnum {
  side = "侧边布局",
  top = "顶部布局",
  mixin = "混合布局",
}

const LayoutShapeItem: React.FC<LayoutShapeItemProps> = (props) => {
  const { type, layoutMode, onSelected } = props;
  const { styles } = useLayoutToggleStyles(type);

  return (
    <Tooltip title={typeEnum[type]}>
      <div className={styles.container} onClick={() => onSelected(type)}>
        {layoutMode === type && (
          <span className={styles.selectedContainer}>
            <CheckOutlined className={styles.selectedIcon} />
          </span>
        )}
      </div>
    </Tooltip>
  );
};

const NavSwitch: React.FC = () => {
  const { layout, actionLayout, actionMenuMode } = useSelector([
    "layout",
    "actionLayout",
    "actionMenuMode",
  ]);

  return (
    <Space className="mt-1" size={12}>
      <LayoutShapeItem layoutMode={layout} type={LayoutEnum.Side} onSelected={actionLayout} />
      <LayoutShapeItem
        layoutMode={layout}
        type={LayoutEnum.Top}
        onSelected={(type) => {
          actionLayout(type);
          actionMenuMode(MenuModeEnum.Light);
        }}
      />
    </Space>
  );
};

export default NavSwitch;
