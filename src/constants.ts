export const profileLinks = [
  {
    href: '/profile',
    labelKey: 'header__profile_menu__profile',
  },
  {
    href: '/feed/followers',
    labelKey: 'header__profile_menu__followers',
  },
  {
    href: '/feed/following',
    labelKey: 'header__profile_menu__following',
  },
  {
    href: '/feed/own',
    labelKey: 'header__profile_menu__own',
  },
];

export const subNavLinksFeed = [
  {
    href: '/',
    labelKey: 'header__subNav__feed__home',
  },
  {
    href: '/feed/liked',
    labelKey: 'header__subNav__feed__liked',
  },
  {
    href: '/feed/featured',
    labelKey: 'header__subNav__feed__featured',
  },
  {
    href: '/feed/mood',
    labelKey: 'header__subNav__feed__mood',
  },
];

export const mainNavData = [
  {
    href: '/',
    rootPaths: ['', 'feed'],
    linkIcon: 'home',
    labelKey: 'main_nav__home',
    type: 'link',
    hasDot: false,
  },
  {
    href: '/alerts',
    rootPaths: ['alerts'],
    linkIcon: 'alerts',
    labelKey: 'main_nav__alerts',
    type: 'link',
    hasDot: true, // TODO: detect unread alerts
  },
  {
    href: '/messages',
    rootPaths: ['messages'],
    linkIcon: 'messages',
    labelKey: 'main_nav__messages',
    type: 'link',
    hasDot: false, // TODO: detect unread messages
  },
  {
    href: '/news',
    rootPaths: ['news'],
    linkIcon: 'news',
    labelKey: 'main_nav__news',
    type: 'link',
    hasDot: false, // TODO: detect unread news
  },
  {
    href: '/search',
    rootPaths: ['search'],
    linkIcon: 'search',
    labelKey: 'main_nav__search',
    type: 'button',
    hasDot: false,
  },
];

export const perfLangOptions = [
  {
    labelKey: 'profile_edit__perfLang__auto',
    value: 'auto',
  },
  {
    labelKey: 'profile_edit__perfLang__English',
    value: 'en',
  },
];

export const swatchesPerPage = 3;
