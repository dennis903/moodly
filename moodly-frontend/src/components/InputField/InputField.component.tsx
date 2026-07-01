'use client';

import styles from './InputField.module.css';
import classNames from 'classnames/bind';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface InputFieldComponentProps {
  legend: string;
  messages: {
    message: string;
    isError: boolean;
  }[];
  type: 'text' | 'email' | 'password';
  placeholder: string;
  isError: boolean;
  isFocused: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputFieldComponent: FC<InputFieldComponentProps> = (props) => {
  return (
    <fieldset className={cx('input-field')}>
      <legend className={cx('input-field__legend')}>{props.legend}</legend>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={cx('input-field__input', {
          'input-field__input--focused': props.isFocused,
          'input-field__input--error': props.isError,
          'input-field__input--success': !props.isError && props.messages.some((msg) => !msg.isError && msg.message !== '')
        })}
        onChange={props.onChange}
        onFocus={props.onFocus}
      />
      <ul className={cx('input-field__messages')}>
        {props.messages.map((msg, index) => (
          <li
            key={index}
            className={cx('input-field__message', {
              'input-field__message--error': msg.isError,
              'input-field__message--success': !msg.isError
            })}
          >
            {msg.message}
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default InputFieldComponent;
