import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormPage, ProFormCaptcha, ProFormText } from "@ant-design/pro-components";
import { ThemeProvider, useTheme } from "antd-style";
import { useEventListener } from "ahooks";
import { message } from "@/hooks/useStaticApp";
import { TOKEN_CACHE } from "@/constants";
import localCacha from "@/utils/cache/localCache";
import { login } from "@/apis/mock";
import type { Mock } from "@/apis/mock/typings";
import initLoginBg from "./bg";

const loginTitle = import.meta.env.VITE_APP_TITLE;

const LoginPage = () => {
  const navigate = useNavigate();
  const { colorTextPlaceholder, colorText } = useTheme();

  useEventListener("resize", initLoginBg, { target: document.querySelector("html") });

  useEffect(() => {
    initLoginBg();
  }, []);

  const handleSubmit = async (values: Mock.LoginParams) => {
    const { data, code } = await login(values);

    if (code === 200) {
      localCacha.set(TOKEN_CACHE, data);
      message.success("登录成功！");
      navigate("/");
    }
  };

  return (
    <div className="bg-white h-screen">
      {/* 用 cavans 星空图作为视频未加载完时的背景 */}
      <canvas id="canvas" className="block absolute" />
      <LoginFormPage
        // backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title={loginTitle}
        containerStyle={{ backgroundColor: "rgba(0, 0, 0,0.65)", backdropFilter: "blur(4px)" }}
        subTitle="欢迎使用Antd Simple Admin, 请登录"
        actions={
          <div className="flex flex-col justify-center items-center">
            <Divider plain>
              <span className="font-normal text-base" style={{ color: colorTextPlaceholder }}>
                账号登陆失败五次将会被锁定
              </span>
            </Divider>
          </div>
        }
        onFinish={handleSubmit}
      >
        <ProFormText
          name="username"
          fieldProps={{ size: "large", prefix: <UserOutlined style={{ color: colorText }} /> }}
          placeholder="用户名: admin or user"
          rules={[{ required: true, message: "请输入用户名!" }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{ size: "large", prefix: <LockOutlined style={{ color: colorText }} /> }}
          placeholder="密码: 123456"
          rules={[{ required: true, message: "请输入密码！" }]}
        />
        <ProFormCaptcha
          name="captcha"
          fieldProps={{ size: "large", prefix: <LockOutlined style={{ color: colorText }} /> }}
          captchaProps={{ size: "large" }}
          placeholder="请输入验证码"
          captchaTextRender={(timing, count) => {
            if (timing) return `${count} ${"获取验证码"}`;
            return "获取验证码";
          }}
          rules={[{ required: true, message: "请输入验证码！" }]}
          onGetCaptcha={async () => {
            message.success("获取验证码成功！验证码为：1234");
          }}
        />
      </LoginFormPage>
    </div>
  );
};

export default function Login() {
  return (
    <ThemeProvider appearance="dark">
      <LoginPage />
    </ThemeProvider>
  );
}
