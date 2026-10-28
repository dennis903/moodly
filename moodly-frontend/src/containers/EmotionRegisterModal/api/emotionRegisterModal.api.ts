import {useEmotionRegisterModalDispatch} from '../store/emotionRegisterModal.store';
import repository from '@/repository';
import {FetchError} from '@/utils/fetch/fetch.error';
import {DETAIL_QUERY_KEYS, EMOTION_REGISTER_MODAL_QUERY_KEYS} from '@/utils/queryKeyStore';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

export const usePostEmotionRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch$ = {
    acToggleModal: useEmotionRegisterModalDispatch()
  };

  return useMutation({
    mutationKey: EMOTION_REGISTER_MODAL_QUERY_KEYS.postEmotionRegister().queryKey,
    mutationFn: ({date, emotion, memo, tags}: {date: string; emotion: string; memo: string; tags: string[]}) => repository.entries.postEntries({date, emotion, memo, tags}),
    onSuccess: (payload: {data: {id: string; date: string}}) => {
      setTimeout(() => {
        dispatch$.acToggleModal({isOpen: false});
      }, 1000);
      router.push(`/detail/${payload.data.id}`);
    },
    onError: (error) => {
      if (error instanceof FetchError) {
        switch (error.status) {
          case 400:
            toast.error('오늘의 감정 등록에 실패했습니다. 입력값을 확인해주세요.');
            break;
          case 409:
            toast.error('오늘의 감정은 이미 등록되었습니다.');
            break;
          case 401:
            toast.error('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
            break;
          default:
            toast.error('오늘의 감정 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
            break;
        }
      }
    }
  });
};

export const usePatchEmotionRegister = () => {
  const queryClient = useQueryClient();

  const dispatch$ = {
    acToggleModal: useEmotionRegisterModalDispatch()
  };

  return useMutation({
    mutationKey: EMOTION_REGISTER_MODAL_QUERY_KEYS.patchEmotionRegister().queryKey,
    mutationFn: ({id, date, emotion, memo, tags}: {id: string; date: string; emotion: string; memo: string; tags: string[]}) => repository.entries.patchEntriesById({id, date, emotion, memo, tags}),
    onSuccess: (payload: {data: {id: string; date: string}}) => {
      toast.success('오늘의 감정이 수정되었습니다.');
      queryClient.invalidateQueries({
        queryKey: DETAIL_QUERY_KEYS.getDetailById(payload.data.id).queryKey
      });

      setTimeout(() => {
        dispatch$.acToggleModal({isOpen: false});
      }, 1000);
    },
    onError: (error) => {
      if (error instanceof FetchError) {
        switch (error.status) {
          case 400:
            toast.error('오늘의 감정 수정에 실패했습니다. 입력값을 확인해주세요.');
            break;
          case 404:
            toast.error('오늘의 감정이 존재하지 않습니다.');
            break;
          case 401:
            toast.error('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
            break;
          case 403:
            toast.error('오늘의 감정 수정 권한이 없습니다.');
            break;
          default:
            toast.error('오늘의 감정 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
            break;
        }
      }
    }
  });
};

export const useDeleteEmotionRegister = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EMOTION_REGISTER_MODAL_QUERY_KEYS.deleteEmotionRegister().queryKey,
    mutationFn: (id: string) => repository.entries.deleteEntriesById(id),
    onSuccess: (payload: {data: {message: string}}) => {
      toast.success(payload.data.message);
      queryClient.removeQueries({
        queryKey: DETAIL_QUERY_KEYS.getDetailById(id).queryKey
      });
      setTimeout(() => {
        router.push('/');
      }, 1000);
    },
    onError: (error) => {
      if (error instanceof FetchError) {
        switch (error.status) {
          case 404:
            toast.error('오늘의 감정이 존재하지 않습니다.');
            break;
          case 401:
            toast.error('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
            break;
          case 403:
            toast.error('오늘의 감정 삭제 권한이 없습니다.');
            break;
          default:
            toast.error('오늘의 감정 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
            break;
        }
      }
    }
  });
};
