import { memo } from "react";
import BaseMenu from "./components/BaseMenu";
import BaseSider from "./components/BaseSider";
import BaseLogo from "./components/BaseLogo";

const PageSider: React.FC = memo(() => {
  return (
    <BaseSider>
      <BaseLogo />
      <BaseMenu />
    </BaseSider>
  );
});

export default PageSider;
