import { memo } from "react";
import BaseMenu from "./components/BaseMenu";
import BaseSider from "./components/BaseSider";

const PageSider: React.FC = memo(() => {
  return (
    <BaseSider>
      <BaseMenu />
    </BaseSider>
  );
});

export default PageSider;
