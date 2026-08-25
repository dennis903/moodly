import {type IFetchInit, buildRequestInit, handleResponse} from './fetch.shared';
import {getSession} from 'next-auth/react';

const isBrowser = () => typeof window !== 'undefined';

export const fetchClient = async <T>(input: RequestInfo, init?: IFetchInit): Promise<T> => {
  if (!init?.skipAuth && !isBrowser()) {
    throw new Error('fetchClient 는 브라우저 전용입니다. 서버에서는 fetchServer 를 사용하거나 skipAuth 옵션을 주세요.');
  }

  const session = init?.skipAuth ? null : await getSession();

  const res = await fetch(input, buildRequestInit(init, session?.accessToken));

  return handleResponse<T>(res);
};
