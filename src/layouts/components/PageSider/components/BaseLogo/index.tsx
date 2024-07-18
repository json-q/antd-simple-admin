import useStore from "@/stores";
import useLogoStyles from "./styles";

const BaseLogo: React.FC = () => {
  // const menuMode = useStore((state) => state.menuMode);
  const { styles } = useLogoStyles();

  const actionThemeMode = useStore((state) => state.actionThemeMode);

  return (
    <div className={styles.logo}>
      <div onClick={() => actionThemeMode("dark")}>React Admin</div>
    </div>
  );
};

export default BaseLogo;
