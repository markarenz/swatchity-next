import PageSeo from '@/components/pageComponents/PageSeo';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const defaultProps = {
  pageMeta: {
    title: 'Page Title',
    metadesc: 'This is a metadescription.',
  },
};

describe('PageSeo', () => {
  it('renders page meta', async () => {
    render(<PageSeo {...defaultProps} />);
    const head = document.querySelector('head');
    await waitFor(() => {
      expect(head).toBeInTheDocument();
    });
  });
});
