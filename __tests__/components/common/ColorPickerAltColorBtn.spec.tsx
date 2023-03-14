import ColorPickerAltColorBtn from '@/components/common/ColorPickerAltColorBtn';
import ButtonIcon from '@/components/common/ButtonIcon';
import { render, screen, fireEvent } from '@testing-library/react';

const mockProps = {
  label: 'Test Label',
  color: {
    r: 100,
    g: 100,
    b: 100,
  },
  posStyle: 'test',
  clickAltColor: jest.fn(),
  animStatus: 'out',
};
describe('ButtonIcon', () => {
  it('renders component for animating out', () => {
    render(<ColorPickerAltColorBtn {...mockProps} />);
    const element = document.querySelector('button');
    expect(element).toBeInTheDocument();
  });
  it('renders component for animating in', () => {
    render(<ColorPickerAltColorBtn {...mockProps} animStatus="in" />);
    const element = document.querySelector('button');
    expect(element).toBeInTheDocument();
  });
});
