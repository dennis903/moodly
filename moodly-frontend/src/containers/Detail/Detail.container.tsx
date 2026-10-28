'use client';

import {useDetail} from './hook/useDetail';
import DetailPresenterModule from './presenter/module/Detail.presenter.module';
import DetailEditModalContainer from '@/containers/DetailEditModal/DetailEditModal.container';
import EmotionRegisterModalContainer from '@/containers/EmotionRegisterModal/EmotionRegisterModal.container';
import {type FC} from 'react';

interface IDetailContainerProps {
  id: string;
}

const DetailContainer: FC<IDetailContainerProps> = (props) => {
  const {date, emotion, memo, tags, updatedAt, onClickEdit} = useDetail(props.id);

  const vProps = {
    id: props.id,
    date,
    emotion,
    memo,
    tags,
    updatedAt,
    onClickEdit
  };

  return (
    <div>
      <DetailPresenterModule {...vProps} />
      <DetailEditModalContainer {...vProps} />
      <EmotionRegisterModalContainer type="EDIT" id={props.id} />
    </div>
  );
};

export default DetailContainer;
