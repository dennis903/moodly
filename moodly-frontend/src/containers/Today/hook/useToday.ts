'use client';

import {useEmotionRegisterModalDispatch, useEmotionRegisterModalSetDateDispatch, useEmotionRegisterModalSetEmotionDispatch} from '@/containers/EmotionRegisterModal/store/emotionRegisterModal.store';
import {format} from 'date-fns';
import {useState} from 'react';

interface IUseTodayReturn {
  selectedEmotion: string | null;
  onClickEmotionSelect: (emotion: string) => void;
}

export const useToday = (selectedDate?: string): IUseTodayReturn => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const dispatch$ = {
    acToggleModal: useEmotionRegisterModalDispatch(),
    acSetEmotion: useEmotionRegisterModalSetEmotionDispatch(),
    acSetDate: useEmotionRegisterModalSetDateDispatch()
  };

  const onClickEmotionSelect = (emotion: string) => {
    const date = selectedDate ?? format(new Date(), 'yyyy-MM-dd');
    setSelectedEmotion(emotion);
    dispatch$.acToggleModal({isOpen: true});
    dispatch$.acSetEmotion({emotion});
    dispatch$.acSetDate({date});
  };

  return {
    selectedEmotion,
    onClickEmotionSelect
  };
};
