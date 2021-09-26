import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const COLORS = {
  primary: '#2B508A',
  secondary: '#2B508A',

  lightGray1: '#f5f6fa',

  green: '#37E39F',
  lightGreen: '#E6FEF0',

  lime: '#00BA63',
  emerald: '#2BC978',

  red: '#F9A8BA',
  lightRed: '#FFF1F0',

  purple: '#6B3CE9',
  lightPurple: '#F3EFFF',

  yellow: '#FFC664',
  lightYellow: '#FFF9EC',

  black: '#1E1F20',
  white: '#FFFFFF',

  lightGray: '#dbdbdb',
  gray: '#6A6A6A',
  darkGray: '#C3C6C7',

  LightBlue1: '#ffffff',
  LightBlue2: '#ffffff',
  LightBlue3: '#ffffff',

  LightBlue4: '#f6f8fc',

  transparent: 'transparent',
};

export const SIZES = {
  // global sizes
  base: wp('2%'),
  font: 14,
  radius: wp('3%'),
  padding: hp('2.5%'),

  // font sizes
  h0: 36,
  h1: 26,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 34},
  h0: {fontFamily: 'Roboto-Black', fontSize: SIZES.h0, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
