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
    labelKey: 'profile_edit__perfLang__en',
    value: 'en',
  },
  {
    labelKey: 'profile_edit__perfLang__es',
    value: 'es',
  },
  {
    labelKey: 'profile_edit__perfLang__fr',
    value: 'fr',
  },
  {
    labelKey: 'profile_edit__perfLang__hi',
    value: 'hi',
  },
  {
    labelKey: 'profile_edit__perfLang__ru',
    value: 'ru',
  },
  {
    labelKey: 'profile_edit__perfLang__zh',
    value: 'zh',
  },
];

export const dummyNewsPost = {
  id: '1234',
  contentType: 'news',
  minLevel: 0,
  title: 'Oh, no! Your Post Was Not Found',
  slug: 'not-found',
  imgFeatured: `data:image/svg+xml,%3csvg viewBox='0 0 1920 900' version='1.1' id='svg5' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg'%3e%3cdefs id='defs2'/%3e%3cg id='layer1'%3e%3crect style='opacity:1%3bfill:%23b157cc%3bfill-opacity:1%3bstroke-width:0%3bpaint-order:stroke fill markers' id='rect234' width='1920' height='900' x='0' y='0'/%3e%3cg style='fill:%23eec951%3bfill-opacity:1%3bstroke-width:0.285006' id='g2045' transform='matrix(13.510313%2c0%2c0%2c13.510313%2c588.66229%2c78.657226)'%3e%3cg id='g2029' style='fill:%23eec951%3bfill-opacity:1%3bstroke-width:0.285006'%3e%3cpath d='m 51.173%2c3.801 c -5.068%2c-5.068 -13.315%2c-5.066 -18.384%2c0 l -9.192%2c9.192 c -0.781%2c0.781 -0.781%2c2.047 0%2c2.828 0.781%2c0.781 2.047%2c0.781 2.828%2c0 l 9.192%2c-9.192 c 1.691%2c-1.69 3.951%2c-2.622 6.363%2c-2.622 2.413%2c0 4.673%2c0.932 6.364%2c2.623 1.691%2c1.691 2.623%2c3.951 2.623%2c6.364 0%2c2.412 -0.932%2c4.672 -2.623%2c6.363 L 36.325%2c31.379 c -3.51%2c3.508 -9.219%2c3.508 -12.729%2c0 -0.781%2c-0.781 -2.047%2c-0.781 -2.828%2c0 -0.781%2c0.781 -0.781%2c2.048 0%2c2.828 2.534%2c2.534 5.863%2c3.801 9.192%2c3.801 3.329%2c0 6.658%2c-1.267 9.192%2c-3.801 L 51.173%2c22.186 c 2.447%2c-2.446 3.795%2c-5.711 3.795%2c-9.192 0%2c-3.482 -1.348%2c-6.746 -3.795%2c-9.193 z' id='path2013' style='fill:%23eec951%3bfill-opacity:1%3bstroke-width:0.285006'/%3e%3cpath d='m 27.132%2c40.57 -7.778%2c7.778 c -1.691%2c1.691 -3.951%2c2.623 -6.364%2c2.623 -2.412%2c0 -4.673%2c-0.932 -6.364%2c-2.623 -3.509%2c-3.509 -3.509%2c-9.219 0%2c-12.728 L 17.94%2c24.306 c 1.691%2c-1.69 3.951%2c-2.622 6.364%2c-2.622 2.412%2c0 4.672%2c0.932 6.363%2c2.622 0.781%2c0.781 2.047%2c0.781 2.828%2c0 0.781%2c-0.781 0.781%2c-2.047 0%2c-2.828 -5.067%2c-5.067 -13.314%2c-5.068 -18.384%2c0 L 3.797%2c32.793 c -2.446%2c2.446 -3.794%2c5.711 -3.794%2c9.192 0%2c3.48 1.348%2c6.745 3.795%2c9.191 2.446%2c2.447 5.711%2c3.795 9.191%2c3.795 3.481%2c0 6.746%2c-1.348 9.192%2c-3.795 l 7.778%2c-7.778 c 0.781%2c-0.781 0.781%2c-2.047 0%2c-2.828 -0.781%2c-0.781 -2.046%2c-0.781 -2.827%2c0 z' id='path2015' style='fill:%23eec951%3bfill-opacity:1%3bstroke-width:0.285006'/%3e%3cpath d='m 34.003%2c44.007 c -1.104%2c0 -2%2c0.896 -2%2c2 v 6 c 0%2c1.104 0.896%2c2 2%2c2 1.104%2c0 2%2c-0.896 2%2c-2 v -6 c 0%2c-1.105 -0.895%2c-2 -2%2c-2 z' id='path2017' style='fill:%23eec951%3bfill-opacity:1%3bstroke-width:0.285006'/%3e%3cpath d='m 41.175%2c42.593 c -0.781%2c-0.781 -2.047%2c-0.781 -2.828%2c0 -0.781%2c0.781 -0.781%2c2.047 0%2c2.828 l 4.242%2c4.242 c 0.391%2c0.391 0.902%2c0.586 1.414%2c0.586 0.512%2c0 1.023%2c-0.195 1.414%2c-0.586 0.781%2c-0.781 0.781%2c-2.047 0%2c-2.828 z' id='path2019' style='fill:%23eec951%3bfill-opacity:1%3bstroke-width:0.285006'/%3e%3cpath d='m 45.968%2c36.007 h -6 c -1.104%2c0 -2%2c0.896 -2%2c2 0%2c1.104 0.896%2c2 2%2c2 h 6 c 1.104%2c0 2%2c-0.896 2%2c-2 0%2c-1.104 -0.895%2c-2 -2%2c-2 z' id='path2021' style='fill:%23eec951%3bfill-opacity:1%3bstroke-width:0.285006'/%3e%3cpath d='m 18.003%2c13.007 c 1.104%2c0 2%2c-0.896 2%2c-2 v -6 c 0%2c-1.104 -0.896%2c-2 -2%2c-2 -1.104%2c0 -2%2c0.896 -2%2c2 v 6 c 0%2c1.104 0.896%2c2 2%2c2 z' id='path2023' style='fill:%23eec951%3bfill-opacity:1%3bstroke-width:0.285006'/%3e%3cpath d='m 10.589%2c14.421 c 0.391%2c0.391 0.902%2c0.586 1.414%2c0.586 0.512%2c0 1.023%2c-0.195 1.414%2c-0.586 0.781%2c-0.781 0.781%2c-2.047 0%2c-2.828 L 9.175%2c7.35 c -0.781%2c-0.781 -2.047%2c-0.781 -2.828%2c0 -0.781%2c0.781 -0.781%2c2.047 0%2c2.828 z' id='path2025' style='fill:%23eec951%3bfill-opacity:1%3bstroke-width:0.285006'/%3e%3cpath d='m 5.968%2c21.007 h 6 c 1.104%2c0 2%2c-0.896 2%2c-2 0%2c-1.104 -0.896%2c-2 -2%2c-2 h -6 c -1.104%2c0 -2%2c0.896 -2%2c2 0%2c1.104 0.896%2c2 2%2c2 z' id='path2027' style='fill:%23eec951%3bfill-opacity:1%3bstroke-width:0.285006'/%3e%3c/g%3e%3c/g%3e%3cg style='fill:%23e189fe%3bfill-opacity:1%3bstroke:none%3bstroke-width:0%3bstroke-dasharray:none%3bstroke-opacity:1' id='g4138-3' transform='matrix(8.8194444%2c0%2c0%2c8.8194444%2c1295.0569%2c443.34485)'%3e%3cpath d='m 12%2c3 c 0%2c4.97056 -4.02944%2c9 -9%2c9 4.97056%2c0 9%2c4.0294 9%2c9 0%2c-4.9706 4.0294%2c-9 9%2c-9 -4.9706%2c0 -9%2c-4.02944 -9%2c-9 z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' id='path4129-7' style='fill:%23e189fe%3bfill-opacity:1%3bstroke:none%3bstroke-width:0%3bstroke-dasharray:none%3bstroke-opacity:1'/%3e%3c/g%3e%3cg style='fill:%23e189fe%3bfill-opacity:1%3bstroke:none%3bstroke-width:0%3bstroke-dasharray:none%3bstroke-opacity:1' id='g4138-3-7' transform='matrix(8.8194444%2c0%2c0%2c8.8194444%2c1647.4734%2c114.58238)'%3e%3cpath d='m 12%2c3 c 0%2c4.97056 -4.02944%2c9 -9%2c9 4.97056%2c0 9%2c4.0294 9%2c9 0%2c-4.9706 4.0294%2c-9 9%2c-9 -4.9706%2c0 -9%2c-4.02944 -9%2c-9 z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' id='path4129-7-5' style='fill:%23e189fe%3bfill-opacity:1%3bstroke:none%3bstroke-width:0%3bstroke-dasharray:none%3bstroke-opacity:1'/%3e%3c/g%3e%3cg style='fill:%23e189fe%3bfill-opacity:1%3bstroke:none%3bstroke-width:0%3bstroke-dasharray:none%3bstroke-opacity:1' id='g4138-3-9' transform='matrix(8.8194444%2c0%2c0%2c8.8194444%2c39.440644%2c515.33821)'%3e%3cpath d='m 12%2c3 c 0%2c4.97056 -4.02944%2c9 -9%2c9 4.97056%2c0 9%2c4.0294 9%2c9 0%2c-4.9706 4.0294%2c-9 9%2c-9 -4.9706%2c0 -9%2c-4.02944 -9%2c-9 z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' id='path4129-7-1' style='fill:%23e189fe%3bfill-opacity:1%3bstroke:none%3bstroke-width:0%3bstroke-dasharray:none%3bstroke-opacity:1'/%3e%3c/g%3e%3cg style='fill:%23e189fe%3bfill-opacity:1%3bstroke:none%3bstroke-width:0%3bstroke-dasharray:none%3bstroke-opacity:1' id='g4138-4-0-2' transform='matrix(18.944783%2c0%2c0%2c18.944783%2c121.02782%2c-11.931138)'%3e%3cpath d='m 12%2c3 c 0%2c4.97056 -4.02944%2c9 -9%2c9 4.97056%2c0 9%2c4.0294 9%2c9 0%2c-4.9706 4.0294%2c-9 9%2c-9 -4.9706%2c0 -9%2c-4.02944 -9%2c-9 z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' id='path4129-0-9-9' style='fill:%23e189fe%3bfill-opacity:1%3bstroke:none%3bstroke-width:0%3bstroke-dasharray:none%3bstroke-opacity:1'/%3e%3c/g%3e%3cg style='fill:%23e189fe%3bfill-opacity:1%3bstroke:none%3bstroke-width:0%3bstroke-dasharray:none%3bstroke-opacity:1' id='g4138-4-0-2-5' transform='matrix(18.944783%2c0%2c0%2c18.944783%2c1485.8938%2c428.90029)'%3e%3cpath d='m 12%2c3 c 0%2c4.97056 -4.02944%2c9 -9%2c9 4.97056%2c0 9%2c4.0294 9%2c9 0%2c-4.9706 4.0294%2c-9 9%2c-9 -4.9706%2c0 -9%2c-4.02944 -9%2c-9 z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' id='path4129-0-9-9-4' style='fill:%23e189fe%3bfill-opacity:1%3bstroke:none%3bstroke-width:0%3bstroke-dasharray:none%3bstroke-opacity:1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e`,
  imgThumbnail: '',
  tags: '',
  metadesc: 'Article not found.',
  content:
    'The particular article you are looking for cannot be found, sadly. Please head back to the news page and try again.\n\nMaybe something is misconfigured or, more likely, you were playing around with the URL and typed in something cheeky to see if an article would appear. Nice try, but there is nothing here as you can plainly tell.\n\nIt may seem a bit sad, really, to have typed in a URL manually in hopes of finding something interesting but instead seeing this old dreck. Sorry, I guess.\n\nI shall endeavor to give you a fun fact to make you feel like this was time well spent: did you know that in Canada in 1857, the most common cause of death was being strangled by honey bees? Of course you did not know that because it happens not to be true. Sorry. I lied. However, the fax machine really was invented in the 18th century, though. That one is real. Real facts.',
  colorR: 8,
  colorG: 88,
  colorB: 88,
  active: true,
  publishDate: '2023-03-18',
  createdAt: new Date('2023-02-12T21:42:46.580+00:00'),
  modifiedAt: new Date('2023-02-12T21:42:46.580+00:00'),
};

export const swatchesPerPage = 10;
export const repliesPerPage = 10;
export const alertsPerPage = 10;
export const messagesPerPage = 10;
export const postsPerPage = 15;
