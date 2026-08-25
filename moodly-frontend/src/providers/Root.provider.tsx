import QueryClientProvider from './QueryClient.provider';
import SessionProvider from './Session.provider';
import {type FC} from 'react';

interface IRootProviderProps {
  children: React.ReactNode;
}

const RootProvider: FC<IRootProviderProps> = ({children}) => {
  return (
    <SessionProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default RootProvider;
