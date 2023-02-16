import { isValidEmail, validateWithRules } from '../../src/utils/validationFunctions';

describe('isValidEmail', () => {
  it('returns false when email is malformed', () => {
    expect(isValidEmail('test')).toBe(false);
  });
  it('returns false when email is empty', () => {
    expect(isValidEmail('')).toBe(false);
  });
  it('returns true when email is valid', () => {
    expect(isValidEmail('email@domain.com')).toBe(true);
  });
});

describe('validateWithRules', () => {
  const mockRules = [
    {
      field: 'email',
      rule: 'required',
    },
    {
      field: 'email',
      rule: 'validEmail',
    },
    {
      field: 'username',
      rule: 'required',
    },
    {
      field: 'username',
      rule: 'minLen3',
    },
  ];
  it('returns false for malformed email', () => {
    expect(
      validateWithRules(
        {
          email: 'test',
          username: 'validUsername',
        },
        mockRules,
      ),
    ).toBe(false);
  });
  it('returns false for empty username', () => {
    expect(
      validateWithRules(
        {
          email: '',
          username: 'validUsername',
        },
        mockRules,
      ),
    ).toBe(false);
  });

  it('returns false for short username', () => {
    expect(
      validateWithRules(
        {
          email: 'email@domain.com',
          username: 'ok',
        },
        mockRules,
      ),
    ).toBe(false);
  });

  it('returns false for unmatched rule', () => {
    expect(
      validateWithRules(
        {
          email: 'email@domain.com',
          username: 'ok',
        },
        [
          ...mockRules,
          {
            field: 'username',
            rule: 'fakeRule',
          },
        ],
      ),
    ).toBe(false);
  });

  it('returns true when rules are met', () => {
    expect(
      validateWithRules(
        {
          email: 'email@domain.com',
          username: 'validUsername',
        },
        mockRules,
      ),
    ).toBe(true);
  });
});
