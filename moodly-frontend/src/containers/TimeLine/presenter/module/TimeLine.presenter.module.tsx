import styles from './TimeLine.module.css';
import classNames from 'classnames/bind';
import Image from 'next/image';
import {type FC} from 'react';

const cx = classNames.bind(styles);

const TimeLinePresenterModule: FC = () => {
  return (
    <div className={cx('timeline')}>
      <h1 className={cx('year')}>2026</h1>
      <div className={cx('timeline__item')}>
        <Image src="/images/calm.png" alt="calm" width={50} height={50} className={cx('timeline__item__image')} />
        <div className={cx('timeline__item__content')}>
          <div className={cx('timeline__item__date-container')}>
            <h2 className={cx('timeline__item__date')}>4월 20일</h2>
            <p className={cx('timeline__item__day')}>일요일</p>
          </div>
          <p className={cx('timeline__item__description')}>히히 블로그에 지금까지 썼던 감정일기를 올렸다!</p>
        </div>
      </div>
    </div>
  );
};

export default TimeLinePresenterModule;
