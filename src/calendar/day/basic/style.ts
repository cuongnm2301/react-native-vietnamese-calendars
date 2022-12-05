import {StyleSheet, Dimensions} from 'react-native';
import * as defaultStyle from '../../../style';
import {Theme} from '../../../types';
import constants from '../../../commons/constants';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function styleConstructor(theme: Theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      alignItems: 'center'
    },
    base: {
      width: SCREEN_WIDTH / 7 - 5,
      height: SCREEN_WIDTH / 5,
      alignItems: 'center'
    },
    text: {
      marginTop: 4,
      fontSize: appStyle.textDayFontSize,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: appStyle.textDayFontWeight,
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      ...appStyle.textDayStyle
    },
    lunarText: {
      fontSize: 12
    },
    alignedText: {
      marginTop: constants.isAndroid ? 4 : 6
    },
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor
    },
    today: {
      backgroundColor: appStyle.todayBackgroundColor
    },
    todayText: {
      color: appStyle.todayTextColor
    },
    selectedText: {
      color: appStyle.selectedDayTextColor
    },
    disabledText: {
      color: appStyle.textDisabledColor
    },
    inactiveText: {
      color: appStyle.textInactiveColor
    },
    dot: {
      width: 4,
      height: 4,
      marginTop: 1,
      borderRadius: 2,
      opacity: 0,
      ...appStyle.dotStyle
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: appStyle.dotColor
    },
    selectedDot: {
      backgroundColor: appStyle.selectedDotColor
    },
    disabledDot: {
      backgroundColor: appStyle.disabledDotColor || appStyle.dotColor
    },
    todayDot: {
      backgroundColor: appStyle.todayDotColor || appStyle.dotColor
    },
    // @ts-expect-error
    ...(theme['stylesheet.day.basic'] || {})
  });
}
