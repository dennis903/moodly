import repository from '@/repository';
import {FetchError} from '@/utils/fetch/fetch.error';
import {CALENDAR_QUERY_KEYS} from '@/utils/queryKeyStore';
import {useQuery} from '@tanstack/react-query';
import {notFound, useRouter} from 'next/navigation';
import {useEffect} from 'react';

export const useGetCalendarByDate = ({year, month}: {year: number; month: number}) => {
  const router = useRouter();
  const {
    data: payload,
    isSuccess,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: CALENDAR_QUERY_KEYS.getCalendarByMonth(year, month).queryKey,
    queryFn: () => repository.entries.getEntriesByDate({startDate: `${year}-${month}-01`, endDate: `${year}-${month}-${new Date(year, month, 0).getDate()}`}),
    enabled: !!year && !!month
  });

  useEffect(() => {
    if (isError) {
      if (error instanceof FetchError) {
        switch (error.status) {
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
