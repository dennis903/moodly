'use client';

import {type TFormValidation} from '../../hook/useSignup';
import {InputField} from '@/components';
import {type FC} from 'react';

interface ISignupPresenterModuleProps {
  onSubmitSignup: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusInputField: (field: keyof TFormValidation) => void;
  onBlurInputField: (field: keyof TFormValidation) => void;
  formValidation: TFormValidation;
}

const SignupPresenterModule: FC<ISignupPresenterModuleProps> = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmitSignup}>
        <InputField
          legend="닉네임"
          type="text"
          placeholder="닉네임"
          messages={[props.formValidation.nickname.message]}
          isError={props.formValidation.nickname.message.isError}
          isFocused={props.formValidation.nickname.isFocused}
          onChange={props.onChangeName}
          onFocus={() => props.onFocusInputField('nickname')}
          onBlur={() => props.onBlurInputField('nickname')}
        />
        <InputField
          legend="이메일"
          type="email"
          placeholder="이메일"
          messages={[props.formValidation.email.message]}
          isError={props.formValidation.email.message.isError}
          isFocused={props.formValidation.email.isFocused}
          onChange={props.onChangeEmail}
          onFocus={() => props.onFocusInputField('email')}
          onBlur={() => props.onBlurInputField('email')}
        />
        <InputField
          legend="비밀번호"
          type="password"
          placeholder="비밀번호"
          messages={props.formValidation.password.messages}
          isError={props.formValidation.password.messages.length > 0}
          isFocused={props.formValidation.password.isFocused}
          onChange={props.onChangePassword}
          onFocus={() => props.onFocusInputField('password')}
          onBlur={() => props.onBlurInputField('password')}
        />
        <InputField
          legend="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          messages={[props.formValidation.passwordConfirm.message]}
          isError={props.formValidation.passwordConfirm.message.isError}
          isFocused={props.formValidation.passwordConfirm.isFocused}
          onChange={props.onChangePasswordConfirm}
          onFocus={() => props.onFocusInputField('passwordConfirm')}
          onBlur={() => props.onBlurInputField('passwordConfirm')}
        />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default SignupPresenterModule;
