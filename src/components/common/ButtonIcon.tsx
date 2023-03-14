type Props = {
  children: JSX.Element;
  onClick: Function;
  disabled?: boolean;
  label: string;
  extraClasses?: string;
  testID?: string;
  focusable?: boolean;
};

const ButtonIcon: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  label,
  extraClasses,
  testID,
  focusable,
}) => {
  return (
    <button
      role="button"
      data-testid={testID}
      onClick={() => onClick()}
      disabled={disabled}
      aria-label={label}
      className={`w-3 h-3 round ${extraClasses ? extraClasses : ''}`}
      tabIndex={focusable ? 0 : -1}
    >
      {children}
    </button>
  );
};

ButtonIcon.defaultProps = {
  focusable: true,
};

export default ButtonIcon;
