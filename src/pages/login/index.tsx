import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTheme } from "antd-style";
import ThemeSwitch from "@/layouts/PageHeader/components/ThemeSwitch";
import { message } from "@/hooks/useStaticApp";
import { TOKEN_CACHE } from "@/constants";
import localCacha from "@/utils/cache/localCache";
import { login } from "@/apis/mock";
import type { Mock } from "@/apis/mock/typings";
import useLoginPageStyles from "./styles";

const loginTitle = import.meta.env.VITE_APP_TITLE;

const LoginPage = () => {
  const { styles } = useLoginPageStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { colorTextTertiary } = useTheme();

  const handleSubmit = async (values: Mock.LoginParams) => {
    setLoading(true);
    const { data, code } = await login(values);

    if (code === 200) {
      localCacha.set(TOKEN_CACHE, data);
      setLoading(false);
      message.success("登录成功！");
      navigate("/");
    } else {
      message.error("登录失败！");
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.loginPageBg}></div>
      <div className={styles.bgContainer}>
        <div className={styles.theme}>
          <ThemeSwitch />
        </div>
        <div className={styles.form}>
          <div className="text-center">
            <div className="flex items-center justify-center h-10 leading-10">
              <span className="w-10 h-10 mr-4 align-top">
                <img className="w-full" src="/logo.svg" />
              </span>
              <span className="font-semibold text-2xl">{loginTitle}</span>
            </div>
            <div className="mt-3 mb-6" style={{ color: colorTextTertiary }}>
              a pure admin template for react
            </div>
          </div>
          <Form onFinish={handleSubmit} autoComplete="off">
            <Form.Item name="username" rules={[{ required: true, message: "请输入账号!" }]}>
              <Input size="large" prefix={<UserOutlined />} placeholder="用户名: admin or user" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码!" }]}>
              <Input
                size="large"
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码: 123456"
              />
            </Form.Item>
            <Form.Item>
              <Button size="large" loading={loading} type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
