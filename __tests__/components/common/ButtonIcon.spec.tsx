import ButtonIcon from '@/components/common/ButtonIcon';
import { render, screen, fireEvent } from '@testing-library/react';

const mockProps = {
  onClick: jest.fn(),
  disabled: false,
  label: 'Button Label',
};
describe('ButtonIcon', () => {
  it('renders component', () => {
    render(
      <ButtonIcon {...mockProps}>
        <div>ICON</div>
      </ButtonIcon>,
    );
    const element = document.querySelector('button');
    expect(element).toBeInTheDocument();
  });

  it('renders component with extraClasses', () => {
    render(
      <ButtonIcon {...mockProps} extraClasses="test-class">
        <div>ICON</div>
      </ButtonIcon>,
    );
    const element = document.querySelector('button');
    expect(element?.className.includes('test-class')).toBe(true);
  });

  it('handles click', async () => {
    render(
      <ButtonIcon {...mockProps}>
        <div>ICON</div>
      </ButtonIcon>,
    );
    const element = await screen.findByRole('button');
    fireEvent(
      element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockProps.onClick).toHaveBeenCalled();
  });
});
