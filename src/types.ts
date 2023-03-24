import { UserMeta, Swatch, Reply, Post } from '@prisma/client';

export type PageMeta = {
  title: string;
  metadesc: string;
};

export type Rule = {
  field: string;
  rules: string[];
};

export type SubNavItem = {
  href: string;
  labelKey: string;
};

export type Color = {
  r: number;
  g: number;
  b: number;
};
export type HsvColor = {
  h: number;
  s: number;
  v: number;
};

export type Avatar = {
  avatarPattern: number;
  avatarColor1r: number;
  avatarColor1g: number;
  avatarColor1b: number;
  avatarColor2r: number;
  avatarColor2g: number;
  avatarColor2b: number;
  avatarColor3r: number;
  avatarColor3g: number;
  avatarColor3b: number;
};

export type ProfileFormFields = {
  name?: string;
  username?: string;
  usernameUnique?: boolean;
  bio?: string;
  avatarPattern?: number;
  color1?: Color;
  color2?: Color;
  color3?: Color;
  darkMode?: string;
  prefLang?: string;
};

export type PostFormFields = {
  id: string;
  title: string;
  slug: string;
  minLevel: number;
  active: boolean;
  publishDate: string;
  tags: string;
  metadesc: string;
  content: string;
  colorR: number;
  colorG: number;
  colorB: number;
};
export interface SwatchExt extends Swatch {
  user: UserMeta;
}

export interface ReplyExt extends Reply {
  user: UserMeta;
}

export type UserProfile = {
  id: string;
  name: string;
  active: boolean;
  username: string;
  numSwatches: number;
  level: number;
  score: number;
  bio: string;
  avatarPattern: number;
  avatarColor1r: number;
  avatarColor1g: number;
  avatarColor1b: number;
  avatarColor2r: number;
  avatarColor2g: number;
  avatarColor2b: number;
  avatarColor3r: number;
  avatarColor3g: number;
  avatarColor3b: number;
};

export type SidebarContent = {
  posts: Post[];
  swatches: Swatch[];
  userMeta: UserMeta[];
};

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  colorR: number;
  colorG: number;
  colorB: number;
  imgFeatured: string;
  imgThumbnail: string;
  publishDate: string;
};
