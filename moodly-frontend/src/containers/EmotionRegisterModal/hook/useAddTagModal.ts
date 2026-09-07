'use client';

import {useState} from 'react';

interface IUseAddTagModalReturn {
  tagInput: string;
  onClickAddTag: () => void;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useAddTagModal = (): IUseAddTagModalReturn => {
  const [tagInput, setTagInput] = useState<string>('');

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const onClickAddTag = () => {
    // 태그 추가 로직 구현
  };

  return {
    tagInput,
    onClickAddTag,
    onChangeInput
  };
};
