'use client';

import {useEmotionEditModalToggleDispatch} from '../store/emotionEditModal.store';
import {useEmotionRegisterModalSetEmotionDispatch} from '../store/emotionRegisterModal.store';

interface IUseEmotionEditModalReturn {
  onClickEmotionSelect: (emotion: string) => void;
}

export const useEmotionEditModal = (): IUseEmotionEditModalReturn => {
  const dispatch$ = {
    acSetEmotion: useEmotionRegisterModalSetEmotionDispatch(),
    acToggleModal: useEmotionEditModalToggleDispatch()
  };

  const onClickEmotionSelect = (emotion: string) => {
    dispatch$.acSetEmotion({emotion});
    dispatch$.acToggleModal({isOpen: false});
  };

  return {
    onClickEmotionSelect
  };
};
