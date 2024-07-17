import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import global_en from "./en/global.json";
import global_vn from "./vn/global.json";

const resources = {
  en: {
    translation: global_en,
  },
  vi: {
    translation: global_vn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
