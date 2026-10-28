'use client';

import {usePatchEmotionRegister, usePostEmotionRegister} from '../api/emotionRegisterModal.api';
import {useEmotionRegisterModalState} from '../store/emotionRegisterModal.store';
import {formatHoursAndMinutes} from '@/utils';
import {useEffect, useState} from 'react';

interface IUseEmotionRegisterModalProps {
  type: 'CREATE' | 'EDIT';
  id?: string;
  selectedDate?: string;
}

interface IUseEmotionRegisterModalReturn {
  text: string;
  onClickTimeButton: () => void;
  onChangeInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmitEmotionRegister: () => void;
}

export const useEmotionRegisterModal = ({type, id, selectedDate}: IUseEmotionRegisterModalProps): IUseEmotionRegisterModalReturn => {
  const state$ = {
    modal: useEmotionRegisterModalState()
  };

  const [text, setText] = useState<string>('');

  const {mutate} = usePostEmotionRegister();
  const {mutate: patchMutate} = usePatchEmotionRegister();

  const onClickTimeButton = () => {
    const currentTime = formatHoursAndMinutes(new Date());

    setText(text.trim() + (text.trim().length > 0 ? `\n${currentTime}` : currentTime));
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const onSubmitEmotionRegister = () => {
    const date = type === 'CREATE' ? (selectedDate ?? state$.modal.date) : state$.modal.date;

    if (type === 'CREATE' && id === undefined) {
      mutate({memo: text, emotion: state$.modal.emotion, date, tags: state$.modal.tags});
    } else {
      if (id === undefined) {
        return;
      }

      patchMutate({id: id, memo: text, emotion: state$.modal.emotion, date, tags: state$.modal.tags});
    }
  };

  useEffect(() => {
    setText(state$.modal.memo || '');
  }, [state$.modal.memo]);

  return {
    text,
    onClickTimeButton,
    onChangeInput,
    onSubmitEmotionRegister
  };
};
