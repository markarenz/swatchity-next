import Chip from '@/components/common/Chip';
import { render, screen, fireEvent } from '@testing-library/react';

const mockProps = {
  removeItem: jest.fn(),
  idx: 1,
};
describe('Chip', () => {
  it('renders component', () => {
    render(
      <Chip {...mockProps}>
        <span>Test</span>
      </Chip>,
    );
    const element = document.querySelector('button');
    expect(element).toBeInTheDocument();
  });
  it('handles click', () => {
    render(
      <Chip {...mockProps}>
        <span>Test</span>
      </Chip>,
    );
    const element = document.querySelector('button');
    if (element) {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(mockProps.removeItem).toHaveBeenCalled();
  });
});
