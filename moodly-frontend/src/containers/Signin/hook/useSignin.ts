'use client';

import {signInWithCredentials} from '@/actions/signin';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {toast} from 'sonner';

interface IUseSigninReturn {
  onSubmitSignin: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  password: {
    value: string;
    isFocused: boolean;
    isError: boolean;
    message: {
      isError: boolean;
      message: string;
    };
  };
};

export const useSignin = (): IUseSigninReturn => {
  const router = useRouter();
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
    password: {
      value: '',
      isFocused: false,
      isError: false,
      message: {
        isError: false,
        message: ''
      }
    }
  });

  const initFormValidation = () => {
    setFormValidation({
      email: {
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
        message: {
          isError: false,
          message: ''
        }
      }
    });
  };

  const onSubmitSignin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await signInWithCredentials(formValidation.email.value, formValidation.password.value);

    if (!response.success) {
      initFormValidation();
      toast.error(`로그인 실패: ${response.error}`);

      return;
    } else {
      router.push('/today');
    }
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
    setFormValidation((prev) => ({
      ...prev,
      password: {
        ...prev.password,
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
    onSubmitSignin,
    onChangeEmail,
    onChangePassword,
    onFocusInputField,
    onBlurInputField,
    formValidation
  };
};
