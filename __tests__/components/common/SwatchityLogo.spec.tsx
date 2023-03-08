import SwatchityLogo from '@/components/common/SwatchityLogo';
import { render } from '@testing-library/react';

describe('SwatchityLogo', () => {
  it('renders component', () => {
    render(<SwatchityLogo />);
    const element = document.querySelector('g');
    expect(element).toBeInTheDocument();
  });
});
