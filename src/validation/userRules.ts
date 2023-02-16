export const createUserRules = [
  {
    field: 'email',
    rule: 'required',
  },
  {
    field: 'email',
    rule: 'validEmail',
  },
  {
    field: 'name',
    rule: 'required',
  },
  {
    field: 'name',
    rule: 'minLen3',
  },
  {
    field: 'locale',
    rule: 'required',
  },
];
