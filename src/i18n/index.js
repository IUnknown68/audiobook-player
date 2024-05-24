import { createI18n } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';

import en from './en-US';
import de from './de-DE';

const FALLBACK_LOCALE = 'en';

const messages = {
  en,
  de,
};

let i18n = null;

//------------------------------------------------------------------------------
function getLocale(availableLocales) {
  const localesToTry = [];
  const localeStored = useLocalStorage('locale', null);
  if (localeStored.value) {
    localesToTry.push(localeStored.value);
  }
  if (availableLocales.includes(navigator.language)) {
    localesToTry.push(navigator.language);
  }
  localesToTry.push(...navigator.languages);
  return localesToTry.find((locale) => availableLocales.includes(locale)) || FALLBACK_LOCALE;
}

//------------------------------------------------------------------------------
export async function create() {
  i18n = createI18n({
    legacy: false,
    locale: getLocale(Object.keys(messages)),
    fallbackLocale: FALLBACK_LOCALE,
    messages,
  });

  return i18n;
}

//------------------------------------------------------------------------------
function getI18n() {
  return i18n;
}

export default getI18n;
