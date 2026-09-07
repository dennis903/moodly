import styles from './Setting.module.css';
import classNames from 'classnames/bind';
import {Bell, ChevronRight, CircleQuestionMark, Clock4, LogOut, MessageSquare, Trash2} from 'lucide-react';
import Image from 'next/image';
import {type FC} from 'react';

const cx = classNames.bind(styles);

const SettingPresenterModule: FC = () => {
  return (
    <div className={cx('setting')}>
      <h2 className={cx('title')}>설정</h2>
      <div className={cx('setting-header')}>
        <div className={cx('setting-header__img')}>
          <Image src="/images/calm.png" alt="calm" width={80} height={80} className={cx('setting-header__img--image')} />
        </div>
        <div className={cx('setting-header__info')}>
          <h2 className={cx('setting-header__info-name')}>사용자 이름</h2>
          <div className={cx('setting-header__info-email-container')}>
            <p className={cx('setting-header__info-email')}>사용자 이메일</p>
            <ChevronRight size={24} />
          </div>
          <p className={cx('setting-header__info-days')}>42일째 기록중</p>
        </div>
      </div>
      <div className={cx('setting-contents')}>
        <div className={cx('setting-contents__item')}>
          <h2 className={cx('setting-contents__item-title')}>기록</h2>
          <div className={cx('setting-contents__item-contents')}>
            <Bell size={24} />
            <p className={cx('setting-contents__item-description')}>기록 알림</p>
          </div>
          <div className={cx('line')}></div>
          <div className={cx('setting-contents__item-contents')}>
            <Clock4 size={24} />
            <p className={cx('setting-contents__item-description')}>알림 시간</p>
          </div>
        </div>
        <div className={cx('setting-contents__item')}>
          <h2 className={cx('setting-contents__item-title')}>지원</h2>
          <div className={cx('setting-contents__item-contents')}>
            <CircleQuestionMark size={24} />
            <p className={cx('setting-contents__item-description')}>도움말</p>
          </div>
          <div className={cx('line')}></div>
          <div className={cx('setting-contents__item-contents')}>
            <MessageSquare size={24} />
            <p className={cx('setting-contents__item-description')}>의견 보내기</p>
          </div>
        </div>
        <div className={cx('setting-contents__item')}>
          <h2 className={cx('setting-contents__item-title')}>계정</h2>
          <div className={cx('setting-contents__item-contents')}>
            <LogOut size={24} />
            <p className={cx('setting-contents__item-description')}>로그아웃</p>
          </div>
          <div className={cx('line')}></div>
          <div className={cx('setting-contents__item-contents')}>
            <Trash2 size={24} />
            <p className={cx('setting-contents__item-description')}>계정 삭제</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPresenterModule;
