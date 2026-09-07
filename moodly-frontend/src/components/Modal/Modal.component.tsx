'use client';

import styles from './Modal.module.css';
import classNames from 'classnames/bind';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface IModalComponentProps {
  isOpen: boolean;
  children: React.ReactNode;
  type: 'full' | 'bottomSheet';
}

const ModalComponent: FC<IModalComponentProps> = (props) => {
  if (!props.isOpen) return null;

  return (
    <div className={cx('modal', {'bottom-sheet': props.type === 'bottomSheet', full: props.type === 'full'})}>
      {props.type === 'full' && <div className={cx('full-modal-content')}>{props.children}</div>}
      {props.type === 'bottomSheet' && <div className={cx('bottom-sheet-content')}>{props.children}</div>}
    </div>
  );
};

export default ModalComponent;
