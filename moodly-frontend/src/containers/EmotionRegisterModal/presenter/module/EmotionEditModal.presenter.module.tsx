'use client';

import {useEmotionEditModalState} from '../../store/emotionEditModal.store';
import styles from './EmotionEditModal.module.css';
import {EmotionButton, Modal} from '@/components';
import {EMOTION_VALUES} from '@/constants/emotion.constant';
import classNames from 'classnames/bind';
import {House, Settings} from 'lucide-react';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface IEmotionEditPresenterModuleProps {
  onClickEmotionSelect: (emotion: string) => void;
}

const EmotionEditPresenterModule: FC<IEmotionEditPresenterModuleProps> = (props) => {
  const state$ = {
    modal: useEmotionEditModalState()
  };

  return (
    <Modal isOpen={state$.modal.isOpen} type="full">
      <div className={cx('emotion-edit')}>
        <div className={cx('emotion-edit__header')}>
          <button className={cx('emotion-edit__button')}>
            <House size={24} />
          </button>
          <button className={cx('emotion-edit__button')}>
            <Settings size={24} />
          </button>
        </div>
        <h1 className={cx('title')}>감정을 골라보세요</h1>
        <div className={cx('emotions')}>
          {EMOTION_VALUES.map((emotion) => (
            <EmotionButton key={emotion.value} label={emotion.label} imageSrc={`/images/${emotion.value.toLowerCase()}.png`} onClick={() => props.onClickEmotionSelect(emotion.value)} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default EmotionEditPresenterModule;
