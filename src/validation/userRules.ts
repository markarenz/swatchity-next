import { REQ, EMAIL, MINLEN, TRUE } from './ruleConstants';

export const createUserRules = [
  {
    field: 'email',
    rules: [REQ, EMAIL],
  },
  {
    field: 'name',
    rules: [REQ, MINLEN],
  },
  {
    field: 'locale',
    rules: [REQ],
  },
];
