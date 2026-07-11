import {TFormValidation} from '../hook/useSignup';
import repository from '@/repository';
import {FetchError} from '@/utils/fetch/fetch.error';
import {AUTH_QUERY_KEYS} from '@/utils/queryKeyStore';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';

interface IUsePostSignupProps {
  setFormValidation: React.Dispatch<React.SetStateAction<TFormValidation>>;
}

export const usePostSignup = ({setFormValidation}: IUsePostSignupProps) => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AUTH_QUERY_KEYS.postSignup().queryKey,
    mutationFn: ({email, password, name}: {email: string; password: string; name: string}) => repository.auth.postSignup({email, password, name}),
    onSuccess: () => {
      toast.success('회원가입 성공');
    },
    onError: (error) => {
      if (error instanceof FetchError) {
        switch (error.status) {
          case 400:
            error.message.includes('이메일') &&
              setFormValidation((prev) => ({
                ...prev,
                email: {
                  ...prev.email,
                  isError: true,
                  message: {
                    isError: true,
                    message: '이메일 형식이 올바르지 않습니다.'
                  }
                }
              }));
            error.message.includes('비밀번호') &&
              setFormValidation((prev) => ({
                ...prev,
                password: {
                  ...prev.password,
                  isError: true,
                  messages: [
                    {
                      isError: true,
                      message: '비밀번호는 8자 이상이어야 합니다.'
                    }
                  ]
                }
              }));
            break;
          case 409:
            toast.error(error.message);
            break;
          default:
            toast.error('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
            break;
        }
      }
    }
  });
};
