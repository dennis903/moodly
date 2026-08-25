import {API} from '@/repository/index';
import {TGetAuthMeResponse, TPostLoginResponse, TPostSignupResponse} from '@/repository/schema/auth.repository.schema';
import {fetchClient, getBaseUrl} from '@/utils';

export interface IAuthRepository {
  postSignup: ({email, password, name}: {email: string; password: string; name: string}) => Promise<TPostSignupResponse>;
  postLogin: ({email, password}: {email: string; password: string}) => Promise<TPostLoginResponse>;
  getAuthMe: () => Promise<TGetAuthMeResponse>;
}

const postSignup = async ({email, password, name}: {email: string; password: string; name: string}): Promise<TPostSignupResponse> => {
  return await fetchClient(`${getBaseUrl()}/${API.AUTH}/signup`, {
    method: 'POST',
    body: JSON.stringify({email, password, name}),
    skipAuth: true
  });
};

const postLogin = async ({email, password}: {email: string; password: string}): Promise<TPostLoginResponse> => {
  return await fetchClient(`${getBaseUrl()}/${API.AUTH}/login`, {
    method: 'POST',
    body: JSON.stringify({email, password}),
    skipAuth: true
  });
};

const getAuthMe = async (): Promise<TGetAuthMeResponse> => {
  return await fetchClient(`${getBaseUrl()}/${API.AUTH}/me`);
};

const authRepository: IAuthRepository = {
  postSignup,
  postLogin,
  getAuthMe
};

export default authRepository;
