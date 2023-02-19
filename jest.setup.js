import '@testing-library/jest-dom/extend-expect';
require('jest-fetch-mock').enableMocks();

jest.mock('react-intl', () => {
  const reactIntl = jest.requireActual('react-intl');
  const messages = require('./src/locale/en-US.json');
  const intlProvider = new reactIntl.IntlProvider(
    {
      locale: 'en',
      messages,
    },
    {},
  );
  return {
    ...reactIntl,
    useIntl: () => {
      return intlProvider.state.intl;
    },
  };
});

let assignMock = jest.fn();
delete window.location;
window.location = { assign: assignMock };

afterEach(() => {
  assignMock.mockClear();
});
