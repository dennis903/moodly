'use client';

import {useCalendar} from './hook/useCalendar';
import CalendarPresenterModule from './presenter/module/Calendar.presenter.module';
import {type FC} from 'react';

const CalendarContainer: FC = () => {
  const {currentDate, onClickPrevMonth, onClickNextMonth, monthlyEntries, calendar} = useCalendar();

  const vProps = {
    currentDate,
    onClickPrevMonth,
    onClickNextMonth,
    monthlyEntries,
    calendar
  };

  return <CalendarPresenterModule {...vProps} />;
};

export default CalendarContainer;
