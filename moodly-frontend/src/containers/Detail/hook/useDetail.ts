'use client';

import {useGetDetailById} from '../api/detail.api';
import {useDetailEditModalToggleDispatch} from '@/containers/DetailEditModal/store/detailEditModal.store';

interface IUseDetailReturn {
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
  updatedAt: string | undefined;
  isSuccess: boolean;
  onClickEdit: () => void;
}

export const useDetail = (id: string): IUseDetailReturn => {
  const {data, isSuccess} = useGetDetailById(id);

  const dispatch$ = {
    acToggleModal: useDetailEditModalToggleDispatch()
  };

  const onClickEdit = () => {
    dispatch$.acToggleModal({isOpen: true});
  };

  return {
    date: data?.date,
    emotion: data?.emotion,
    memo: data?.memo,
    tags: data?.tags,
    updatedAt: data?.updatedAt,
    isSuccess,
    onClickEdit
  };
};
