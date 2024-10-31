import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import SEARCH_EN from '../locales/en/search.json'
import SEARCH_VN from '../locales/vi/search.json'


export const resources = {
  en: {
    search: SEARCH_EN
  },
  vi: {
    search: SEARCH_VN
  }
}

export const defaultNS = 'search';

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['search'],
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false
  }
});
