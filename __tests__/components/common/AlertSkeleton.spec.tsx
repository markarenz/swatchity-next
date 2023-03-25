import { render, screen } from '@testing-library/react';
import AlertSkeleton from '@/components/common/AlertSkeleton';

describe('AlertSkeleton', () => {
  it('renders the component', () => {
    render(<AlertSkeleton idx={0} />);
  });
  expect(screen).toMatchSnapshot();
});
