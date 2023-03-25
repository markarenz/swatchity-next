import ReplyPost from '@/components/common/ReplyPost';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import mockSwatch from '../../__fixtures__/mockSwatch';
import { mockReplyExt } from '../../__fixtures__/mockReply';
import mockUserData from '../../__fixtures__/mockUserMeta';

jest.mock('@/utils/apiFunctions', () => ({
  setLikeReply: jest.fn(),
}));

const mockProps = {
  reply: mockReplyExt,
  userID: mockUserData.id,
  isLiked: false,
  setReplyLikes: jest.fn((f: Function) => {
    f([mockSwatch.id]);
  }),
  setReplies: jest.fn((f: Function) => {
    f([mockSwatch, { ...mockSwatch, id: 'kjhf213' }]);
  }),
};

describe('ReplyPost', () => {
  it('renders component', () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <ReplyPost {...mockProps} />
      </IntlProvider>,
    );
  });

  it('handles like click - not liked', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <ReplyPost {...mockProps} />
      </IntlProvider>,
    );

    const btnLike = await screen.findByTestId(`btn-${mockReplyExt.id}-like`);
    await waitFor(async () => {
      fireEvent(
        btnLike,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });

  it('handles like click - is liked', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <ReplyPost {...mockProps} isLiked={true} />
      </IntlProvider>,
    );

    const btnLike = await screen.findByTestId(`btn-${mockReplyExt.id}-like`);
    await waitFor(async () => {
      fireEvent(
        btnLike,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(screen).toMatchSnapshot();
  });
});
