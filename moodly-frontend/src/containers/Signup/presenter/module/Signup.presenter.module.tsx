'use client';

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
        <fieldset>
          <legend>닉네임ggg</legend>
          <input type="text" placeholder="닉네임" onChange={props.onChangeName} />
        </fieldset>
        <fieldset>
          <legend>이메일</legend>
          <input type="email" placeholder="이메일" onChange={props.onChangeEmail} />
        </fieldset>
        <fieldset>
          <legend>비밀번호</legend>
          <input type="password" placeholder="비밀번호" value={props.password} onChange={props.onChangePassword} />
          {props.passwordMsg.length > 0 && (
            <ul style={{color: 'red'}}>
              {props.passwordMsg.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          )}
        </fieldset>
        <fieldset>
          <legend>비밀번호 확인</legend>
          <input type="password" placeholder="비밀번호 확인" onChange={props.onChangePasswordConfirm} />
          {props.passwordConfirmMsg && <p style={{color: props.passwordConfirmMsg.isError ? 'red' : 'green'}}>{props.passwordConfirmMsg.message}</p>}
        </fieldset>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default SignupPresenterModule;
