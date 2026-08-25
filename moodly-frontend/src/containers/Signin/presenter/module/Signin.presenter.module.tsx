'use client';

import {type TFormValidation} from '../../hook/useSignin';
import {InputField} from '@/components';
import {PrimaryButton} from '@/components';
import {type FC} from 'react';

interface ISigninPresenterModuleProps {
  onSubmitSignin: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusInputField: (field: keyof TFormValidation) => void;
  onBlurInputField: (field: keyof TFormValidation) => void;
  formValidation: TFormValidation;
}

const SigninPresenterModule: FC<ISigninPresenterModuleProps> = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmitSignin}>
        <InputField
          legend="이메일"
          type="email"
          placeholder="이메일"
          value={props.formValidation.email.value}
          messages={[props.formValidation.email.message]}
          isFocused={props.formValidation.email.isFocused}
          isError={props.formValidation.email.message.isError}
          onChange={props.onChangeEmail}
          onFocus={() => props.onFocusInputField('email')}
          onBlur={() => props.onBlurInputField('email')}
        />
        <InputField
          legend="비밀번호"
          type="password"
          placeholder="비밀번호"
          value={props.formValidation.password.value}
          messages={[props.formValidation.password.message]}
          isFocused={props.formValidation.password.isFocused}
          isError={props.formValidation.password.message.isError}
          onChange={props.onChangePassword}
          onFocus={() => props.onFocusInputField('password')}
          onBlur={() => props.onBlurInputField('password')}
        />
        <PrimaryButton type="submit" text="로그인" />
      </form>
    </div>
  );
};

export default SigninPresenterModule;
