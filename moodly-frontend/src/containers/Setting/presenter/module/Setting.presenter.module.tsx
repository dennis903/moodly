import styles from './Setting.module.css';
import classNames from 'classnames/bind';
import {type FC} from 'react';

const cx = classNames.bind(styles);

const SettingPresenterModule: FC = () => {
  return (
    <div className={cx('setting')}>
      <div className={cx('setting-header')}>
        <div className={cx('setting-header__img')}></div>
        <div className={cx('setting-header__info')}>
          <p className={cx('setting-header__info-name')}>사용자 이름</p>
          <p className={cx('setting-header__info-email')}>사용자 이메일</p>
          <p className={cx('setting-header__info-days')}>42일째 기록중</p>
        </div>
      </div>
      <div className={cx('setting-contents')}>
        <div className={cx('setting-contents__item')}>
          <h2 className={cx('setting-contents__item-title')}>기록</h2>
          <p className={cx('setting-contents__item-description')}>기록 알림</p>
          <p className={cx('setting-contents__item-description')}>알림 시간</p>
        </div>
        <div className={cx('setting-contents__item')}>
          <h2 className={cx('setting-contents__item-title')}>지원</h2>
          <p className={cx('setting-contents__item-description')}>도움말</p>
          <p className={cx('setting-contents__item-description')}>의견 보내기</p>
        </div>
        <div className={cx('setting-contents__item')}>
          <h2 className={cx('setting-contents__item-title')}>계정</h2>
          <p className={cx('setting-contents__item-description')}>로그아웃</p>
          <p className={cx('setting-contents__item-description')}>계정 삭제</p>
        </div>
      </div>
    </div>
  );
};

export default SettingPresenterModule;
