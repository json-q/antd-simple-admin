import { DatePicker, Typography } from "antd";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Typography>
      <Typography.Title level={4} className="mt-0">
        {t("home.article.title")}
      </Typography.Title>
      <Typography.Paragraph>{t("home.article.description")}</Typography.Paragraph>

      <Typography.Paragraph>
        <ul>
          <li>{t("home.article.feature1")}</li>
          <li>{t("home.article.feature2")}</li>
          <li>{t("home.article.feature3")}</li>
          <li>{t("home.article.feature4")}</li>
          <li>{t("home.article.feature5")}</li>
          <li>{t("home.article.feature6")}</li>
        </ul>
      </Typography.Paragraph>

      <Typography.Title level={4} className="mt-0">
        {t("home.article.antd_eg")}
      </Typography.Title>
      <DatePicker />
    </Typography>
  );
};

export default Home;
