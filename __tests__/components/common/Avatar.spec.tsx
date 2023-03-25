import { render, screen } from '@testing-library/react';
import Avatar from '@/components/common/avatar/Avatar';
import mockUserMeta from '../../__fixtures__/mockUserMeta';

describe('Avatar', () => {
  it('renders all avatar patterns', () => {
    for (let i = 0; i < 33; i++) {
      render(
        <Avatar
          avatarData={{
            ...mockUserMeta,
            avatarPattern: i,
          }}
          displayOnly={false}
          isLocked={false}
        />,
      );
      const element = document.querySelector('g');
      expect(element).toBeInTheDocument();
    }
  });
  it('renders without hover-zoom class when disaplayOnly is true', async () => {
    render(
      <Avatar
        avatarData={{
          ...mockUserMeta,
        }}
        displayOnly={true}
        isLocked={false}
      />,
    );
    const element = await screen.findByTestId('avatar');
    expect(element.className.includes('hoverZoon')).toBe(false);
  });
});
