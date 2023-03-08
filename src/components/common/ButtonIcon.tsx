type Props = {
  children: JSX.Element;
  onClick: Function;
  disabled?: boolean;
  label: string;
  extraClasses?: string;
  testID?: string;
};

const ButtonIcon: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  label,
  extraClasses,
  testID,
}) => {
  return (
    <button
      role="button"
      data-testid={testID}
      onClick={() => onClick()}
      disabled={disabled}
      aria-label={label}
      className={`w-3 h-3 round ${extraClasses ? extraClasses : ''}`}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
