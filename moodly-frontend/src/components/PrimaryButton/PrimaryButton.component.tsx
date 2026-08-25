'use client';

import styles from './PrimaryButton.module.css';
import classNames from 'classnames/bind';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface PrimaryButtonComponentProps {
  type: 'button' | 'submit' | 'reset';
  text: string;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButtonComponent: FC<PrimaryButtonComponentProps> = (props) => {
  return (
    <button type={props.type} className={cx('primary-button', {'primary-button--disabled': props.isDisabled})} disabled={props.isDisabled} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default PrimaryButtonComponent;
