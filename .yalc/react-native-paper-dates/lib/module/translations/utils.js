let translationsPerLocale = {};
export function getTranslation(locale, key, fallback) {
  const l = locale || 'en';
  const translationForLocale = translationsPerLocale[l];

  if (!translationForLocale) {
    console.warn(`[react-native-paper-dates] ${locale} is not registered, key: ${key}`);
    return fallback || key;
  }

  const translation = translationsPerLocale[l][key];

  if (!translationForLocale) {
    console.warn(`[react-native-paper-dates] ${locale} is registered, but ${key} is missing`);
  }

  return translation || fallback || key;
}
export function registerTranslation(locale, translations) {
  translationsPerLocale[locale] = translations;
}
//# sourceMappingURL=utils.js.map