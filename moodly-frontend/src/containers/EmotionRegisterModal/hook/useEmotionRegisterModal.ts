'use client';

import {useEmotionRegisterModalDispatch, useEmotionRegisterModalState} from '../store/emotionRegisterModal.store';
import {formatHoursAndMinutes} from '@/utils';
import {useState} from 'react';

interface IUseEmotionRegisterModalReturn {
  text: string;
  onClickTimeButton: () => void;
  onChangeInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const useEmotionRegisterModal = (): IUseEmotionRegisterModalReturn => {
  const [text, setText] = useState<string>('');

  const onClickTimeButton = () => {
    const currentTime = formatHoursAndMinutes(new Date());

    setText(text.trim() + (text.trim().length > 0 ? `\n${currentTime}` : currentTime));
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return {
    text,
    onClickTimeButton,
    onChangeInput
  };
};
