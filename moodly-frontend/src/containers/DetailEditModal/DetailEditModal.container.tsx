'use client';

import {useDetailEditModal} from './hook/useDetailEditModal';
import DetailEditModalPresenterModule from './presenter/module/DetailEditModal.presenter.module';
import {type FC} from 'react';

interface IDetailEditModalContainerProps {
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

const DetailEditModalContainer: FC<IDetailEditModalContainerProps> = (props) => {
  const {onClickClose, onClickEdit, onClickDelete} = useDetailEditModal({
    id: props.id,
    date: props.date,
    emotion: props.emotion,
    memo: props.memo,
    tags: props.tags
  });

  const vProps = {
    onClickClose,
    onClickEdit,
    onClickDelete
  };

  return <DetailEditModalPresenterModule {...vProps} />;
};

export default DetailEditModalContainer;
