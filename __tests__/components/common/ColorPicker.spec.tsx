import ColorPicker from '@/components/common/ColorPicker';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';

jest.useFakeTimers();

const mockProps = {
  color: {
    r: 100,
    g: 100,
    b: 100,
  },
  isOpen: true,
  closeColorPicker: jest.fn(),
  onChange: jest.fn(),
};
describe('ColorPicker', () => {
  it('renders component closed', async () => {
    act(() => {
      render(<ColorPicker {...mockProps} isOpen={false} />);
    });
    const element = document.querySelector('.fixed');
    await waitFor(() => expect(element).toBeInTheDocument());
  });
  it('renders component open', async () => {
    act(() => {
      render(<ColorPicker {...mockProps} />);
    });
    const element = document.querySelector('.fixed');
    expect(element).toBeInTheDocument();
  });
  it('handles close button', async () => {
    act(() => {
      render(<ColorPicker {...mockProps} />);
    });
    const element = await screen.findByTestId('picker-close');
    if (element) {
      await waitFor(async () => {
        fireEvent(
          element,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        );
      });
    }
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockProps.closeColorPicker).toHaveBeenCalled();
  });

  it('handles ESC key to close', () => {
    act(() => {
      render(<ColorPicker {...mockProps} />);
    });
    const element = document.querySelector('.fixed');
    if (element) {
      fireEvent.keyDown(element, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });
    }
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockProps.closeColorPicker).toHaveBeenCalled();
  });

  it('handles OK button - center color', async () => {
    act(() => {
      render(<ColorPicker {...mockProps} />);
    });
    const element = await screen.findByTestId('picker-btn-ok');
    if (element) {
      fireEvent(
        element,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(mockProps.onChange).toHaveBeenCalled();
  });

  it('handles alt color click', async () => {
    jest.useFakeTimers();
    act(() => {
      render(<ColorPicker {...mockProps} />);
    });
    const element = await screen.findByLabelText('Hue Twist Clockwise');
    if (element) {
      await act(async () => {
        await act(async () => {
          fireEvent(
            element,
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            }),
          );
        });
      });
    }
    act(() => {
      jest.advanceTimersByTime(500);
    });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(element).toBeInTheDocument();
  });
});
