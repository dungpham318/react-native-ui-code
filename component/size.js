import { Dimensions, Platform, StatusBar } from 'react-native';
const sizeWindow = Dimensions.get('window');

const sizeDefault = {
  width: 828,
  height: 1640,
};
const ratioDefault = sizeDefault.height / sizeDefault.width;
const ratioCurrent = sizeWindow.height / sizeWindow.width;
const scaleVer = sizeWindow.height / sizeDefault.height;
const scaleHoz = sizeWindow.width / sizeDefault.width;

const basicSize = {
  s2: 2,
  s5: 5,
  s7: 7,
  s10: 10,
  s15: 15,
  s18: 18,
  s20: 20,
  s25: 25,
  s30: 30,
  s35: 35,
  s40: 40,
  s45: 45,
  s50: 50,
  s55: 55,
  s60: 60,
  s65: 65,
  s70: 70,
  s75: 75,
  s80: 80,
  s90: 90,
  s100: 100,
  s120: 120,
  s140: 140,
  s160: 160,
  s180: 180,
  s200: 200,
  s210: 210,
  s220: 220,
  s230: 230,
  s240: 240,
  s260: 260,
  s320: 320,
  s340: 340,
  s370: 370,
  s400: 400,
  s420: 420,
  s440: 440,
  s570: 570,
  s70: 70,
  h10: 10,
  h12: 12,
  h14: 14,
  h16: 16,
  h18: 18,
  h20: 20,
  h22: 22,
  h24: 24,
  h26: 26,
  h28: 28,
  h30: 30,
  h32: 32,
  h34: 34,
  h36: 36,
  h38: 38,
  h40: 40,
  h42: 42,
  h44: 44,
  h46: 46,
  h48: 48,
  h52: 52,
  h65: 65,
  h80: 80,
  h90: 90,
  h100: 100,
};
const Sizes = {
  h10: scale(basicSize.h10),
  h12: scale(basicSize.h12),
  h14: scale(basicSize.h14),
  h16: scale(basicSize.h16),
  h18: scale(basicSize.h18),
  h20: scale(basicSize.h20),
  h22: scale(basicSize.h22),
  h24: scale(basicSize.h24),
  h26: scale(basicSize.h26),
  h28: scale(basicSize.h28),
  h30: scale(basicSize.h30),
  h32: scale(basicSize.h32),
  h34: scale(basicSize.h34),
  h36: scale(basicSize.h36),
  h38: scale(basicSize.h38),
  h40: scale(basicSize.h40),
  h42: scale(basicSize.h42),
  h44: scale(basicSize.h44),
  h46: scale(basicSize.h46),
  h48: scale(basicSize.h48),
  h52: scale(basicSize.h52),
  h65: scale(basicSize.h65),
  h80: scale(basicSize.h80),
  h90: scale(basicSize.h90),
  h100: scale(basicSize.h100),

  s2: scale(basicSize.s2),
  s5: scale(basicSize.s5),
  s7: scale(basicSize.s7),
  s10: scale(basicSize.s10),
  s15: scale(basicSize.s15),
  s20: scale(basicSize.s20),
  s25: scale(basicSize.s25),
  s30: scale(basicSize.s30),
  s35: scale(basicSize.s35),
  s40: scale(basicSize.s40),
  s45: scale(basicSize.s45),
  s50: scale(basicSize.s50),
  s55: scale(basicSize.s55),
  s60: scale(basicSize.s60),
  s70: scale(basicSize.s70),
  s75: scale(basicSize.s75),
  s80: scale(basicSize.s80),
  s90: scale(basicSize.s90),
  s100: scale(basicSize.s100),
  s120: scale(basicSize.s120),
  s140: scale(basicSize.s140),
  s160: scale(basicSize.s160),
  s200: scale(basicSize.s200),
  s240: scale(basicSize.s240),
  s260: scale(basicSize.s260),
  s340: scale(basicSize.s340),
};

export default Sizes;
function scale(size) {
  if (ratioCurrent > ratioDefault) {
    return size * scaleVer;
  } else {
    return size * scaleHoz;
  }
}