'use client';

import {useState} from 'react';

interface IUseTodayReturn {
  selectedEmotion: string | null;
  onClickEmotionSelect: (emotion: string) => void;
}

export const useToday = (): IUseTodayReturn => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const onClickEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
  };
  return {
    selectedEmotion,
    onClickEmotionSelect
  };
};
