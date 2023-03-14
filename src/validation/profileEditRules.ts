import { REQ, MINLEN, COLOR, TRUE } from './ruleConstants';

export const profileEditRules = [
  {
    field: 'name',
    rules: [REQ, MINLEN],
  },
  {
    field: 'username',
    rules: [REQ, MINLEN],
  },
  {
    field: 'usernameUnique',
    rules: [TRUE],
  },
  // {
  //   field: 'avatarColor1',
  //   rules: [REQ, COLOR],
  // },
  // {
  //   field: 'avatarColor2',
  //   rules: [REQ, COLOR],
  // },
  // {
  //   field: 'avatarColor3',
  //   rules: [REQ, COLOR],
  // },
];
