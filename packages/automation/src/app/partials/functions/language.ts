export function getCurrentSystemLanguage(): string {
  const I18N_LANGUAGE_KEY =
    (window as any)._env_?.REACT_APP_I18N_LANGUAGE_KEY || "i18nConfig";
  return JSON.parse(localStorage.getItem(I18N_LANGUAGE_KEY)).selectedLang;
}
