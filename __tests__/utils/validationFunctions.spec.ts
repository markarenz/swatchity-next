import { Rule } from '@/types';
import { REQ, MINLEN, EMAIL, COLOR, TRUE, COLOR_CHANNEL_VAL } from '@/validation/ruleConstants';
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
  const mockRules: Rule[] = [
    {
      field: 'email',
      rules: [REQ, EMAIL],
    },
    {
      field: 'username',
      rules: [REQ, MINLEN],
    },
    {
      field: 'avatarColor1',
      rules: [REQ, COLOR],
    },
    {
      field: 'isUnique',
      rules: [REQ, TRUE],
    },
    {
      field: 'colorR',
      rules: [REQ, COLOR_CHANNEL_VAL],
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

  it('returns true for valid color', () => {
    expect(
      validateWithRules(
        {
          email: 'avatarColor1',
          username: 'DD00AA',
        },
        mockRules,
      ),
    ).toBe(false);
  });
  it('returns false for invalid color channel value', () => {
    expect(
      validateWithRules(
        {
          email: 'email@domain.com',
          username: 'validUsername',
          avatarColor1: 'BB8800',
          isUnique: true,
          colorR: 360,
        },
        mockRules,
      ),
    ).toBe(false);
  });

  it('returns false for invalid color', () => {
    expect(
      validateWithRules(
        {
          email: 'avatarColor1',
          username: '1234',
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
            rules: ['fakeRule'],
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
          avatarColor1: 'BB8800',
          isUnique: true,
          colorR: 150,
        },
        mockRules,
      ),
    ).toBe(true);
  });
});
