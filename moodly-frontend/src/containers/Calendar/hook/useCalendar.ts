'use client';

import {useGetCalendarByDate} from '../api/calendar.api';
import {useEffect, useState} from 'react';

interface IUseCalendarReturn {
  currentDate: Date;
  onClickPrevMonth: () => void;
  onClickNextMonth: () => void;
  monthlyEntries: {id: string; emotion: string; date: string}[] | undefined;
  calendar: {
    weekCount: number;
    daysInMonth: number;
  };
}

export const useCalendar = (): IUseCalendarReturn => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendar, setCalendar] = useState({
    weekCount: 0,
    daysInMonth: 0
  });

  const {data: monthlyEntries} = useGetCalendarByDate({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1
  });

  const onClickPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
  };

  const onClickNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()));
  };

  useEffect(() => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    setCalendar({
      weekCount: Math.ceil((firstDayOfMonth + lastDateOfMonth) / 7),
      daysInMonth: lastDateOfMonth
    });
  }, [currentDate]);

  return {
    currentDate,
    onClickPrevMonth,
    onClickNextMonth,
    monthlyEntries,
    calendar
  };
};
