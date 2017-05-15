import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
// import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  // .use(Cache)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ru',

    // have a common namespace used around the full app
    ns: ['common', 'messages', 'head', 'modals'],
    defaultNS: 'common',

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format: (value, format, lng) => {
        if (format === 'uppercase') {
          return value.toUpperCase()
        }
        return value
      }
    }
  });


export default i18n;
