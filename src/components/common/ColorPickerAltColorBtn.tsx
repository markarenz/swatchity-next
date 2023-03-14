import styles from '@/styles/modules/colorPicker.module.scss';
import { Color } from '@/types';
import { getRGBfromColorObj } from '@/utils/colorFunctions';

type Props = {
  label: string;
  color: Color;
  posStyle: string;
  clickAltColor: Function;
  animStatus: string;
  focusable?: boolean;
};
const ColorPickerAltColorBtn: React.FC<Props> = ({
  label,
  color,
  posStyle,
  clickAltColor,
  animStatus,
  focusable,
}) => {
  return (
    <button
      className={`${styles.colorButton} ${posStyle} ${animStatus === 'in' && styles.altAnimIn} ${
        animStatus === 'out' && styles.altAnimOut
      }`}
      aria-label={label}
      onClick={() => clickAltColor(color)}
      style={{
        backgroundColor: getRGBfromColorObj(color),
      }}
      tabIndex={focusable ? 0 : -1}
    />
  );
};

ColorPickerAltColorBtn.defaultProps = {
  focusable: true,
};

export default ColorPickerAltColorBtn;
