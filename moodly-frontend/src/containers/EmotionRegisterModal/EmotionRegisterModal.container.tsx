'use client';

import {useAddTagModal} from './hook/useAddTagModal';
import {useEmotionRegisterModal} from './hook/useEmotionRegisterModal';
import AddTagModalPresenterModule from './presenter/module/AddTagModal.presenter.module';
import EmotionRegisterModalPresenterModule from './presenter/module/EmotionRegisterModal.presenter.module';
import {type FC} from 'react';

const EmotionRegisterModalContainer: FC = () => {
  const {text, onClickTimeButton, onChangeInput} = useEmotionRegisterModal();
  const {onChangeInput: onChangeAddTagInput, tagInput} = useAddTagModal();

  const vProps = {
    text,
    tagInput,
    onClickTimeButton,
    onChangeInput,
    onChangeAddTagInput
  };

  return (
    <>
      <EmotionRegisterModalPresenterModule {...vProps} />
      <AddTagModalPresenterModule {...vProps} />
    </>
  );
};

export default EmotionRegisterModalContainer;
