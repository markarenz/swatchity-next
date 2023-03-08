import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import ButtonIcon from './ButtonIcon';
import { altBtnData } from '@/utils/colorPickerConstants';
import ColorPickerAltColorBtn from '@/components/common/ColorPickerAltColorBtn';
import IconClose from '../icons/IconClose';
import { Color } from '@/types';
import NonSSRWrapper from './NonSSRWrapper';
import {
  getRandomColor,
  getRandomGray,
  getRGBfromColorObj,
  tweakHue,
  tweakSaturation,
  tweakValue,
} from '@/utils/colorFunctions';
import styles from '@/styles/modules/colorPicker.module.scss';

type Props = {
  color: Color;
  isOpen: boolean;
  closeColorPicker: Function;
  onChange: Function;
};
const ColorPicker: React.FC<Props> = ({ color, isOpen, closeColorPicker, onChange }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [newColor, setNewColor] = useState<Color>(color);
  const [animStatus, setAnimStatus] = useState('');
  const handleClickClose = () => {
    closeColorPicker();
    setAnimStatus('out');
    setTimeout(() => {
      setAnimStatus('');
      setNewColor(color);
    }, 500);
  };
  const getAltColors = (c: Color) => {
    const alts = [];
    alts[0] = tweakSaturation(tweakHue(c, -1), 1);
    alts[1] = tweakValue(c, 1);
    alts[2] = tweakSaturation(tweakHue(c, 1), -1);
    alts[3] = getRandomColor();
    alts[4] = tweakSaturation(c, 1);
    alts[5] = tweakValue(c, -1);
    alts[6] = tweakSaturation(c, -1);
    alts[7] = getRandomGray();
    return alts;
  };
  const [altColors, setAltColors] = useState<Color[]>(getAltColors(color));
  const { formatMessage } = useIntl();
  useEffect(() => {
    if (isOpen) {
      setAnimStatus('');
      setNewColor(color);
      const alts = getAltColors(color);
      setAltColors(alts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => {
    const alts = getAltColors(newColor);
    setAltColors(alts);
  }, [newColor]);

  useEffect(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 500);
  }, [isOpen]);

  const clickAltColor = (c: Color) => {
    if (animStatus === '') {
      setAnimStatus('out');
      setTimeout(() => {
        setNewColor(c);
        setAnimStatus('in');
        setTimeout(() => {
          setAnimStatus('');
        }, 500);
      }, 500);
    }
  };
  return (
    <div
      className={`colorPicker fixed top-0 left-0 wh-screen transition ${styles.modal} ${
        isOpen ? 'opacity-1 pointer-all' : `opacity-0 pointer-none ${styles.isClosed}`
      } ${isOpening && styles.isOpening}`}
      style={{ zIndex: 20 }}
      data-testid="color-picker"
    >
      <NonSSRWrapper>
        <div className="relative">
          <div className="absolute right-1 top-1">
            <ButtonIcon
              onClick={() => handleClickClose()}
              label={formatMessage({ id: 'icon_close' })}
              extraClasses="hover-zoom h-3 w-3 pickerClose"
              testID="picker-close"
            >
              <IconClose color="gray-1" colorDark="gray-1" />
            </ButtonIcon>
          </div>
          <div className="flex justify-center items-center wh-screen">
            <div className={styles.pickerMain}>
              <button
                className={`pickerOK ${styles.colorButton} ${styles.colorButtonMain} ${
                  styles.posCC
                } ${animStatus === 'out' && styles.animOut} ${
                  animStatus === 'in' && styles.animIn
                }`}
                aria-label={formatMessage({ id: 'color_picker__main' })}
                style={{ backgroundColor: getRGBfromColorObj(newColor) }}
                onClick={() => onChange(newColor)}
                data-testid="picker-btn-ok"
              />
              {altBtnData.map((item) => (
                <ColorPickerAltColorBtn
                  key={`${item.labelKey}-${item.idx}`}
                  label={formatMessage({ id: item.labelKey })}
                  posStyle={item.posStyle}
                  clickAltColor={clickAltColor}
                  animStatus={animStatus}
                  color={altColors[item.idx]}
                />
              ))}
            </div>
          </div>
        </div>
      </NonSSRWrapper>
    </div>
  );
};

export default ColorPicker;
