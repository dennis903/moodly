import styles from './TimeLine.module.css';
import classNames from 'classnames/bind';
import {type FC} from 'react';

const cx = classNames.bind(styles);

const TimeLinePresenterModule: FC = () => {
  return (
    <div className={cx('timeline')}>
      <h1 className={cx('year')}>2026</h1>
      <div className={cx('timeline__item')}></div>
      <div className={cx('timeline__item__content')}>
        <h2 className={cx('timeline__item__title')}>4월 20일</h2>
        <p className={cx('timeline__item__description')}>히히 블로그에 지금까지 썼던 감정일기를 올렸다!</p>
      </div>
    </div>
  );
};

export default TimeLinePresenterModule;
