'use client';

import {MAX_TAG_COUNT} from '../../hook/useAddTagModal';
import {useAddTagModalRemoveDispatch, useAddTagModalState, useAddTagModalToggleDispatch} from '../../store/addTagModal.store';
import {useEmotionRegisterModalRemoveTagDispatch, useEmotionRegisterModalState} from '../../store/emotionRegisterModal.store';
import styles from './AddTagModal.module.css';
import {Modal} from '@/components';
import {InputField} from '@/components';
import classNames from 'classnames/bind';
import {X} from 'lucide-react';
import {type FC} from 'react';

const cx = classNames.bind(styles);

const RECOMMENDED_TAG_LIST = ['가족', '친구', '운동', '여행', '음식', '수면'];

interface IAddTagModalPresenterModuleProps {
  tagInput: string;
  onChangeAddTagInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAddTag: () => void;
  onClickRecommendedTag: (tag: string) => void;
}

const AddTagModalPresenterModule: FC<IAddTagModalPresenterModuleProps> = (props) => {
  const state$ = {
    modal: useAddTagModalState(),
    emotionModal: useEmotionRegisterModalState()
  };

  const dispatch$ = {
    toggle: useAddTagModalToggleDispatch(),
    remove: useEmotionRegisterModalRemoveTagDispatch()
  };

  return (
    <Modal isOpen={state$.modal.isOpen} type="bottomSheet">
      <div className={cx('add-tag-modal')}>
        <div className={cx('line')}></div>
        <div className={cx('add-tag-modal__header')}>
          <h2 className={cx('title')}>태그 추가</h2>
          <button type="button" className={cx('add-tag-modal__close-button')} onClick={() => dispatch$.toggle({isOpen: false})}>
            <X />
          </button>
        </div>
        <div className={cx('add-tag-modal__content')}>
          <InputField type="text" placeholder="태그를 입력하세요" value={props.tagInput} onChange={props.onChangeAddTagInput} classNames={['mb-none__field', 'pl-36__input']} />
          <p className={cx('hashtag')}>#</p>
          <button
            type="button"
            className={cx('add-tag-modal__add-button', {
              'add-tag-modal__add-button--active': (props.tagInput.length > 0 && state$.modal.tagList.length < MAX_TAG_COUNT && /^[ㄱ-ㅎ가-힣]{1,5}$/.test(props.tagInput)) || /^[a-zA-Z]{1,10}$/.test(props.tagInput)
            })}
            onClick={props.onClickAddTag}
          >
            추가
          </button>
        </div>
        <div className={cx('add-tag-modal__tag-list')}>
          <ul className={cx('add-tag-modal__selected-tag-list')}>
            {state$.emotionModal.tags.map((tag, index) => (
              <li key={index} className={cx('add-tag-modal__selected-tag-item')}>
                <p className={cx('add-tag-modal__selected-tag')}>#{tag}</p>
                <button type="button" className={cx('add-tag-modal__selected-tag-delete-button')} onClick={() => dispatch$.remove({tag})}>
                  <X size={13} />
                </button>
              </li>
            ))}
          </ul>
          <h2 className={cx('add-tag-modal__tag-list-title')}>추천 태그</h2>
          <div className={cx('add-tag-modal__tag-list-content')}>
            {RECOMMENDED_TAG_LIST.map((tag) => (
              <button key={tag} type="button" className={cx('add-tag-modal__tag')} onClick={() => props.onClickRecommendedTag(tag)}>
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddTagModalPresenterModule;
