import type { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Result } from "antd";

const App: FC = () => {
  return (
    <ErrorBoundary
      fallbackRender={(props) => {
        return <Result status="error" title="出现了一些未知错误" subTitle={props.error.message} />;
      }}
    >
      <div className="text-red-500">App</div>
    </ErrorBoundary>
  );
};

export default App;
