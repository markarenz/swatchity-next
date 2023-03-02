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
    href: '/feed/new',
    labelKey: 'header__subNav__feed__new',
  },
  {
    href: '/feed/saved',
    labelKey: 'header__subNav__feed__saved',
  },
  {
    href: '/feed/featured',
    labelKey: 'header__subNav__feed__featured',
  },
];

export const mainNavData = [
  {
    href: '/',
    rootPaths: ['', 'feed'],
    linkIcon: 'home',
    hasDot: false,
  },
  {
    href: '/alerts',
    rootPaths: ['alerts'],
    linkIcon: 'alerts',
    hasDot: true, // TODO: detect unread alerts
  },
  {
    href: '/messages',
    rootPaths: ['messages'],
    linkIcon: 'messages',
    hasDot: false, // TODO: detect unread messages
  },
  {
    href: '/news',
    rootPaths: ['news'],
    linkIcon: 'news',
    hasDot: false, // TODO: detect unread news
  },
  {
    href: '/search',
    rootPaths: ['search'],
    linkIcon: 'search',
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
