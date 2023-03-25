import SwatchSkeleton from '@/components/common/SwatchSkeleton';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('SwatchSkeleton', () => {
  it('renders component - not logged in ', () => {
    render(<SwatchSkeleton isLoggedIn={false} />);
    expect(screen).toMatchSnapshot();
  });
  it('renders component - logged in ', () => {
    render(<SwatchSkeleton isLoggedIn={true} />);
    expect(screen).toMatchSnapshot();
  });
});
