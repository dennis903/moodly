'use client';

import styles from './Calendar.module.css';
import classNames from 'classnames/bind';
import {format} from 'date-fns';
import {ChevronLeft, ChevronRight, House, Settings} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface ICalendarPresenterModuleProps {
  currentDate: Date;
  onClickPrevMonth: () => void;
  onClickNextMonth: () => void;
  monthlyEntries:
    | {
        id: string;
        emotion: string;
        date: string;
      }[]
    | undefined;
  calendar: {
    weekCount: number;
    daysInMonth: number;
  };
}

const CalendarPresenterModule: FC<ICalendarPresenterModuleProps> = (props) => {
  return (
    <div className={cx('calendar')}>
      <div className={cx('calendar__header')}>
        <button className={cx('calendar__header-button')}>
          <House size={24} />
        </button>
        <button className={cx('calendar__header-button')}>
          <Settings size={24} />
        </button>
      </div>
      <div className={cx('calendar__contents')}>
        <div className={cx('calendar__contents-header')}>
          <button type="button" className={cx('calendar__button')} onClick={props.onClickPrevMonth}>
            <ChevronLeft size={24} />
          </button>
          <div className={cx('calendar__month')}>
            <h3 className={cx('calendar__year')}>{props.currentDate.getFullYear()}년</h3>
            <h2 className={cx('calendar__month-text')}>{props.currentDate.getMonth() + 1}월</h2>
          </div>
          <button type="button" className={cx('calendar__button')} onClick={props.onClickNextMonth}>
            <ChevronRight size={24} />
          </button>
        </div>
        <div className={cx('calendar__contents-weekdays')}>
          <span className={cx('calendar__contents-weekday')}>일</span>
          <span className={cx('calendar__contents-weekday')}>월</span>
          <span className={cx('calendar__contents-weekday')}>화</span>
          <span className={cx('calendar__contents-weekday')}>수</span>
          <span className={cx('calendar__contents-weekday')}>목</span>
          <span className={cx('calendar__contents-weekday')}>금</span>
          <span className={cx('calendar__contents-weekday')}>토</span>
        </div>
        <div className={cx('calendar__contents-body')}>
          {[...Array(props.calendar.weekCount)].map((_, weekIndex) => (
            <div key={weekIndex} className={cx('calendar__week')}>
              {[...Array(7)].map((_, dayIndex) => {
                const dateKey = `${weekIndex}-${dayIndex}`;
                const dayOfMonth = weekIndex * 7 + dayIndex - new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), 1).getDay() + 1;
                const date = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth(), dayOfMonth);
                const isCurrentMonth = dayOfMonth > 0 && dayOfMonth <= props.calendar.daysInMonth;
                const isToday = isCurrentMonth && date.toDateString() === new Date().toDateString();
                const isOverToday = isCurrentMonth && date > new Date();
                const entry = props.monthlyEntries?.find((entry) => entry.date === format(date, 'yyyy-MM-dd'));

                if (!isCurrentMonth) {
                  return <div key={dateKey} className={cx('calendar__day')}></div>;
                }

                if (!entry) {
                  return (
                    <Link key={dateKey} href={`/today?date=${format(date, 'yyyy-MM-dd')}`} className={cx('calendar__day-link')}>
                      <div className={cx('calendar__day')}>
                        <div className={cx('calendar__day-background')} />
                        <span className={cx('calendar__day-info', {'calendar__day-info--today': isToday, 'calendar__day-info--disabled': isOverToday})}>{date.getDate()}</span>
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link key={dateKey} href={`/detail/${entry?.id}`} className={cx('calendar__day-link')}>
                    <div className={cx('calendar__day')}>
                      <div className={cx('calendar__day-background')}>{entry && <Image src={`/images/${entry.emotion.toLowerCase()}.png`} alt={entry.emotion as string} width={30} height={30} className={cx('calendar__day-emotion')} />}</div>
                      <span className={cx('calendar__day-info', {'calendar__day-info--today': isToday, 'calendar__day-info--disabled': isOverToday})}>{date.getDate()}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarPresenterModule;
