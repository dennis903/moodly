'use client';

import {useAddTagModalDispatch, useAddTagModalState} from '../../store/addTagModal.store';
import styles from './AddTagModal.module.css';
import {Modal} from '@/components';
import classNames from 'classnames/bind';
import {X} from 'lucide-react';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface IAddTagModalPresenterModuleProps {
  tagInput: string;
  onChangeAddTagInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddTagModalPresenterModule: FC<IAddTagModalPresenterModuleProps> = (props) => {
  const state$ = {
    modal: useAddTagModalState()
  };

  const dispatch$ = {
    modal: useAddTagModalDispatch()
  };

  return (
    <Modal isOpen={state$.modal.isOpen} type="bottomSheet">
      <div className={cx('add-tag-modal')}>
        <div className={cx('line')}></div>
        <div className={cx('add-tag-modal__header')}>
          <h2 className={cx('title')}>태그 추가</h2>
          <button type="button" className={cx('add-tag-modal__close-button')} onClick={() => dispatch$.modal.acToggleModal({isOpen: false})}>
            <X />
          </button>
        </div>
        <div className={cx('add-tag-modal__content')}>
          <input type="text" placeholder="태그를 입력하세요" value={props.tagInput} onChange={props.onChangeAddTagInput} className={cx('add-tag-modal__input')} />
          <p className={cx('hashtag')}>#</p>
          <button type="button" className={cx('add-tag-modal__add-button')} onClick={() => dispatch$.modal.acAddTag({tag: props.tagInput})}>
            추가
          </button>
        </div>
        <div className={cx('add-tag-modal__tag-list')}>
          <ul className={cx('add-tag-modal__selected-tag-list')}>
            {state$.modal.tagList.map((tag, index) => (
              <li key={index} className={cx('add-tag-modal__selected-tag-item')}>
                <p className={cx('add-tag-modal__selected-tag')}>#{tag}</p>
                <button type="button" className={cx('add-tag-modal__selected-tag-delete-button')} onClick={() => dispatch$.modal.acRemoveTag({tag})}>
                  <X />
                </button>
              </li>
            ))}
          </ul>
          <h2 className={cx('add-tag-modal__tag-list-title')}>추천 태그</h2>
          <div className={cx('add-tag-modal__tag-list-content')}>
            <button type="button" className={cx('add-tag-modal__tag')}>
              #가족
            </button>
            <button type="button" className={cx('add-tag-modal__tag')}>
              #친구
            </button>
            <button type="button" className={cx('add-tag-modal__tag')}>
              #운동
            </button>
            <button type="button" className={cx('add-tag-modal__tag')}>
              #여행
            </button>
            <button type="button" className={cx('add-tag-modal__tag')}>
              #음식
            </button>
            <button type="button" className={cx('add-tag-modal__tag')}>
              #수면
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddTagModalPresenterModule;
