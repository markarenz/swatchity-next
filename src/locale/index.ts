import langEng from './en-US.json';
// import langFr from './fr-FR.json';

export const defaultLocale = 'en-US';

export type LangPack = {
  header__log_in: string;
  header__profile_menu__log_out: string;
};

export type LangPacks = {
  en_US: LangPack;
  // fr_FR: LangPack;
};

const messages: LangPacks = {
  en_US: { ...langEng },
  // fr_FR: { ...langFr },
};

export default messages;

// TODO: Refactor when we add new languages
export const getLangPackKey = (locale: string): keyof LangPacks => {
  switch (locale) {
    case 'en-US': {
      return 'en_US';
    }
    // case 'fr-FR': {
    //   return 'fr_FR';
    // }
    default: {
      return 'en_US';
    }
  }
};
