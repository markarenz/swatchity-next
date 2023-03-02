import { Color, HsvColor } from '@/types';

export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return {
    r,
    g,
    b,
  };
};
export const getRandomGray = () => {
  const v = Math.floor(Math.random() * 255);
  return {
    r: v,
    g: v,
    b: v,
  };
};

export const getRGBfromColorObj = (color: Color): string => {
  return `rgb(${color.r},${color.g},${color.b})`;
};

// Based on an example from aetonsi on stackoverflow.com
function rgb2hsv(rgb: Color) {
  const { r, g, b } = rgb;
  let rabs, gabs, babs, rr, gg, bb, diffc, percentRoundFn;
  let h: number = 0;
  let s: number = 0;
  let v: number = 0;
  let diff: number;

  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  (v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs));
  diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = (num: number) => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);
    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
      // In testing, h was never > 1
      // } else if (h > 1) {
      //   h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100),
  };
}

// Based on an example from 30secondsofcode.org
const hsv2rgb = (hsv: HsvColor) => {
  let h = hsv.h;
  let s = hsv.s / 100;
  let v = hsv.v / 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => v * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return {
    r: Math.floor(255 * f(5)),
    g: Math.floor(255 * f(3)),
    b: Math.floor(255 * f(1)),
  };
};

const clamp = (num: number, min: number, max: number): number => {
  if (num <= min) {
    return min;
  }
  if (num >= max) {
    return max;
  }
  return num;
};
export const tweakHue = (color: Color, dir: number): Color => {
  const value = dir * Math.floor(15 + Math.random() * 165);
  const { h, s, v } = rgb2hsv(color);
  let newH = h + value;
  if (newH < 0) {
    newH = 360 + newH;
  } else if (newH > 360) {
    newH = 360 - newH;
  }
  const newColor = hsv2rgb({
    h: newH,
    s,
    v,
  });
  return newColor;
};

export const tweakSaturation = (color: Color, dir: number): Color => {
  const value = dir * Math.floor(10 + Math.random() * 50);
  const { h, s, v } = rgb2hsv(color);
  const newColor = hsv2rgb({
    h,
    s: clamp(s + value, 0, 100),
    v,
  });
  return newColor;
};

export const tweakValue = (color: Color, dir: number): Color => {
  const value = dir * Math.floor(10 + Math.random() * 20);
  const { h, s, v } = rgb2hsv(color);
  const newColor = hsv2rgb({
    h,
    s,
    v: clamp(v + value, 0, 100),
  });
  return newColor;
};
