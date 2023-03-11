import ReplySkeleton from '@/components/common/ReplySkeleton';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('SwatchSkeleton', () => {
  it('renders component - not logged in ', () => {
    render(<ReplySkeleton isLoggedIn={false} />);
    expect(screen).toMatchSnapshot();
  });
  it('renders component - logged in ', () => {
    render(<ReplySkeleton isLoggedIn={true} />);
    expect(screen).toMatchSnapshot();
  });
});
