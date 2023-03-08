import { REQ, COLOR_CHANNEL_VAL } from './ruleConstants';

export const createSwatchRules = [
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
