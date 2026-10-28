'use client';

import {useAddTagModal} from './hook/useAddTagModal';
import {useEmotionEditModal} from './hook/useEmotionEditModal';
import {useEmotionRegisterModal} from './hook/useEmotionRegisterModal';
import AddTagModalPresenterModule from './presenter/module/AddTagModal.presenter.module';
import EmotionEditPresenterModule from './presenter/module/EmotionEditModal.presenter.module';
import EmotionRegisterModalPresenterModule from './presenter/module/EmotionRegisterModal.presenter.module';
import {type FC} from 'react';

interface IEmotionRegisterModalContainerProps {
  type: 'CREATE' | 'EDIT';
  id?: string;
  selectedDate?: string;
}

const EmotionRegisterModalContainer: FC<IEmotionRegisterModalContainerProps> = (props) => {
  const {text, onClickTimeButton, onChangeInput, onSubmitEmotionRegister} = useEmotionRegisterModal({type: props.type, id: props.id, selectedDate: props.selectedDate});
  const {onChangeInput: onChangeAddTagInput, tagInput, onClickAddTag, onClickRecommendedTag} = useAddTagModal();
  const {onClickEmotionSelect} = useEmotionEditModal();

  const vProps = {
    text,
    tagInput,
    onClickTimeButton,
    onChangeInput,
    onSubmitEmotionRegister,
    onChangeAddTagInput,
    onClickAddTag,
    onClickRecommendedTag,
    onClickEmotionSelect
  };

  return (
    <>
      <EmotionRegisterModalPresenterModule {...vProps} />
      <AddTagModalPresenterModule {...vProps} />
      <EmotionEditPresenterModule {...vProps} />
    </>
  );
};

export default EmotionRegisterModalContainer;
