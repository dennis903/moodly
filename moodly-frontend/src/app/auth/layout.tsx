import {headers} from 'next/headers';
import {type FC} from 'react';

const AuthLayout: FC<{children: React.ReactNode}> = async ({children}) => {
  const headersList = await headers();
  const pathName = headersList.get('x-pathname') || headersList.get('x-invoke-path') || '';

  const isSignIn = pathName.includes('/signin');
  const isSignUp = pathName.includes('/signup');

  return <div>{children}</div>;
};

export default AuthLayout;
