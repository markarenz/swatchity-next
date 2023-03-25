import { REQ, COLOR_CHANNEL_VAL } from './ruleConstants';

export const updatePostRules = [
  {
    field: 'title',
    rules: [REQ],
  },
  {
    field: 'slug',
    rules: [REQ],
  },
  {
    field: 'metadesc',
    rules: [REQ],
  },
  {
    field: 'colorR',
    rules: [REQ, COLOR_CHANNEL_VAL],
  },
  {
    field: 'colorG',
    rules: [REQ, COLOR_CHANNEL_VAL],
  },
  {
    field: 'colorB',
    rules: [REQ, COLOR_CHANNEL_VAL],
  },
];
