import styles from './Statistics.module.css';
import classNames from 'classnames/bind';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {type FC} from 'react';

const cx = classNames.bind(styles);

const StatisticsPresenterModule: FC = () => {
  return (
    <div className={cx('statistics')}>
      <h2 className={cx('title')}>통계</h2>
      <div className={cx('statistics-header')}>
        <div className={cx('statistics-header__itemlist')}>
          <div className={cx('statistics-header__item')}>
            <p className={cx('statistics-header__item-label')}>주간</p>
          </div>
          <div className={cx('statistics-header__item')}>
            <p className={cx('statistics-header__item-label')}>월간</p>
          </div>
          <div className={cx('statistics-header__item')}>
            <p className={cx('statistics-header__item-label')}>연간</p>
          </div>
        </div>
        <div className={cx('statistics-header__date')}>
          <button type="button" className={cx('statistics-header__button')}>
            <ChevronLeft />
          </button>
          <p className={cx('date')}>2026년 4월</p>
          <button type="button" className={cx('statistics-header__button')}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className={cx('statistics-contents')}>
        <div className={cx('statistics-contents__item')}>
          <p className={cx('statistics-contents__item-label')}>기록한 날</p>
          <p className={cx('statistics-contents__item-value')}>18일</p>
          <p className={cx('statistics-contents__item-subvalue')}>/ 20일</p>
        </div>
        <div className={cx('statistics-contents__item')}>
          <p className={cx('statistics-contents__item-label')}>가장 많은 감정</p>
          <p className={cx('statistics-contents__item-value')}>평온</p>
          <p className={cx('statistics-contents__item-subvalue')}>7회 (39%)</p>
        </div>
        <div className={cx('statistics-contents__item')}>
          <p className={cx('statistics-contents__item-label')}>연속 기록</p>
          <p className={cx('statistics-contents__item-value')}>12일</p>
          <p className={cx('statistics-contents__item-subvalue')}>최장 기록!</p>
        </div>
        <div className={cx('statistics-contents__item')}>
          <p className={cx('statistics-contents__item-label')}>작성률</p>
          <p className={cx('statistics-contents__item-value')}>90%</p>
          <p className={cx('statistics-contents__item-subvalue')}>지난달 대비 +12%</p>
        </div>
      </div>
      <h2 className={cx('statistics-chart-title')}>감정 분포</h2>
      <div className={cx('statistics-chart')}>
        <div className={cx('statistics-chart__item')}></div>
      </div>
      <h2 className={cx('statistics-chart-title')}>감정 추이</h2>
      <h2 className={cx('statistics-chart-title')}>태그별 감정</h2>
    </div>
  );
};

export default StatisticsPresenterModule;
