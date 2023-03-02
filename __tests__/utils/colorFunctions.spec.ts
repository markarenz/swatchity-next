import {
  getRandomColor,
  getRandomGray,
  getRGBfromColorObj,
  tweakHue,
  tweakSaturation,
  tweakValue,
} from '../../src/utils/colorFunctions';

beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});
describe('getRandomColor', () => {
  it('generates a random color', () => {
    const result = getRandomColor();
    expect(result).toEqual({ r: 127, g: 127, b: 127 });
  });
});

describe('getRandomGray', () => {
  it('generates a random grayscale color', () => {
    const result = getRandomGray();
    expect(result).toEqual({ r: 127, g: 127, b: 127 });
  });
});

describe('getRGBfromColorObj', () => {
  it('return rgb value from color obj', () => {
    const result = getRGBfromColorObj({ r: 127, g: 127, b: 127 });
    expect(result).toEqual('rgb(127,127,127)');
  });
});

describe('tweakHue', () => {
  it('returns tweaked RGB value', () => {
    const result = tweakHue({ r: 200, g: 80, b: 50 }, 1);
    expect(result).toEqual({ r: 77, g: 199, b: 49 });
  });
  it('handles hue rollover ', () => {
    const result = tweakHue({ r: 255, g: 0, b: 35 }, 1);
    expect(result).toEqual({ r: 131, g: 0, b: 255 });
  });
  it('handles hue rollunder', () => {
    const result = tweakHue({ r: 255, g: 35, b: 0 }, -1);
    expect(result).toEqual({ r: 131, g: 0, b: 255 });
  });
});

describe('tweakSaturation', () => {
  it('returns tweaked RGB value', () => {
    const result = tweakSaturation({ r: 200, g: 80, b: 50 }, 1);
    expect(result).toEqual({ r: 199, g: 39, b: 0 });
  });
  it('returns tweaked RGB value with clamp', () => {
    const result = tweakSaturation({ r: 150, g: 150, b: 150 }, -1);
    expect(result).toEqual({ r: 149, g: 149, b: 149 });
  });
});

describe('tweakValue', () => {
  it('returns tweaked RGB value', () => {
    const result = tweakValue({ r: 200, g: 80, b: 50 }, 1);
    expect(result).toEqual({ r: 250, g: 100, b: 62 });
  });

  it('returns tweaked RGB value with emphasis on B and G', () => {
    const result = tweakValue({ r: 80, g: 200, b: 50 }, 1);
    const result2 = tweakValue({ r: 80, g: 50, b: 200 }, 1);
    expect(result).toEqual({ r: 100, g: 250, b: 62 });
    expect(result2).toEqual({ r: 100, g: 62, b: 250 });
  });
});

// Running all the values below, it was clear that the h value in rgb2hsv was never > 1
// describe('TEMP', () => {
//   it('loads ALL COLORS', () => {
//     const vals = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 255];
//     vals.forEach((r) => {
//       vals.forEach((g) => {
//         vals.forEach((b) => {
//           const result = rgb2hsv({ r, g, b });
//           console.log('result');
//         });
//       });
//     });
//   });
// });
