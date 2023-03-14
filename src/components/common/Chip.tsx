import IconClose from '@/components/icons/IconClose';
import styles from '@/styles/modules/chip.module.scss';

type Props = {
  children: JSX.Element;
  removeItem: Function;
  idx: number;
};

const Chip: React.FC<Props> = ({ removeItem, children, idx }) => {
  return (
    <div className={styles.chip}>
      <div className={styles.wrap}>
        {children}
        <button
          onClick={() => removeItem()}
          className="w-3 h-3 py-1 px-1 hover-rotate-icon"
          data-testid={`chip-${idx}`}
        >
          <IconClose color="gray-5" colorDark="gray-1" />
        </button>
      </div>
    </div>
  );
};
export default Chip;
