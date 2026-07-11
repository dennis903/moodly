'use client';

import {usePostSignup} from '../api/signup.api';
import {useState} from 'react';

interface IUseSignupReturn {
  onSubmitSignup: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusInputField: (field: keyof TFormValidation) => void;
  onBlurInputField: (field: keyof TFormValidation) => void;
  formValidation: TFormValidation;
}

export type TFormValidation = {
  email: {
    value: string;
    isFocused: boolean;
    isError: boolean;
    message: {
      isError: boolean;
      message: string;
    };
  };
  nickname: {
    value: string;
    isFocused: boolean;
    isError: boolean;
    message: {
      isError: boolean;
      message: string;
    };
  };
  password: {
    value: string;
    isFocused: boolean;
    isError: boolean;
    messages: {
      message: string;
      isError: boolean;
    }[];
  };
  passwordConfirm: {
    value: string;
    isFocused: boolean;
    isError: boolean;
    message: {
      isError: boolean;
      message: string;
    };
  };
};

export const useSignup = (): IUseSignupReturn => {
  const [formValidation, setFormValidation] = useState<TFormValidation>({
    email: {
      value: '',
      isFocused: false,
      isError: false,
      message: {
        isError: false,
        message: ''
      }
    },
    nickname: {
      value: '',
      isFocused: false,
      isError: false,
      message: {
        isError: false,
        message: ''
      }
    },
    password: {
      value: '',
      isFocused: false,
      isError: false,
      messages: []
    },
    passwordConfirm: {
      value: '',
      isFocused: false,
      isError: false,
      message: {
        isError: false,
        message: ''
      }
    }
  });

  const action$ = {
    postSignup: usePostSignup({setFormValidation})
  };

  const onSubmitSignup = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formValidation.password.value !== formValidation.passwordConfirm.value) {
      setFormValidation((prev) => ({
        ...prev,
        passwordConfirm: {
          ...prev.passwordConfirm,
          isError: true,
          message: {
            isError: true,
            message: '비밀번호가 다릅니다.'
          }
        }
      }));
      return;
    }
    action$.postSignup.mutate({email: formValidation.email.value, password: formValidation.password.value, name: formValidation.nickname.value});
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValidation((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        value: e.target.value
      }
    }));
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorMsgs: string[] = [];
    if (/\s/.test(e.target.value)) {
      return;
    }
    setFormValidation((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        value: e.target.value
      }
    }));

    e.target.value.length < 8 && errorMsgs.push('비밀번호는 8자 이상이어야 합니다.');
    !/^(?=.*[A-Z]).+$/.test(e.target.value) && errorMsgs.push('비밀번호에는 대문자가 포함되어야 합니다.');
    !/^(?=.*[!@#$%^&*]).+$/.test(e.target.value) && errorMsgs.push('비밀번호에는 특수문자가 포함되어야 합니다.');

    setFormValidation((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        messages: errorMsgs.map((msg) => ({
          message: msg,
          isError: true
        }))
      }
    }));

    if (formValidation.passwordConfirm.value) {
      setFormValidation((prev) => ({
        ...prev,
        passwordConfirm: {
          ...prev.passwordConfirm,
          isError: e.target.value !== formValidation.passwordConfirm.value,
          message: {
            message: e.target.value === formValidation.passwordConfirm.value ? '비밀번호가 같습니다.' : '비밀번호가 다릅니다.',
            isError: e.target.value !== formValidation.passwordConfirm.value
          }
        }
      }));
    }
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValidation((prev) => ({
      ...prev,
      passwordConfirm: {
        ...prev.passwordConfirm,
        value: e.target.value
      }
    }));

    if (formValidation.password.value === e.target.value) {
      setFormValidation((prev) => ({
        ...prev,
        passwordConfirm: {
          ...prev.passwordConfirm,
          isError: false,
          message: {
            message: '비밀번호가 같습니다.',
            isError: false
          }
        }
      }));
    } else {
      setFormValidation((prev) => ({
        ...prev,
        passwordConfirm: {
          ...prev.passwordConfirm,
          isError: true,
          message: {
            message: '비밀번호가 다릅니다.',
            isError: true
          }
        }
      }));
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValidation((prev) => ({
      ...prev,
      nickname: {
        ...prev.nickname,
        value: e.target.value
      }
    }));
  };

  const onFocusInputField = (field: keyof TFormValidation) => {
    setFormValidation((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        isFocused: true
      }
    }));
  };

  const onBlurInputField = (field: keyof TFormValidation) => {
    setFormValidation((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        isFocused: false
      }
    }));
  };

  return {
    formValidation,
    onSubmitSignup,
    onChangeEmail,
    onChangePassword,
    onChangePasswordConfirm,
    onChangeName,
    onFocusInputField,
    onBlurInputField
  };
};
