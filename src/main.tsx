import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { App as AntApp, ConfigProvider } from "antd";
import { StyleProvider } from "antd-style";
import zhCN from "antd/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import ThemeControlProvider from "./themes/ThemeControlProvider";
import App from "./App";
import "@/styles/index.css";

dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeControlProvider>
      <ConfigProvider locale={zhCN} theme={{ cssVar: true, hashed: false }}>
        <StyleProvider hashPriority="high">
          <AntApp>
            <App />
          </AntApp>
        </StyleProvider>
      </ConfigProvider>
    </ThemeControlProvider>
  </HelmetProvider>,
);
