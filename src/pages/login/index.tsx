import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTheme } from "antd-style";
import ThemeSwitch from "@/layouts/PageHeader/components/ThemeSwitch";
import { message } from "@/hooks/useStaticApp";
import { StorageEnum } from "@/enums";
import localCacha from "@/utils/cache/localCache";
import { login } from "@/apis/mock";
import type { Mock } from "@/apis/mock/typings";
import useLoginPageStyles from "./styles";
import { useTranslation } from "react-i18next";

const loginTitle = import.meta.env.VITE_APP_TITLE;

const LoginPage = () => {
  const { styles } = useLoginPageStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { colorTextTertiary } = useTheme();

  const handleSubmit = async (values: Mock.LoginParams) => {
    setLoading(true);
    const { data, code } = await login(values);

    if (code === 200) {
      localCacha.set(StorageEnum.Token, data);
      setLoading(false);
      message.success(t("login.success"));
      navigate("/");
    } else {
      message.error(t("login.fail"));
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
              {t("login.description")}
            </div>
          </div>
          <Form onFinish={handleSubmit} autoComplete="off">
            <Form.Item
              name="username"
              rules={[{ required: true, message: t("login.username.required") }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder={t("login.username.placeholder")}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: t("login.password.required") }]}
            >
              <Input
                size="large"
                prefix={<LockOutlined />}
                type="password"
                placeholder={t("login.password.placeholder")}
              />
            </Form.Item>
            <Form.Item>
              <Button size="large" loading={loading} type="primary" htmlType="submit" block>
                {t("login.submit")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
