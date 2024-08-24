import { Button, Dropdown, type MenuProps } from "antd";
import { TranslationOutlined } from "@ant-design/icons";
import useLang, { type Lang, LocalLanguage } from "@/locales/useLang";

const langItems: MenuProps["items"] = Object.keys(LocalLanguage).map((key) => {
  return {
    key: LocalLanguage[key as Lang].lang,
    label: LocalLanguage[key as Lang].label,
  };
});

const LangSwitch: React.FC = () => {
  const { lang, setLangConfig } = useLang();
  const onClickLang: MenuProps["onClick"] = ({ key }) => {
    if (key === lang) return;
    setLangConfig(key as Lang);
  };

  return (
    <Dropdown menu={{ items: langItems, onClick: onClickLang }}>
      <Button type="text" shape="circle" icon={<TranslationOutlined />} />
    </Dropdown>
  );
};

export default LangSwitch;
