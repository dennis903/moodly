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
        <div className={cx('setting-header__info')}>
          <div className={cx('setting-header__img')}>
            <Image src="/images/calm.png" alt="calm" width={80} height={80} className={cx('setting-header__img--image')} />
          </div>
          <div className={cx('setting-header__info-user-container')}>
            <h2 className={cx('setting-header__info-name')}>사용자 이름</h2>
            <div className={cx('setting-header__info-email-container')}>
              <p className={cx('setting-header__info-email')}>사용자 이메일</p>
              <button type="button" className={cx('setting-header__info-email-button')}>
                <ChevronRight size={16} />
              </button>
            </div>
            <p className={cx('setting-header__info-days')}>42일째 기록중</p>
          </div>
        </div>
      </div>
      <div className={cx('setting-contents')}>
        <div className={cx('setting-contents__item')}>
          <h2 className={cx('setting-contents__item__label')}>기록</h2>
          <div className={cx('setting-contents__item-contents')}>
            <div className={cx('setting-contents__item-content')}>
              <div className={cx('setting-contents__item-content-icon')}>
                <Bell size={20} />
                <p className={cx('setting-contents__item-title')}>기록 알림</p>
              </div>
              <p className={cx('setting-contents__item-description')}>매일 오후 9:00</p>
            </div>
            <div className={cx('line')}></div>
            <div className={cx('setting-contents__item-content')}>
              <div className={cx('setting-contents__item-content-icon')}>
                <Clock4 size={20} />
                <p className={cx('setting-contents__item-title')}>알림 시간</p>
              </div>
              <div className={cx('setting-contents__item-description-container')}>
                <p className={cx('setting-contents__item-description')}>오후 9:00</p>
                <button type="button" className={cx('setting-contents__item-button')}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('setting-contents__item')}>
          <h2 className={cx('setting-contents__item__label')}>지원</h2>
          <div className={cx('setting-contents__item-contents')}>
            <div className={cx('setting-contents__item-content')}>
              <div className={cx('setting-contents__item-content-icon')}>
                <CircleQuestionMark size={20} />
                <p className={cx('setting-contents__item-title')}>도움말</p>
              </div>
              <button type="button" className={cx('setting-contents__item-button')}>
                <ChevronRight size={16} />
              </button>
            </div>
            <div className={cx('line')}></div>
            <div className={cx('setting-contents__item-content')}>
              <div className={cx('setting-contents__item-content-icon')}>
                <MessageSquare size={20} />
                <p className={cx('setting-contents__item-title')}>의견 보내기</p>
              </div>
              <button type="button" className={cx('setting-contents__item-button')}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className={cx('setting-contents__item')}>
          <h2 className={cx('setting-contents__item__label')}>계정</h2>
          <div className={cx('setting-contents__item-contents')}>
            <div className={cx('setting-contents__item-content')}>
              <div className={cx('setting-contents__item-content-icon')}>
                <LogOut size={20} />
                <p className={cx('setting-contents__item-title')}>로그아웃</p>
              </div>
              <button type="button" className={cx('setting-contents__item-button')}>
                <ChevronRight size={16} />
              </button>
            </div>
            <div className={cx('line')}></div>
            <div className={cx('setting-contents__item-content')}>
              <div className={cx('setting-contents__item-content-icon')}>
                <Trash2 size={20} />
                <p className={cx('setting-contents__item-title')}>계정 삭제</p>
              </div>
              <button type="button" className={cx('setting-contents__item-button')}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPresenterModule;
