import ProfileAvatarEdit from '@/components/profile/ProfileAvatarEdit';
import { IntlProvider } from 'react-intl';
import messages from '@/locale/en-US.json';
import { render, screen, act, fireEvent, findByTestId } from '@testing-library/react';

const mockProps = {
  avatarPattern: 2,
  color1: { r: 10, b: 10, g: 10 },
  color2: { r: 10, b: 10, g: 10 },
  color3: { r: 10, b: 10, g: 10 },
  isPatternValid: true,
  setFormData: jest.fn((f: Function) => {
    f();
  }),
};

describe('ProfileAvatarEdit', () => {
  it('renders component', async () => {
    render(
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <ProfileAvatarEdit {...mockProps} />
      </IntlProvider>,
    );
    const element1 = await screen.findByTestId('avatar-color-btn-1');
    const element2 = await screen.findByTestId('avatar-color-btn-2');
    const element3 = await screen.findByTestId('avatar-color-btn-3');
    const patternPrev = await screen.findByLabelText('Previous');
    const patternNext = await screen.findByLabelText('Next');
    if (element1) {
      fireEvent(
        element1,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    if (element2) {
      fireEvent(
        element2,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    if (element3) {
      fireEvent(
        element3,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }

    if (patternPrev) {
      act(() => {
        fireEvent(
          patternPrev,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        );
      });
    }
    if (patternNext) {
      fireEvent(
        patternNext,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    }
    expect(mockProps.setFormData).toHaveBeenCalled();
  });
  // it('handles color change', async () => {
  //   act(() => {
  //     render(
  //       <IntlProvider messages={messages} locale="en" defaultLocale="en">
  //         <ProfileAvatarEdit {...mockProps} />
  //       </IntlProvider>,
  //     );
  //   });
  //   const element1 = await screen.findByTestId('avatar-color-btn-1');
  //   act(() => {
  //     if (element1) {
  //       fireEvent(
  //         element1,
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //         }),
  //       );
  //     }
  //   });
  //   act(() => {
  //     jest.advanceTimersByTime(500);
  //   });

  //   const altBtn = await screen.findByLabelText('Hue Twist Clockwise');
  //   if (altBtn) {
  //     await act(async () => {
  //       fireEvent(
  //         altBtn,
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //         }),
  //       );
  //     });
  //   }
  //   act(() => {
  //     jest.advanceTimersByTime(500);
  //   });

  //   const btnOK = await screen.findByTestId('picker-btn-ok');
  //   if (btnOK) {
  //     fireEvent(
  //       btnOK,
  //       new MouseEvent('click', {
  //         bubbles: true,
  //         cancelable: true,
  //       }),
  //     );
  //   }
  // });
});
