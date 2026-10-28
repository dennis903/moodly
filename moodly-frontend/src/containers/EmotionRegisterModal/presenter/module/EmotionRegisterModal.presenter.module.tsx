'use client';

import {useAddTagModalState, useAddTagModalToggleDispatch} from '../../store/addTagModal.store';
import {useEmotionEditModalToggleDispatch} from '../../store/emotionEditModal.store';
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
  onSubmitEmotionRegister: () => void;
}

const EmotionRegisterModalPresenterModule: FC<IEmotionRegisterModalPresenterModuleProps> = (props) => {
  const state$ = {
    modal: useEmotionRegisterModalState(),
    addTagModal: useAddTagModalState()
  };

  const dispatch$ = {
    modal: useEmotionRegisterModalDispatch(),
    addTagModal: useAddTagModalToggleDispatch(),
    emotionEditModal: useEmotionEditModalToggleDispatch()
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
            <button type="button" className={cx('emotion-register-modal__button')} onClick={() => dispatch$.emotionEditModal({isOpen: true})}>
              <Image src={`/images/${state$.modal.emotion}.png`} alt={state$.modal.emotion} width={120} height={120} />
            </button>
            <p className={cx('emotion-register-modal__date')}>{formatDateToKorean(state$.modal.date)}</p>
            <p className={cx('emotion-register-modal__day')}>{formatDateToKoreanDay(state$.modal.date)}</p>
          </div>
          <div className={cx('emotion-register-modal__text')}>
            <textarea className={cx('emotion-register-modal__textarea')} placeholder="오늘의 감정을 기록해보세요." value={props.text} onChange={props.onChangeInput} />
          </div>
          <div className={cx('emotion-register-modal__taglist')}>
            {state$.modal.tags.map((tag, index) => (
              <div key={index} className={cx('emotion-register-modal__tag')}>
                #{tag}
              </div>
            ))}
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
            <button type="button" className={cx('emotion-register-modal__submit-button')} onClick={props.onSubmitEmotionRegister}>
              <Check />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EmotionRegisterModalPresenterModule;
