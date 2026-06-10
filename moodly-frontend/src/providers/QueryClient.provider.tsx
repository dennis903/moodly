"use client";

import {
  QueryCache,
  MutationCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, FetchError } from "@/utils";

const handleAuthError = () => {
  // 추후 로그인 페이지가 생기면 redirect, 지금은 토스트만
  toast.error("로그인이 필요합니다.");
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof FetchError && error.status >= 500) {
        toast.error(getErrorMessage(error));
      } // 필요 시 logger.error(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _ctx, mutation) => {
      if (error instanceof FetchError && error.status === 401) {
        handleAuthError();
        return;
      } // mutation에 자체 onError가 없을 때만 공통 토스트
      if (!mutation.options.onError) toast.error(getErrorMessage(error));
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1분
      retry: (failureCount, error) => {
        if (error instanceof FetchError && error.status < 500) return false;
        return failureCount < 2;
      },
    },
  },
});

const QueryClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
