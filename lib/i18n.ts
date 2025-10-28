import sv from 'locales/sv/translation.json';
import i18n, { t } from 'i18next';
import { initReactI18next, Trans } from 'react-i18next';

 
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'sv',
    resources: {
      sv: {
        translation: { ...sv },
      },
    },
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export { t, Trans };
