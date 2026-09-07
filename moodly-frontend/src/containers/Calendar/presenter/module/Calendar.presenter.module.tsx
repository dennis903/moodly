import styles from './Calendar.module.css';
import classNames from 'classnames/bind';
import {House, Settings} from 'lucide-react';
import {type FC} from 'react';

const cx = classNames.bind(styles);

const CalendarPresenterModule: FC = () => {
  return (
    <div className={cx('calendar')}>
      <div className={cx('calendar__header')}>
        <button className={cx('calendar__button--left')}>
          <House size={24} />
        </button>
        <button className={cx('calendar__button--right')}>
          <Settings size={24} />
        </button>
      </div>
    </div>
  );
};

export default CalendarPresenterModule;
