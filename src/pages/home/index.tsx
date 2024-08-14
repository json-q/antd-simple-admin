import { Typography } from "antd";

const Home: React.FC = () => {
  return (
    <Typography>
      <Typography.Title level={4} className="mt-0">
        介绍
      </Typography.Title>
      <Typography.Paragraph>
        本系统属于极简的 react
        后台管理系统，只提供了后台最为通用的功能，并不直接集成业务功能。其主要功能如下：
      </Typography.Paragraph>

      <Typography.Paragraph>
        <ul>
          <li>动态权限路由：</li>
          <li>权限控制（组件 + hook）</li>
          <li>动态主题</li>
          <li>本地存储加密</li>
          <li>页面切换动画</li>
        </ul>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <blockquote>
          对于业务功能的集成，一方面是时间问题。 另一方面则是，每个公司的业务不同。
          提供大量业务功能，虽然看似令系统充实，但很多并不一定能用上，因此本系统只提供了基础能力，甚至可以直接使用部分代码自行搭建。
        </blockquote>
      </Typography.Paragraph>
    </Typography>
  );
};

export default Home;
