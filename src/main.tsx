import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { App as AntApp, ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import App from "./App.tsx";
import "@/styles/index.css";
import { StyleProvider } from "antd-style";

dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ConfigProvider locale={zhCN} theme={{ cssVar: true, hashed: false }}>
      <StyleProvider hashPriority="high">
        <AntApp>
          <App />
        </AntApp>
      </StyleProvider>
    </ConfigProvider>
  </HelmetProvider>,
);
