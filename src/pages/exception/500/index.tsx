import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const ServerError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="500 Internal Server Error"
      subTitle="抱歉，出现了一些错误"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          回到首页
        </Button>
      }
    />
  );
};

export default ServerError;
