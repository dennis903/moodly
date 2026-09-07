'use client';

import EmotionPresenterMicro from '../micro/Emotion.presenter.micro';
import styles from './Today.module.css';
import {EMOTION_VALUES} from '@/constants/emotion.constant';
import classNames from 'classnames/bind';
import {House, Settings} from 'lucide-react';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface ITodayPresenterModuleProps {
  onClickEmotionSelect: (emotion: string) => void;
  selectedEmotion: string | null;
}

const TodayPresenterModule: FC<ITodayPresenterModuleProps> = (props) => {
  return (
    <div className={cx('today')}>
      <div className={cx('today__header')}>
        <button className={cx('today__button')}>
          <House size={24} />
        </button>
        <button className={cx('today__button')}>
          <Settings size={24} />
        </button>
      </div>
      <h1 className={cx('title')}>오늘의 감정을 골라보세요</h1>
      <div className={cx('emotions')}>
        {EMOTION_VALUES.map((emotion) => (
          <EmotionPresenterMicro
            key={emotion.value}
            label={emotion.label}
            imageSrc={`/images/${emotion.value.toLowerCase()}.png`}
            onClick={() => props.onClickEmotionSelect(emotion.value)}
            isSelected={props.selectedEmotion === emotion.value}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayPresenterModule;
