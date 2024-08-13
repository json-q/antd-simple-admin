import { memo } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchPage: React.FC = memo(() => {
  return <Button type="text" shape="circle" icon={<SearchOutlined />} />;
});

export default SearchPage;
