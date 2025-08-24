import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import plTranslations from './pl.json';
import enTranslations from './en.json';
import fiTranslations from './fi.json';

const resources = {
  pl: { translation: plTranslations },
  en: { translation: enTranslations },
  fi: { translation: fiTranslations },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'pl',
      fallbackLng: 'en',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
        bindI18n: 'languageChanged',
        bindI18nStore: '',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      },
    })
    .catch(console.error);
}

export default i18n;