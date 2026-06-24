import Image from 'next/image';
import {type FC} from 'react';

const SignInPage: FC = () => {
  return (
    <div>
      <Image src="/images/signin.png" alt="signin" width={80} height={80} />
    </div>
  );
};

export default SignInPage;
