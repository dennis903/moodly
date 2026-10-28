import repository from '@/repository';
import {FetchError} from '@/utils/fetch/fetch.error';
import {DETAIL_QUERY_KEYS} from '@/utils/queryKeyStore';
import {useQuery} from '@tanstack/react-query';
import {notFound, useRouter} from 'next/navigation';
import {useEffect} from 'react';

export const useGetDetailById = (id: string) => {
  const router = useRouter();
  const {
    data: payload,
    isSuccess,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: DETAIL_QUERY_KEYS.getDetailById(id).queryKey,
    queryFn: () => repository.entries.getEntriesById(id),
    enabled: !!id
  });

  useEffect(() => {
    if (isError) {
      if (error instanceof FetchError) {
        switch (error.status) {
          case 404:
            notFound();
          case 403:
            router.push('/forbidden');
            break;
          case 401:
            router.push('/auth/signin');
            break;
          default:
            console.error('감정 조회 실패: 알 수 없는 오류가 발생했습니다.');
            break;
        }
      }
    }
  }, [isError, error]);

  return {data: payload?.data, isSuccess, isPending, isError, error};
};
