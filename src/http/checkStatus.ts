import { message } from "@/hooks/useStaticApp";
import i18n from "@/locales/i18n";

const { t } = i18n;

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
const checkStatus = (status: number): void => {
  switch (status) {
    case 400:
      message.error(t("request.400"));
      break;
    case 401:
      message.error(t("request.401"));
      break;
    case 403:
      message.error(t("request.403"));
      break;
    case 404:
      message.error(t("request.404"));
      break;
    case 405:
      message.error(t("request.405"));
      break;
    case 408:
      message.error(t("request.408"));
      break;
    case 500:
      message.error(t("request.500"));
      break;
    case 502:
      message.error(t("request.502"));
      break;
    case 503:
      message.error(t("request.503"));
      break;
    case 504:
      message.error(t("request.504"));
      break;
    default:
      message.error(t("request.default"));
  }
};

export default checkStatus;
