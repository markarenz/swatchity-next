import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import Sidebar from '@/components/pageComponents/Sidebar';
import mockNewsPost from '../../__fixtures__/mockNewsPost';
import mockUserData from '../../__fixtures__/mockUserMeta';
import mockSwatch from '../../__fixtures__/mockSwatch';

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest.fn().mockImplementation(() => ({
    sidebarContent: {
      posts: [mockNewsPost],
      userMeta: [mockUserData],
      swatches: [mockSwatch],
    },
  })),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/test',
    push: jest.fn(),
  })),
}));

describe('Sidebar', () => {
  it('renders component', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <Sidebar />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });
});
