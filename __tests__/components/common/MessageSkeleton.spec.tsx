import MessageSkeleton from '@/components/common/MessageSkeleton';
import { render, screen } from '@testing-library/react';

describe('MessageSkeleton', () => {
  it('renders component', () => {
    render(
      <div>
        <MessageSkeleton isSelf={true} idx={0} />
        <MessageSkeleton isSelf={false} idx={1} />
      </div>,
    );
    expect(screen).toMatchSnapshot();
  });
});
