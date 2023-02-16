import { Rule } from '@/types';

export const isValidEmail = (email: string): boolean => {
  var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
  return pattern.test(email);
};

export const validateWithRules = (data: any, rules: Rule[]): boolean => {
  let valid = true;
  rules.forEach((r) => {
    const val = data[r.field];
    switch (r.rule) {
      case 'required':
        if (!val) {
          valid = false;
        }
        break;
      case 'validEmail':
        if (!isValidEmail(val)) {
          valid = false;
        }
        break;
      case 'minLen3':
        if (!val || val.length < 3) {
          valid = false;
        }
        break;
      default: {
        valid = false;
      }
    }
  });
  return valid;
};
