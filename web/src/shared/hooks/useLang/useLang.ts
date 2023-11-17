import { langJSON } from '../../../shared/lang/';
import Cookies from 'js-cookie';
import { LanguageKeyType } from './useLang.types';
import { useState } from 'react';

export function useLang() {
  const lang = langJSON;
  const [currentLang, setCurrentLang] = useState(
    (Cookies.get('language') as LanguageKeyType) ?? 'pt'
  );

  const changeLanguage = (key: LanguageKeyType) => {
    setCurrentLang(key);

    Cookies.set('language', key);
  };

  return {
    lang,
    currentLang,
    onChangeLanguage: changeLanguage
  };
}
