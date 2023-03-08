import messages, { defaultLocale, getLangPackKey } from '@/locale';

describe('getLangPackKey', () => {
  it('gets the lang pack from the locale', () => {
    const result = getLangPackKey(defaultLocale);
    expect(result).toEqual('en_US');
  });
  it('gets the lang pack from the locale when not found', () => {
    const result = getLangPackKey('xx-XX');
    expect(result).toEqual('en_US');
  });
});

describe('messages', () => {
  expect(Object.keys(messages).includes('en_US')).toBe(true);
});
