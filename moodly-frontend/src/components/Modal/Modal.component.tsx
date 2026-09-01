'use client';

import styles from './Modal.module.css';
import classNames from 'classnames/bind';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface IModalComponentProps {
  children: React.ReactNode;
  type: 'full' | 'bottomSheet';
}

const ModalComponent: FC<IModalComponentProps> = (props) => {
  return <div className={cx('modal', {'bottom-sheet': props.type === 'bottomSheet', full: props.type === 'full'})}>{props.children}</div>;
};

export default ModalComponent;
