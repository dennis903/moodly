import { type FC } from "react";
import QueryClientProvider from "./QueryClient.provider";

interface IRootProviderProps {
  children: React.ReactNode;
}

const RootProvider: FC<IRootProviderProps> = ({ children }) => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};

export default RootProvider;
