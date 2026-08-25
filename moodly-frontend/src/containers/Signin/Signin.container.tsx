'use client';

import {useSignin} from './hook/useSignin';
import SigninPresenterModule from './presenter/module/Signin.presenter.module';
import {type FC} from 'react';

const SigninContainer: FC = () => {
  const {onSubmitSignin, onChangeEmail, onChangePassword, onFocusInputField, onBlurInputField, formValidation} = useSignin();

  const vProps = {
    onSubmitSignin,
    onChangeEmail,
    onChangePassword,
    onFocusInputField,
    onBlurInputField,
    formValidation
  };
  return (
    <div>
      <SigninPresenterModule {...vProps} />
    </div>
  );
};

export default SigninContainer;
