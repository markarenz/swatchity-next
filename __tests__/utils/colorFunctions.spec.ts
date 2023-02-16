import { getRandomColor } from '../../src/utils/colorFunctions';

beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});
describe('getRandomColor', () => {
  it('generates a random color', () => {
    const result = getRandomColor();
    expect(result).toEqual({ r: 127, g: 127, b: 127 });
  });
});
