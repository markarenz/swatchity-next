import SwatchFeed from '@/components/common/SwatchFeed';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import messages from '@/locale/en-US.json';
import mockSwatch from '../../__fixtures__/mockSwatch';
import mockUserData from '../../__fixtures__/mockUserMeta';
import { subNavLinksFeed } from '@/constants';

const mockSwatchExt = {
  ...mockSwatch,
  user: {
    ...mockUserData,
  },
};

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest.fn(() => ({
    userMeta: mockUserData,
  })),
}));

jest.mock('@/context/UserContext', () => ({
  useUserContext: jest
    .fn()
    .mockImplementation(() => ({ userMeta: mockUserData }))
    .mockImplementationOnce(() => ({ userMeta: null })),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    pathname: '/',
    push: jest.fn(),
  })),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest
    .fn()
    .mockReturnValueOnce({
      data: undefined,
    })
    .mockReturnValue({
      data: {
        email: 'email@test.com',
        name: 'Test Name',
      },
    }),
}));

jest.mock('@/utils/apiFunctions', () => ({
  ...jest.requireActual('@/utils/apiFunctions'),
  getSwatches: jest
    .fn()
    .mockImplementation(() => ({
      likes: ['5678'],
      swatches: [
        {
          ...mockSwatch,
          id: '5678',
        },
      ],
    }))
    .mockImplementationOnce(() => ({
      likes: [],
      swatches: [],
    })),

  createSwatch: jest.fn(() => ({
    ...mockSwatchExt,
  })),
}));

const mockProps = {
  subNavData: subNavLinksFeed,
  initialSwatches: [mockSwatchExt],
  initialLikes: ['abcd1234'],
  userMeta: mockUserData,
  mode: 'feed',
  str: '',
  titleKey: 'feed__home__title',
  introKey: 'feed__home__intro',
};
beforeEach(() => {
  jest.resetModules();
});
afterEach(() => {
  jest.restoreAllMocks();
});

describe('SwatchFeed', () => {
  it('renders component', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <SwatchFeed {...mockProps} />
      </IntlProvider>,
    );
  });

  it('handles open & close color picker', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SwatchFeed {...mockProps} />
        </IntlProvider>,
      );
    });
    const btnNew = await screen.findByTestId('feed-btn-new');
    act(() => {
      fireEvent(
        btnNew,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    const btnClose = document.querySelector('#swatch-feed .colorPicker .pickerClose');
    if (btnClose) {
      fireEvent(
        btnClose,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(screen).toMatchSnapshot();
  });

  it('handles create new color', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SwatchFeed {...mockProps} />
        </IntlProvider>,
      );
    });
    const btnNew = await screen.findByTestId('feed-btn-new');
    act(() => {
      fireEvent(
        btnNew,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    const btnOK = document.querySelector('#swatch-feed .colorPicker .pickerOK');
    if (btnOK) {
      fireEvent(
        btnOK,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(screen).toMatchSnapshot();
  });

  it('handles create new color - other feed', async () => {
    // @ts-ignore
    useRouter.mockImplementation(() => ({
      route: '/feed/liked',
      pathname: '/feed/liked',
      push: jest.fn(),
    }));
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SwatchFeed {...mockProps} />
        </IntlProvider>,
      );
    });
    const btnNew = await screen.findByTestId('feed-btn-new');
    act(() => {
      fireEvent(
        btnNew,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    const btnOK = document.querySelector('#swatch-feed .colorPicker .pickerOK');
    if (btnOK) {
      fireEvent(
        btnOK,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(screen).toMatchSnapshot();
  });

  it('handles load more button click - new swatches', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SwatchFeed {...mockProps} />
        </IntlProvider>,
      );
    });
    await waitFor(() => {
      const swatchPosts = document.querySelector('#swatchPosts')?.childNodes;
      expect(swatchPosts && swatchPosts.length > 0).toBe(true);
    });
    const btnLoad = await screen.findByTestId('feed-load-more');
    act(() => {
      fireEvent(
        btnLoad,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });
  it('handles load more button click - no more swatches', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SwatchFeed {...mockProps} />
        </IntlProvider>,
      );
    });
    const btnLoad = await screen.findByTestId('feed-load-more');
    act(() => {
      fireEvent(
        btnLoad,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });
  it('handles search mode - change color', async () => {
    // @ts-ignore
    useRouter.mockImplementation(() => ({
      route: '/search/[rgb]',
      pathname: '/searh/10-110-210',
      push: jest.fn(),
    }));
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SwatchFeed {...mockProps} mode="search" str="10-110-210" />
        </IntlProvider>,
      );
    });
    const btnColor = await screen.findByTestId('btn-search-color');
    act(() => {
      fireEvent(
        btnColor,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    const btnOK = document.querySelector('#swatch-feed .colorPicker .pickerOK');
    if (btnOK) {
      fireEvent(
        btnOK,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(screen).toMatchSnapshot();
  });

  it('displays message in search mode - no results', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SwatchFeed {...mockProps} mode="search" str="" initialLikes={[]} initialSwatches={[]} />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('displays a warning when not logged in in liked mode', () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SwatchFeed {...mockProps} mode="liked" userMeta={null} />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('displays profile feed', async () => {
    act(() => {
      render(
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
          <SwatchFeed {...mockProps} mode="profile" str="" userProfile={mockUserData} />
        </IntlProvider>,
      );
    });
    expect(screen).toMatchSnapshot();
  });
});
