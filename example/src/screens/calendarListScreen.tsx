import React, {useState, useMemo, useCallback} from 'react';
import {StyleSheet, Text, View, TextStyle, Dimensions, Platform} from 'react-native';
import {CalendarList, DateData, LocaleConfig} from 'react-native-vietnamese-calendars';
import testIDs from '../testIDs';

const RANGE = 24;
const initialDate = '2022-09-18';
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
      fortuneDates={{
        '22-09-2022': 'good',
        '23-09-2022': 'bad'
      }}
    />
  );
};

// const style = StyleSheet.create({
//   a: {
//     alignSelf
//   }
// })

const theme = {
  selectedDayBackgroundColor: 'rgba(227, 47, 39, 0.3)',
  selectedDayTextColor: 'white',
  textDayFontWeight: 'bold',
  textDayFontSize: 18,
  arrowColor: '#222B45',
  textSectionTitleColor: '#55555B',
  todayBackgroundColor: 'rgba(227, 47, 39, 0.3)',
  todayTextColor: '#E32F27',
  'stylesheet.calendar.header': {
    arrow: {
      borderWidth: 1,
      borderColor: 'rgba(206, 211, 222, 0.5)',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6
    },
    week: {
      backgroundColor: '#E3E3E3',
      marginTop: 7,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: 4
    }
  }
};

function renderCustomHeader(date: any) {
  const header = date.toString('MMMM/yyyy');
  const [month, year] = header.split('/');

  return (
    <View style={styles.header}>
      <Text style={styles.month}>{`${month}`}</Text>
      <Text style={styles.year}>{year}</Text>
    </View>
  );
}

export default CalendarListScreen;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center'
  },
  month: {
    fontSize: 20,
    fontWeight: '400',
    color: '#222B45'
  },
  year: {
    marginRight: 5,
    fontSize: 12,
    fontWeight: '400'
  }
});
