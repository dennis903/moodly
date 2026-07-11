'use client';

import {useSignup} from './hook/useSignup';
import SignupPresenterModule from './presenter/module/Signup.presenter.module';
import {type FC} from 'react';

const SignupContainer: FC = () => {
  const {onSubmitSignup, onChangeEmail, onChangePassword, onChangePasswordConfirm, onChangeName, onFocusInputField, onBlurInputField, formValidation} = useSignup();

  const vProps = {
    onSubmitSignup,
    onChangeEmail,
    onChangePassword,
    onChangePasswordConfirm,
    onChangeName,
    onFocusInputField,
    onBlurInputField,
    formValidation
  };

  return (
    <div>
      <SignupPresenterModule {...vProps} />
    </div>
  );
};

export default SignupContainer;
