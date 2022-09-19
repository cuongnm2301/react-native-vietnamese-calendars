import React, {useState, useMemo, useCallback} from 'react';
import {StyleSheet, Text, View, TextStyle, Dimensions} from 'react-native';
import {CalendarList, DateData, LocaleConfig} from 'react-native-calendars';
import testIDs from '../testIDs';

const RANGE = 24;
const initialDate = '2022-09-18';
const nextWeekDate = '2022-07-14';
const nextMonthDate = '2022-08-05';
const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
  horizontalView?: boolean;
}

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ],
  monthNamesShort: [
    'Thg 1',
    'Thg 2',
    'Thg 3',
    'Thg 4',
    'Thg 5',
    'Thg 6',
    'Thg 7',
    'Thg 8',
    'Thg 9',
    'Thg 10',
    'Thg 11',
    'Thg 12'
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
  dayNamesShort: ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN']
};
LocaleConfig.defaultLocale = 'vi';

const CalendarListScreen = (props: Props) => {
  const {horizontalView} = props;
  const [selected, setSelected] = useState(initialDate);
  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true
      }
    };
  }, [selected]);

  const onDayPress = useCallback((day: DateData) => {
    setSelected(day.dateString);
  }, []);

  return (
    <CalendarList
      testID={testIDs.calendarList.CONTAINER}
      current={initialDate}
      hideExtraDays={false}
      pastScrollRange={RANGE}
      futureScrollRange={RANGE}
      onDayPress={onDayPress}
      markedDates={marked}
      // renderHeader={!horizontalView ? renderCustomHeader : undefined}
      // calendarHeight={!horizontalView ? 390 : undefined}
      calendarWidth={SCREEN_WIDTH}
      theme={theme}
      horizontal={true}
      pagingEnabled={true}
      staticHeader={true}
      firstDay={1}
    />
  );
};

const theme = {
  selectedDayBackgroundColor: 'rgba(227, 47, 39, 0.15)',
  selectedDayTextColor: '#E32F27'
};

function renderCustomHeader(date: any) {
  const header = date.toString('MMMM yyyy');
  const [month, year] = header.split(' ');
  const textStyle: TextStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#5E60CE',
    paddingRight: 5
  };

  return (
    <View style={styles.header}>
      <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
      <Text style={[styles.year, textStyle]}>{year}</Text>
    </View>
  );
}

export default CalendarListScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
  month: {
    marginLeft: 5
  },
  year: {
    marginRight: 5
  }
});
