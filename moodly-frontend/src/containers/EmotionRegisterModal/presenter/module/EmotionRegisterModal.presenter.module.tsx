'use client';

import {useAddTagModalToggleDispatch} from '../../store/addTagModal.store';
import {useEmotionRegisterModalDispatch, useEmotionRegisterModalState} from '../../store/emotionRegisterModal.store';
import styles from './EmotionRegisterModal.module.css';
import {Modal} from '@/components';
import {formatDateToKorean, formatDateToKoreanDay} from '@/utils';
import classNames from 'classnames/bind';
import {Check, CircleQuestionMark, Clock4, Image as ImageIcon, X} from 'lucide-react';
import Image from 'next/image';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface IEmotionRegisterModalPresenterModuleProps {
  text: string;
  onClickTimeButton: () => void;
  onChangeInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EmotionRegisterModalPresenterModule: FC<IEmotionRegisterModalPresenterModuleProps> = (props) => {
  const state$ = {
    modal: useEmotionRegisterModalState()
  };

  const dispatch$ = {
    modal: useEmotionRegisterModalDispatch(),
    addTagModal: useAddTagModalToggleDispatch()
  };

  return (
    <>
      <Modal isOpen={state$.modal.isOpen} type="full">
        <div className={cx('emotion-register-modal')}>
          <div className={cx('emotion-register-modal__header')}>
            <button type="button" className={cx('emotion-register-modal__button')} onClick={() => dispatch$.modal({isOpen: false})}>
              <X />
            </button>
            <button type="button" className={cx('emotion-register-modal__button')}>
              <CircleQuestionMark />
            </button>
          </div>
          <div className={cx('emotion-register-modal__info')}>
            <Image src={`/images/${state$.modal.emotion}.png`} alt={state$.modal.emotion} width={120} height={120} />
            <p className={cx('emotion-register-modal__date')}>{formatDateToKorean()}</p>
            <p className={cx('emotion-register-modal__day')}>{formatDateToKoreanDay()}</p>
          </div>
          <div className={cx('emotion-register-modal__text')}>
            <textarea className={cx('emotion-register-modal__textarea')} placeholder="오늘의 감정을 기록해보세요." value={props.text} onChange={props.onChangeInput} />
          </div>
          <div className={cx('emotion-register-modal__button-tag')}>
            <button type="button" className={cx('emotion-register-modal__tag')}>
              #감정태그
            </button>
            <button type="button" className={cx('emotion-register-modal__tag')}>
              #감정태그
            </button>
            <button type="button" className={cx('emotion-register-modal__tag-button')} onClick={() => dispatch$.addTagModal({isOpen: true})}>
              + 태그
            </button>
          </div>
          <div className={cx('emotion-register-modal__button-container')}>
            <div className={cx('emotion-register-modal__button-wrapper')}>
              <button type="button" className={cx('emotion-register-modal__button')}>
                <ImageIcon />
              </button>
              <button type="button" className={cx('emotion-register-modal__button')} onClick={props.onClickTimeButton}>
                <Clock4 />
              </button>
            </div>
            <button type="button" className={cx('emotion-register-modal__submit-button')}>
              <Check />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EmotionRegisterModalPresenterModule;
