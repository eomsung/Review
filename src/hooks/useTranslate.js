import { useLocale } from "../contexts/LocaleContext";

const dict = {
  ko: {
    edit: "수정",
    delete: "삭제",
  },
  en: {
    edit: "Edit",
    delete: "Delete",
  },
};

export const useTranslate = () => {
  const { locale } = useLocale();

  const translate = (key) => dict[locale][key];

  return translate;
};
