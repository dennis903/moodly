'use client';

import {type FC} from 'react';

const SigninPresenterModule: FC = () => {
  return (
    <div>
      <form>
        <fieldset>
          <legend>이메일</legend>
          <input type="email" placeholder="이메일" />
        </fieldset>
        <fieldset>
          <legend>비밀번호</legend>
          <input type="password" placeholder="비밀번호" />
        </fieldset>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default SigninPresenterModule;
