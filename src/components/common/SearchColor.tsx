import { useState } from 'react';
import { useIntl } from 'react-intl';
import ColorPicker from './ColorPicker';
import { getRGBfromColorObj } from '@/utils/colorFunctions';
import { Color } from '@/types';

type Props = {
  color: Color;
  onChange: Function;
};
const SearchColor: React.FC<Props> = ({ color, onChange }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { formatMessage } = useIntl();
  const handleClosePicker = () => {
    setIsPickerOpen(false);
  };
  const handleColorClick = () => {
    setIsPickerOpen(true);
  };
  const handlePickerChange = (color: Color) => {
    setIsPickerOpen(false);
    onChange(color);
  };

  return (
    <div>
      <button
        aria-label={formatMessage({ id: 'search__search_color_btn' })}
        onClick={handleColorClick}
        data-testid="btn-search-color"
        className="round"
      >
        <div
          className="w-6 h-6 round hover-zoom border-2 border-gray-5 dark-border-gray-2"
          style={{ backgroundColor: getRGBfromColorObj(color) }}
        />
      </button>
      <ColorPicker
        isOpen={isPickerOpen}
        color={color}
        closeColorPicker={handleClosePicker}
        onChange={handlePickerChange}
      />
    </div>
  );
};

export default SearchColor;
