import {type IFetchInit, buildRequestInit, handleResponse} from './fetch.shared';
import {auth} from '@/auth';

export const fetchServer = async <T>(input: RequestInfo, init?: IFetchInit): Promise<T> => {
  const session = init?.skipAuth ? null : await auth();

  const res = await fetch(input, buildRequestInit(init, session?.accessToken));

  return handleResponse<T>(res);
};
