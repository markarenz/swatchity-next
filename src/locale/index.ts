import langEng from './en-US.json';
import langFr from './fr-FR.json';
import langEs from './es-MX.json';
import langRu from './ru-RU.json';
import langHi from './hi-IN.json';
import langZH from './zh-CN.json';

export const defaultLocale = 'en-US';

export type LangPack = {
  header__log_in: string;
  header__profile_menu__log_out: string;
};

export type LangPacks = {
  en_US: LangPack;
  fr_FR: LangPack;
  es_MX: LangPack;
  ru_RU: LangPack;
  hi_IN: LangPack;
  zh_CN: LangPack;
};

const messages: LangPacks = {
  en_US: { ...langEng },
  fr_FR: { ...langFr },
  es_MX: { ...langEs },
  ru_RU: { ...langRu },
  hi_IN: { ...langHi },
  zh_CN: { ...langZH },
};

export default messages;

// TODO: Refactor when we add new languages
export const getLangPackKey = (currentLocale: string | undefined): keyof LangPacks => {
  const lang = currentLocale?.split('-')[0];
  switch (lang) {
    case 'en': {
      return 'en_US';
    }
    case 'fr': {
      return 'fr_FR';
    }
    case 'es': {
      return 'es_MX';
    }
    case 'ru': {
      return 'ru_RU';
    }
    case 'hi': {
      return 'hi_IN';
    }
    case 'zh': {
      return 'zh_CN';
    }
    default: {
      return 'en_US';
    }
  }
};
