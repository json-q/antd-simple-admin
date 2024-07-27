import { Avatar, Dropdown, Flex, type MenuProps } from "antd";
import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { message, modal } from "@/hooks/useStaticApp";
import { useSelector } from "@/stores";
import { LOGIN_PAGE, TOKEN_CACHE } from "@/constants";
import localCacha from "@/utils/cache/localCache";
import { logout } from "@/apis/mock";
import usePersonActionStyles from "./styles";
import { useNavigate } from "react-router-dom";

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
  const { currentUser, resetUserState } = useSelector(["currentUser", "resetUserState"]);
  const navigate = useNavigate();

  const onClickDrop: MenuProps["onClick"] = async ({ key }) => {
    switch (key) {
      case MenuItemKey.LOGOUT:
        onClickLogout();
        break;
      default:
        message.success(`you click ${key}`);
        break;
    }
  };

  const onClickLogout = () => {
    modal.confirm({
      title: "温馨提示",
      content: "是否确认退出登录？",
      onOk: loginOut,
    });

    async function loginOut() {
      const { code } = await logout();
      if (code === 200) {
        localCacha.remove(TOKEN_CACHE);
        message.success("退出成功");
        resetUserState();
        navigate(LOGIN_PAGE);
      }
    }
  };

  return (
    <Dropdown menu={{ items, onClick: onClickDrop }}>
      <Flex align="center" gap={8} className={styles.personWrapper}>
        <Avatar size={28} src={currentUser?.avatar} icon={<UserOutlined />} />
        <span className="name">{currentUser?.nickName}</span>
      </Flex>
    </Dropdown>
  );
};

export default PersonAction;
