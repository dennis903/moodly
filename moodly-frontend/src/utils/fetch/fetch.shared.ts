// src/utils/fetch/fetch.shared.ts
// fetch.client / fetch.server 가 공통으로 쓰는 타입과 응답 처리 로직
import {FetchError} from './fetch.error';

export interface IFetchInit extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
  /** 인증이 필요 없는 요청(회원가입/로그인 등)에서 세션 조회를 건너뜁니다. */
  skipAuth?: boolean;
}

export const buildRequestInit = (init?: IFetchInit, accessToken?: string): RequestInit => {
  const {skipAuth: _skipAuth, headers, ...rest} = init ?? {};

  return {
    credentials: 'include',
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && {Authorization: `Bearer ${accessToken}`}),
      ...(headers ?? {})
    }
  };
};

export const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const body = await res.json().catch(() => null);

    throw new FetchError(res.status, body?.code, body?.message ?? res.statusText, body);
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
};
