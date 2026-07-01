'use client';

import {InputField} from '@/components';
import {type FC} from 'react';

interface ISignupPresenterModuleProps {
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

const SignupPresenterModule: FC<ISignupPresenterModuleProps> = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmitSignup}>
        <InputField
          legend="닉네임"
          type="text"
          placeholder="닉네임"
          messages={[
            {
              isError: true,
              message: '실패'
            }
          ]}
          isError={true}
          isFocused={false}
          onChange={props.onChangeName}
        />
        <InputField legend="이메일" type="email" placeholder="이메일" messages={[]} isError={false} isFocused={false} onChange={props.onChangeEmail} />
        <InputField legend="비밀번호" type="password" placeholder="비밀번호" messages={[]} isError={false} isFocused={false} onChange={props.onChangePassword} />
        <InputField legend="비밀번호 확인" type="password" placeholder="비밀번호 확인" messages={[]} isError={false} isFocused={false} onChange={props.onChangePasswordConfirm} />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default SignupPresenterModule;
