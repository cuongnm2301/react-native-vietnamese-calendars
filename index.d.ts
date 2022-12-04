import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export class DateUtil {
  static convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone?: number);
}

export {default as LocaleConfig} from 'xdate';

export interface Theme {
  timelineContainer?: object;
  contentStyle?: ViewStyle;
  event?: object;
  eventTitle?: object;
  eventSummary?: object;
  eventTimes?: object;
  line?: object;
  verticalLine?: object;
  nowIndicatorLine?: object;
  nowIndicatorKnob?: object;
  timeLabel?: object;
  todayTextColor?: string;
  calendarBackground?: string;
  indicatorColor?: string;
  textSectionTitleColor?: string;
  textSectionTitleDisabledColor?: string;
  dayTextColor?: string;
  selectedDayTextColor?: string;
  monthTextColor?: string;
  selectedDayBackgroundColor?: string;
  arrowColor?: string;
  textDisabledColor?: string;
  textInactiveColor?: string;
  backgroundColor?: string; //TODO: remove in V2
  dotColor?: string;
  selectedDotColor?: string;
  disabledArrowColor?: string;
  textDayFontFamily?: TextStyle['fontFamily'];
  textMonthFontFamily?: TextStyle['fontFamily'];
  textDayHeaderFontFamily?: TextStyle['fontFamily'];
  textDayFontWeight?: TextStyle['fontWeight'];
  textMonthFontWeight?: TextStyle['fontWeight'];
  textDayHeaderFontWeight?: TextStyle['fontWeight'];
  textDayFontSize?: number;
  textMonthFontSize?: number;
  textDayHeaderFontSize?: number;
  agendaDayTextColor?: string;
  agendaDayNumColor?: string;
  agendaTodayColor?: string;
  agendaKnobColor?: string;
  todayButtonFontFamily?: TextStyle['fontFamily'];
  todayButtonFontWeight?: TextStyle['fontWeight'];
  todayButtonFontSize?: number;
  textDayStyle?: TextStyle;
  dotStyle?: object;
  arrowStyle?: ViewStyle;
  todayBackgroundColor?: string;
  disabledDotColor?: string;
  inactiveDotColor?: string;
  todayDotColor?: string;
  todayButtonTextColor?: string;
  todayButtonPosition?: string;
  arrowHeight?: number;
  arrowWidth?: number;
  weekVerticalMargin?: number;
  stylesheet?: {
    calendar?: {
      main?: object;
      header?: object;
    };
    day?: {
      basic?: object;
      period?: object;
    };
    dot?: object;
    marking?: object;
    'calendar-list'?: {
      main?: object;
    };
    agenda?: {
      main?: object;
      list?: object;
    };
    expandable?: {
      main?: object;
    };
  };
}

export type DateData = {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};

interface CalendarHeaderProps {
  monthFormat: string;
  webAriaLevel: number;
  arrowsHitSlop: number;
}

interface CalendarProps extends CalendarHeaderProps {
  theme: unknown;
  firstDay: unknown;
  displayLoadingIndicator: unknown;
  showWeekNumbers: unknown;
  style: unknown;
  current: unknown;
  initialDate: unknown;
  minDate: unknown;
  maxDate: unknown;
  markedDates: unknown;
  hideExtraDays: unknown;
  showSixWeeks: unknown;
  onDayPress: unknown;
  onDayLongPress: unknown;
  onMonthChange: unknown;
  onVisibleMonthsChange: unknown;
  disableMonthChange: unknown;
  enableSwipeMonths: unknown;
  disabledByDefault: unknown;
  headerStyle: unknown;
  customHeader: unknown;
  allowSelectionOutOfRange: unknown;
  fortuneDates: unknown;
}

interface CalendarListProps extends CalendarProps {
  pastScrollRange: number;
  futureScrollRange: number;
  calendarWidth: number;
  calendarHeight: number;
  calendarStyle: StyleProp<ViewStyle>;
  staticHeader: boolean;
  showScrollIndicator: boolean;
  animateScroll: boolean;
  scrollEnabled: boolean;
  scrollsToTop: boolean;
  pagingEnabled: boolean;
  horizontal: boolean;
  keyboardShouldPersistTaps: 'never' | 'always' | 'handled';
  keyExtractor: unknown;
  onEndReachedThreshold: number;
  onEndReached: unknown;
  nestedScrollEnabled: boolean;
}

export class CalendarList extends React.Component<CalendarListProps> {
  scrollToMonth: (date: unknown) => void;
}
