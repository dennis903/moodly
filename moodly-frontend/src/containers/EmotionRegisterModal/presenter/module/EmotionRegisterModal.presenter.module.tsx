import styles from './EmotionRegisterModal.module.css';
import {Modal} from '@/components';
import classNames from 'classnames/bind';
import {Check, CircleQuestionMark, Clock4, Image as ImageIcon, X} from 'lucide-react';
import Image from 'next/image';
import {type FC} from 'react';

const cx = classNames.bind(styles);

const EmotionRegisterModalPresenterModule: FC = () => {
  return (
    <Modal type="full">
      <div className={cx('emotion-register-modal')}>
        <div className={cx('emotion-register-modal__header')}>
          <button type="button" className={cx('emotion-register-modal__button')}>
            <X />
          </button>
          <button type="button" className={cx('emotion-register-modal__button')}>
            <CircleQuestionMark />
          </button>
        </div>
        <div className={cx('emotion-register-modal__info')}>
          <Image src="/images/angry.png" alt="angry" width={120} height={120} />
          <p className={cx('emotion-register-modal__date')}>2026년 8월 25일</p>
          <p className={cx('emotion-register-modal__day')}>화요일</p>
        </div>
        <div className={cx('emotion-register-modal__text')}>
          <textarea className={cx('emotion-register-modal__textarea')} placeholder="오늘의 감정을 기록해보세요." />
        </div>
        <div className={cx('emotion-register-modal__button-tag')}>
          <button type="button" className={cx('emotion-register-modal__tag-button')}>
            #감정태그
          </button>
          <button type="button" className={cx('emotion-register-modal__tag-button')}>
            #감정태그
          </button>
          <button type="button" className={cx('emotion-register-modal__tag-button')}>
            +태그
          </button>
        </div>
        <div className={cx('emotion-register-modal__button-container')}>
          <div className={cx('emotion-register-modal__button-wrapper')}>
            <button type="button" className={cx('emotion-register-modal__button')}>
              <ImageIcon />
            </button>
            <button type="button" className={cx('emotion-register-modal__button')}>
              <Clock4 />
            </button>
          </div>
          <button type="button" className={cx('emotion-register-modal__submit-button')}>
            <Check />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmotionRegisterModalPresenterModule;
