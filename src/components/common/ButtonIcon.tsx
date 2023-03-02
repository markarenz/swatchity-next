type Props = {
  children: JSX.Element;
  onClick: Function;
  disabled?: boolean;
  label: string;
  extraClasses?: string;
};

const ButtonIcon: React.FC<Props> = ({ children, onClick, disabled, label, extraClasses }) => {
  return (
    <button
      role="button"
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
