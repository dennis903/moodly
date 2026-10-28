'use client';

import {useDetailEditModalToggleDispatch} from '@/containers/DetailEditModal/store/detailEditModal.store';
import {useDeleteEmotionRegister} from '@/containers/EmotionRegisterModal/api/emotionRegisterModal.api';
import {
  useEmotionRegisterModalDispatch,
  useEmotionRegisterModalSetDateDispatch,
  useEmotionRegisterModalSetEmotionDispatch,
  useEmotionRegisterModalSetMemoDispatch,
  useEmotionRegisterModalSetTagsDispatch
} from '@/containers/EmotionRegisterModal/store/emotionRegisterModal.store';

interface IUseDetailEditModalProps {
  id: string;
  date: string | undefined;
  emotion: string | undefined;
  memo: string | undefined;
  tags:
    | {
        id: string;
        name: string;
        userId: string;
      }[]
    | undefined;
}

interface IUseDetailEditModalReturn {
  onClickClose: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export const useDetailEditModal = ({date, emotion, memo, tags, id}: IUseDetailEditModalProps): IUseDetailEditModalReturn => {
  const dispatch$ = {
    acToggleModal: useDetailEditModalToggleDispatch(),
    acEditModal: useEmotionRegisterModalDispatch(),
    acSetEmotion: useEmotionRegisterModalSetEmotionDispatch(),
    acSetDate: useEmotionRegisterModalSetDateDispatch(),
    acSetMemo: useEmotionRegisterModalSetMemoDispatch(),
    acSetTags: useEmotionRegisterModalSetTagsDispatch()
  };

  const {mutate} = useDeleteEmotionRegister(id ?? '');

  const onClickClose = () => {
    dispatch$.acToggleModal({isOpen: false});
  };

  const onClickEdit = () => {
    dispatch$.acToggleModal({isOpen: false});
    dispatch$.acEditModal({isOpen: true});
    dispatch$.acSetEmotion({emotion: emotion ?? ''});
    dispatch$.acSetDate({date: date ?? ''});
    dispatch$.acSetMemo({memo: memo ?? ''});
    dispatch$.acSetTags({tags: tags?.map((tag) => tag.name) ?? []});
  };

  const onClickDelete = () => {
    mutate(id ?? '');
  };

  return {
    onClickClose,
    onClickEdit,
    onClickDelete
  };
};
