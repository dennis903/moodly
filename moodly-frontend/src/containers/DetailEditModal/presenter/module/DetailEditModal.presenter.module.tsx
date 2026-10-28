'use client';

import {useDetailEditModalState} from '../../store/detailEditModal.store';
import styles from './DetailEditModal.module.css';
import {Modal} from '@/components';
import classNames from 'classnames/bind';
import {Pencil, Trash, X} from 'lucide-react';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface IDetailEditModalPresenterModuleProps {
  onClickClose: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const DetailEditModalPresenterModule: FC<IDetailEditModalPresenterModuleProps> = (props) => {
  const state$ = {
    modal: useDetailEditModalState()
  };

  return (
    <Modal isOpen={state$.modal.isOpen} type="bottomSheet">
      <div className={cx('detail-edit-modal')}>
        <div className={cx('line')}></div>
        <div className={cx('detail-edit-modal__header')}>
          <h2 className={cx('detail-edit-modal__header-title')}>더보기</h2>
          <button type="button" className={cx('detail-edit-modal__header-close-button')} onClick={props.onClickClose}>
            <X size={24} />
          </button>
        </div>
        <div className={cx('detail-edit-modal__content')}>
          <button type="button" className={cx('detail-edit-modal__button')} onClick={props.onClickEdit}>
            <span className={cx('detail-edit-modal__button--edit')}>
              <Pencil size={24} />
            </span>
            <span className={cx('detail-edit-modal__button-container')}>
              <span className={cx('detail-edit-modal__button-text--edit')}>수정하기</span>
              <span className={cx('detail-edit-modal__button-subtext')}>오늘의 마음을 다시 적어요.</span>
            </span>
          </button>
          <button type="button" className={cx('detail-edit-modal__button')} onClick={props.onClickDelete}>
            <span className={cx('detail-edit-modal__button--delete')}>
              <Trash size={24} />
            </span>
            <span className={cx('detail-edit-modal__button-container')}>
              <span className={cx('detail-edit-modal__button-text--delete')}>삭제하기</span>
              <span className={cx('detail-edit-modal__button-subtext')}>삭제하면 되돌릴 수 없어요.</span>
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DetailEditModalPresenterModule;
