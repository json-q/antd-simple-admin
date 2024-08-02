import ReactDOM from "react-dom/client";
import { App as AntApp, ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "@/styles/index.less";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";

dayjs.locale("zh-cn");

// const baseRouterName = import.meta.env.VITE_BASE_ROUTER_NAME;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN} theme={{ cssVar: true, hashed: false }}>
    <AntApp>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AntApp>
  </ConfigProvider>,
);
