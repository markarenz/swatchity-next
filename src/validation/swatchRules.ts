import { REQ, COLOR_CHANNEL_VAL } from './ruleConstants';

export const createSwatchRules = [
  {
    field: 'colorR',
    rules: [COLOR_CHANNEL_VAL],
  },
  {
    field: 'colorG',
    rules: [COLOR_CHANNEL_VAL],
  },
  {
    field: 'colorB',
    rules: [COLOR_CHANNEL_VAL],
  },
];
