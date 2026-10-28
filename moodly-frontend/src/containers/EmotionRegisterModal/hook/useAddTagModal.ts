'use client';

import {useAddTagModalState} from '../store/addTagModal.store';
import {useEmotionRegisterModalAddTagDispatch} from '../store/emotionRegisterModal.store';
import {useState} from 'react';

export const MAX_TAG_COUNT = 3;

interface IUseAddTagModalReturn {
  tagInput: string;
  onClickAddTag: () => void;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickRecommendedTag: (tag: string) => void;
}

export const useAddTagModal = (): IUseAddTagModalReturn => {
  const [tagInput, setTagInput] = useState<string>('');

  const state$ = {
    modal: useAddTagModalState()
  };

  const dispatch$ = {
    add: useEmotionRegisterModalAddTagDispatch()
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const onClickAddTag = () => {
    if (!tagInput.trim() || state$.modal.tagList.length < MAX_TAG_COUNT + 1) return;
    if (/^[ㄱ-ㅎ가-힣]{1,5}$/.test(tagInput) || /^[a-zA-Z]{1,10}$/.test(tagInput)) return;

    dispatch$.add({tag: tagInput});
    setTagInput('');
  };

  const onClickRecommendedTag = (tag: string) => {
    if (state$.modal.tagList.length >= MAX_TAG_COUNT) return;
    dispatch$.add({tag});
  };

  return {
    tagInput,
    onClickAddTag,
    onChangeInput,
    onClickRecommendedTag
  };
};
