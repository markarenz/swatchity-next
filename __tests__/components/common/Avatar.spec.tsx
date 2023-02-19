import { render } from '@testing-library/react';
import Avatar from '@/components/common/avatar/Avatar';
import mockUserMeta from '../../__fixtures__/mockUserMeta';

describe('Avatar', () => {
  it('renders all avatar patterns', () => {
    for (let i = 0; i < 33; i++) {
      render(
        <Avatar
          userMeta={{
            ...mockUserMeta,
            avatarPattern: i,
          }}
        />,
      );
      const element = document.querySelector('g');
      expect(element).toBeInTheDocument();
    }
  });
});
