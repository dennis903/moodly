'use client';

import {SessionProvider as NextAuthSessionProvider} from 'next-auth/react';
import {type FC} from 'react';

interface ISessionProviderProps {
  children: React.ReactNode;
}

// getSession() / useSession() 이 동작하려면 트리 상단에 이 프로바이더가 있어야 합니다.
const SessionProvider: FC<ISessionProviderProps> = ({children}) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
