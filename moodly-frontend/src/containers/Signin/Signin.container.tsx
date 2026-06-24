'use client';

import SigninPresenterModule from './presenter/module/Signin.presenter.module';
import {type FC} from 'react';

const SigninContainer: FC = () => {
  return (
    <div>
      <SigninPresenterModule />
    </div>
  );
};

export default SigninContainer;
