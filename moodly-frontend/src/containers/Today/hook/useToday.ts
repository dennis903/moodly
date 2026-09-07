'use client';

import {useEmotionRegisterModalDispatch, useEmotionRegisterModalSetEmotionDispatch} from '@/containers/EmotionRegisterModal/store/emotionRegisterModal.store';
import {useState} from 'react';

interface IUseTodayReturn {
  selectedEmotion: string | null;
  onClickEmotionSelect: (emotion: string) => void;
}

export const useToday = (): IUseTodayReturn => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const dispatch$ = {
    acToggleModal: useEmotionRegisterModalDispatch(),
    acSetEmotion: useEmotionRegisterModalSetEmotionDispatch()
  };

  const onClickEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    dispatch$.acToggleModal({isOpen: true});
    dispatch$.acSetEmotion({emotion});
  };
  return {
    selectedEmotion,
    onClickEmotionSelect
  };
};
