import useStore from "@/stores";
import useLogoStyles from "./styles";

const BaseLogo: React.FC = () => {
  const { styles } = useLogoStyles();

  const actionThemeMode = useStore((state) => state.actionThemeMode);

  return (
    <div className={styles.logo}>
      <div onClick={() => actionThemeMode("dark")}>React Admin</div>
    </div>
  );
};

export default BaseLogo;
