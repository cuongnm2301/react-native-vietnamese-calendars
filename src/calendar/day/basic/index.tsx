import React, {Fragment, useCallback, useMemo, useRef} from 'react';
import {TouchableOpacity, Text, View, ViewProps, StyleSheet} from 'react-native';

import {xdateToData} from '../../../interface';
import {Theme, DayState, MarkingTypes, DateData} from '../../../types';
import styleConstructor from './style';
import Marking, {MarkingProps} from '../marking';
import DateUtil from '../../../utils/date';

export interface BasicDayProps extends ViewProps {
  state?: DayState;
  /** The marking object */
  marking?: MarkingProps;
  /** Date marking style [simple/period/multi-dot/multi-period]. Default = 'simple' */
  markingType?: MarkingTypes;
  /** Theme object */
  theme?: Theme;
  /** onPress callback */
  onPress?: (date?: DateData) => void;
  /** onLongPress callback */
  onLongPress?: (date?: DateData) => void;
  /** The date to return from press callbacks */
  date?: string;

  /** Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates*/
  disableAllTouchEventsForDisabledDays?: boolean;
  /** Disable all touch events for inactive days. can be override with disableTouchEvent in markedDates*/
  disableAllTouchEventsForInactiveDays?: boolean;

  /** Test ID */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Fortune date label */
  fortuneDate?: 'good' | 'bad';
}

