import { REQ, MINLEN, EMAIL, COLOR, TRUE } from '@/validation/ruleConstants';
import { Rule } from '@/types';

export const isValidEmail = (email: string): boolean => {
  var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
  return pattern.test(email);
};

export const validateWithRules = (data: any, rules: Rule[]): boolean => {
  let valid = true;
  rules.forEach((r) => {
    const val = data[r.field];
    r.rules.forEach((rule) => {
      switch (rule) {
        case REQ:
          if (!val) {
            valid = false;
          }
          break;
        case EMAIL:
          if (!isValidEmail(val)) {
            valid = false;
          }
          break;
        case MINLEN:
          if (!val || val.length < 3) {
            valid = false;
          }
          break;
        case COLOR:
          if (!val || val.length !== 6) {
            valid = false;
          }
          break;
        case TRUE:
          if (!val) {
            valid = false;
          }
          break;
        default: {
          valid = false;
        }
      }
    });
  });
  return valid;
};
