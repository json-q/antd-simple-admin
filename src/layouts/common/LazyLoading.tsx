import { useEffect } from "react";
import { Col, Row, Spin } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});

interface LazyLoadingProps {
  height?: string | number;
}

const LazyLoading: React.FC<LazyLoadingProps> = ({ height = "100vh" }) => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Row align="middle" justify="center" style={{ height }}>
      <Col className="w-full">
        <Spin tip="加载中..." size="large">
          {/* antd 5.5 之后 Spin 必须有子元素才能使用 tip。仅占位 */}
          <></>
        </Spin>
      </Col>
    </Row>
  );
};

export default LazyLoading;
