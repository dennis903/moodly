'use client';

import styles from './EmotionButton.module.css';
import classNames from 'classnames/bind';
import Image from 'next/image';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface IEmotionButtonComponentProps {
  label: string;
  imageSrc: string;
  onClick: () => void;
  isSelected?: boolean;
}

const EmotionButtonComponent: FC<IEmotionButtonComponentProps> = (props) => {
  return (
    <button type="button" className={cx('emotion', {selected: props.isSelected})} onClick={props.onClick}>
      <Image src={props.imageSrc} alt={props.label} width={80} height={80} />
      <span className={cx('label')}>{props.label}</span>
    </button>
  );
};

export default EmotionButtonComponent;
