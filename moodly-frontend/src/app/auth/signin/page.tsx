import SigninContainer from '@/containers/Signin/Signin.container';
import Image from 'next/image';
import {type FC} from 'react';

const SignInPage: FC = () => {
  return (
    <div>
      <Image src="/images/login.png" alt="moodly_logo" width={200} height={200} />
      <h1>로그인</h1>
      <SigninContainer />
    </div>
  );
};

export default SignInPage;
