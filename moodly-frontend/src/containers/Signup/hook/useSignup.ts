'use client';

import {usePostSignup} from '../api/signup.api';
import {useState} from 'react';

interface IUseSignupReturn {
  onSubmitSignup: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordConfirmMsg: {
    message: string;
    isError: boolean;
  };
  passwordMsg: string[];
  password: string;
}

export const useSignup = (): IUseSignupReturn => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState({
    message: '',
    isError: false
  });
  const [passwordMsg, setPasswordMsg] = useState<string[]>([]);

  const action$ = {
    postSignup: usePostSignup()
  };

  const onSubmitSignup = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setPasswordConfirmMsg({message: '비밀번호가 다릅니다.', isError: true});
      return;
    }

    setPasswordConfirmMsg({message: '비밀번호가 같습니다.', isError: false});
    action$.postSignup.mutate({email, password, name});
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorMsgs = [];
    if (/\s/.test(e.target.value)) {
      console.log('비밀번호에 공백이 포함되어 있습니다.');
      return;
    }
    setPassword(e.target.value);

    e.target.value.length < 8 && errorMsgs.push('비밀번호는 8자 이상이어야 합니다.');
    !/^(?=.*[A-Z]).+$/.test(e.target.value) && errorMsgs.push('비밀번호에는 대문자가 포함되어야 합니다.');
    !/^(?=.*[!@#$%^&*]).+$/.test(e.target.value) && errorMsgs.push('비밀번호에는 특수문자가 포함되어야 합니다.');

    setPasswordMsg(errorMsgs);
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return {
    password,
    onSubmitSignup,
    onChangeEmail,
    onChangePassword,
    onChangePasswordConfirm,
    onChangeName,
    passwordConfirmMsg,
    passwordMsg
  };
};
