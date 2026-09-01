'use client';

import {useToday} from './hook/useToday';
import TodayPresenterModule from './presenter/module/Today.presenter.module';
import EmotionRegisterModalContainer from '@/containers/EmotionRegisterModal/EmotionRegisterModal.container';
import {type FC} from 'react';

const TodayContainer: FC = () => {
  const {onClickEmotionSelect, selectedEmotion} = useToday();

  const vProps = {
    onClickEmotionSelect,
    selectedEmotion
  };
  return (
    <div>
      <TodayPresenterModule {...vProps} />
      <EmotionRegisterModalContainer />
    </div>
  );
};

export default TodayContainer;
