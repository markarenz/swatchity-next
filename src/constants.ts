export const profileLinks = [
  {
    href: '/profile',
    labelKey: 'header__profile_menu__profile',
    adminOnly: false,
  },
  {
    href: '/feed/liked',
    labelKey: 'header__profile_menu__liked',
    adminOnly: false,
  },
  {
    href: '/feed/SLEF_PROFILE',
    labelKey: 'header__profile_menu__own',
    adminOnly: false,
  },
  {
    href: '/admin',
    labelKey: 'header__profile_menu__admin',
    adminOnly: true,
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

export const subNavLinksAdmin = [
  {
    href: '/admin',
    labelKey: 'header__subNav__admin__home',
  },
  {
    href: '/admin/posts',
    labelKey: 'header__subNav__admin__posts',
  },
  {
    href: '/admin', // TODO: admin/users
    labelKey: 'header__subNav__admin__users',
  },
  {
    href: '/admin', // TODO: admin/swatches
    labelKey: 'header__subNav__admin__swatches',
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

export const swatchesPerPage = 10;
export const repliesPerPage = 10;
export const alertsPerPage = 10;
export const messagesPerPage = 10;
export const postsPerPage = 15;
