import repository from '@/repository';
import {FetchError} from '@/utils/fetch/fetch.error';
import {AUTH_QUERY_KEYS} from '@/utils/queryKeyStore';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const usePostSignup = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AUTH_QUERY_KEYS.postSignup().queryKey,
    mutationFn: ({email, password, name}: {email: string; password: string; name: string}) => repository.auth.postSignup({email, password, name}),
    onSuccess: () => {
      alert('회원가입 성공');
    },
    onError: (error) => {
      alert('회원가입 실패');

      if (error instanceof FetchError) {
        console.error('FetchError:', error);
      }
    }
  });
};
