import { Avatar, Dropdown, Flex, type MenuProps } from "antd";
import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import usePersonActionStyles from "./styles";
import { message } from "@/hooks/useStaticApp";

enum MenuItemKey {
  PASSWORD = "PASSWORD",
  LOGOUT = "LOGOUT",
}

const items: MenuProps["items"] = [
  {
    label: "修改密码",
    key: MenuItemKey.PASSWORD,
    icon: <LockOutlined />,
  },
  { type: "divider" },
  {
    label: "退出登录",
    key: MenuItemKey.LOGOUT,
    danger: true,
    icon: <LogoutOutlined />,
  },
];

const PersonAction: React.FC = () => {
  const { styles } = usePersonActionStyles();

  const onClickDrop: MenuProps["onClick"] = ({ key }) => {
    message.success(`you click ${key}`);
  };

  return (
    <Dropdown menu={{ items, onClick: onClickDrop }}>
      <Flex align="center" gap={8} className={styles.personWrapper}>
        <Avatar
          size={28}
          src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          icon={<UserOutlined />}
        />
        <span className="name">张三</span>
      </Flex>
    </Dropdown>
  );
};

export default PersonAction;
