'use client';

import {useToday} from './hook/useToday';
import TodayPresenterModule from './presenter/module/Today.presenter.module';
import EmotionRegisterModalContainer from '@/containers/EmotionRegisterModal/EmotionRegisterModal.container';
import {useSearchParams} from 'next/navigation';
import {type FC} from 'react';

const TodayContainer: FC = () => {
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get('date') ?? undefined;
  const {onClickEmotionSelect, selectedEmotion} = useToday(selectedDate);

  const vProps = {
    onClickEmotionSelect,
    selectedEmotion
  };
  return (
    <div>
      <TodayPresenterModule {...vProps} />
      <EmotionRegisterModalContainer type="CREATE" />
    </div>
  );
};

export default TodayContainer;
