import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './pl.json';
import en from './en.json';
import fi from './fi.json';

const resources = {
  pl: { translation: pl },
  en: { translation: en },
  fi: { translation: fi },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl',
    fallbackLng: 'pl',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