const BasicDay = (props: BasicDayProps) => {
  const {
    theme,
    date,
    onPress,
    onLongPress,
    markingType,
    marking,
    state,
    disableAllTouchEventsForDisabledDays,
    disableAllTouchEventsForInactiveDays,
    accessibilityLabel,
    children,
    testID,
    fortuneDate
  } = props;
  const style = useRef(styleConstructor(theme));
  const _marking = marking || {};
  const isSelected = _marking.selected || state === 'selected';
  const isDisabled = typeof _marking.disabled !== 'undefined' ? _marking.disabled : state === 'disabled';
  const isInactive = _marking?.inactive;
  const isToday = state === 'today';
  const isMultiDot = markingType === Marking.markings.MULTI_DOT;
  const isMultiPeriod = markingType === Marking.markings.MULTI_PERIOD;
  const isCustom = markingType === Marking.markings.CUSTOM;
  const dateData = date ? xdateToData(date) : undefined;
  const shouldDisableTouchEvent = () => {
    const {disableTouchEvent} = _marking;
    let disableTouch = false;

    if (typeof disableTouchEvent === 'boolean') {
      disableTouch = disableTouchEvent;
    } else if (typeof disableAllTouchEventsForDisabledDays === 'boolean' && isDisabled) {
      disableTouch = disableAllTouchEventsForDisabledDays;
    } else if (typeof disableAllTouchEventsForInactiveDays === 'boolean' && isInactive) {
      disableTouch = disableAllTouchEventsForInactiveDays;
    }
    return disableTouch;
  };

  const luneDate = useMemo(() => {
    if (dateData) {
      const {day, month, year} = dateData;
      return DateUtil.convertSolar2Lunar(day, month, year);
    }
    return undefined;
  }, []);

  const getContainerStyle = () => {
    const {customStyles, selectedColor} = _marking;
    const styles = [style.current.base];

    if (isSelected) {
      styles.push(style.current.selected);
      if (selectedColor) {
        styles.push({backgroundColor: selectedColor});
      }
    } else if (isToday) {
      styles.push(style.current.today);
    }

    //Custom marking type
    if (isCustom && customStyles && customStyles.container) {
      if (customStyles.container.borderRadius === undefined) {
        customStyles.container.borderRadius = 16;
      }
      styles.push(customStyles.container);
    }

    return styles;
  };

  const getTextStyle = () => {
    const {customStyles, selectedTextColor} = _marking;
    const styles = [style.current.text];

    if (isSelected) {
      styles.push(style.current.selectedText);
      if (selectedTextColor) {
        styles.push({color: selectedTextColor});
      }
    } else if (isDisabled) {
      styles.push(style.current.disabledText);
    } else if (isToday) {
      styles.push(style.current.todayText);
    } else if (isInactive) {
      styles.push(style.current.inactiveText);
    }

    //Custom marking type
    if (isCustom && customStyles && customStyles.text) {
      styles.push(customStyles.text);
    }

    return styles;
  };

  const getLunarTextStyle = () => {
    return style.current.lunarText;
  };

  const _onPress = useCallback(() => {
    onPress?.(dateData);
  }, [onPress, date]);

  const _onLongPress = useCallback(() => {
    onLongPress?.(dateData);
  }, [onLongPress, date]);

  const renderMarking = () => {
    const {marked, dotColor, dots, periods} = _marking;
    return (
      <Marking
        type={markingType}
        theme={theme}
        marked={isMultiDot ? true : marked}
        selected={isSelected}
        disabled={isDisabled}
        inactive={isInactive}
        today={isToday}
        dotColor={dotColor}
        dots={dots}
        periods={periods}
      />
    );
  };

  const renderText = () => {
    return (
      <Text allowFontScaling={false} style={getTextStyle()}>
        {String(children)}
      </Text>
    );
  };

  const renderLunaDate = () => {
    const style = getTextStyle();
    const lunaDay = luneDate?.[0] || undefined;
    const lunaMonth = luneDate?.[1] || undefined;

    return lunaDay ? (
      <View style={{position: 'absolute', bottom: 2}}>
        <Text allowFontScaling={false} style={[style, extraDateStyle.extraLunaTextFont, getLunarTextStyle()]}>
          {`${lunaDay.toString()} / ${lunaMonth?.toString()}`}
        </Text>
      </View>
    ) : null;
  };

  const renderGoodBad = () => {
    const backgroundColorFortuneDate = fortuneDate === 'good' ? '#CF221A' : '#808080';
    const backgroundColor = fortuneDate ? backgroundColorFortuneDate : undefined;
    return (
      <View
        style={[
          extraDateStyle.fortuneDate,
          {
            backgroundColor
          }
        ]}
      />
    );
  };

  const renderFullDate = () => {
    return (
      <Fragment>
        {renderText()}
        {renderLunaDate()}
        {renderGoodBad()}
      </Fragment>
    );
  };

  const renderContent = () => {
    return (
      <Fragment>
        {renderText()}
        {renderLunaDate()}
        {renderMarking()}
        {renderGoodBad()}
      </Fragment>
    );
  };

  const renderContainer = () => {
    const {activeOpacity} = _marking;

    return (
      <View style={{padding: 2, borderLeftWidth: 1}}>
        <TouchableOpacity
          testID={testID}
          // style={[getContainerStyle()]}
          style={getContainerStyle()}
          disabled={shouldDisableTouchEvent()}
          activeOpacity={activeOpacity}
          onPress={!shouldDisableTouchEvent() ? _onPress : undefined}
          onLongPress={!shouldDisableTouchEvent() ? _onLongPress : undefined}
          accessible
          accessibilityRole={isDisabled ? undefined : 'button'}
          accessibilityLabel={accessibilityLabel}
        >
          {isMultiPeriod ? renderFullDate() : renderContent()}
        </TouchableOpacity>
      </View>
    );
  };

  const renderPeriodsContainer = () => {
    return (
      <View style={[style.current.container]}>
        {renderContainer()}
        {renderMarking()}
      </View>
    );
  };

  return isMultiPeriod ? renderPeriodsContainer() : renderContainer();
};

const extraDateStyle = StyleSheet.create({
  fortuneDate: {
    width: 6,
    height: 6,
    borderRadius: 6,
    position: 'absolute',
    top: 4,
    left: 0
  },
  extraLunaTextFont: {
    fontSize: 10
  }
});

export default BasicDay;
BasicDay.displayName = 'BasicDay';
