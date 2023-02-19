type Props = {
  children: JSX.Element;
  onClick: Function;
  disabled?: boolean;
  label: string;
};

const ButtonIcon: React.FC<Props> = ({ children, onClick, disabled, label }) => {
  return (
    <button
      role="button"
      onClick={() => onClick()}
      disabled={disabled}
      aria-label={label}
      className="w-3 h-3 round"
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
