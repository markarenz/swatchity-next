import SwatchPost from '@/components/common/SwatchPost';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockSwatch from '../../__fixtures__/mockSwatch';
import mockUserData from '../../__fixtures__/mockUserMeta';

jest.mock('@/utils/apiFunctions', () => ({
  setLikeSwatch: jest.fn(),
}));

const mockProps = {
  swatch: mockSwatch,
  userID: mockUserData.id,
  isLiked: false,
  setUserLikes: jest.fn((f: Function) => {
    f([mockSwatch.id]);
  }),
  setSwatches: jest.fn((f: Function) => {
    f([mockSwatch]);
  }),
};

describe('SwatchPost', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <SwatchPost {...mockProps} />
      </IntlProvider>,
    );
  });

  it('handles like click - not liked', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <SwatchPost {...mockProps} />
      </IntlProvider>,
    );

    const btnLike = await screen.findByTestId(`btn-${mockSwatch.id}-like`);
    await waitFor(async () => {
      fireEvent(
        btnLike,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
  });

  it('handles like click - is liked', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <SwatchPost {...mockProps} isLiked={true} />
      </IntlProvider>,
    );

    const btnLike = await screen.findByTestId(`btn-${mockSwatch.id}-like`);
    await waitFor(async () => {
      fireEvent(
        btnLike,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
  });
});
