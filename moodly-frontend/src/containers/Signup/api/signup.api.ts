import repository from '@/repository';
import {AUTH_QUERY_KEYS} from '@/utils/queryKeyStore';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const usePostSignup = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AUTH_QUERY_KEYS.postSignup().queryKey,
    mutationFn: ({email, password, name}: {email: string; password: string; name: string}) => repository.auth.postSignup({email, password, name}),
    onSuccess: () => {
      console.log('회원가입 성공');
    },
    onError: (error) => {
      console.error('회원가입 실패', error);
    }
  });
};
