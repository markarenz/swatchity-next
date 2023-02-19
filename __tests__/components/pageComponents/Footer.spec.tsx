import { render } from '@testing-library/react';
import Footer from '@/components/pageComponents/Footer';

describe('Footer', () => {
  it('renders component', () => {
    render(<Footer />);
    const element = document.querySelector('a');
    expect(element).toBeInTheDocument();
  });
});
