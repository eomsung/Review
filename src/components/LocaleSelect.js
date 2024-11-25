import { useLocale } from "../contexts/LocaleContext";

export const LocaleSelect = () => {
  const { locale, setLocale } = useLocale();

  const handleChange = (e) => setLocale(e.target.value);

  return (
    <select value={locale} onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
};
