import {BackendAuthError} from './auth.error';
import repository from './repository';
import {FetchError} from './utils';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {type: 'email'},
        password: {type: 'password'},
        name: {type: 'text'}
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          throw new BackendAuthError('BAD_REQUEST', '이메일 혹은 비밀번호가 제공되지 않았습니다.');
        }

        try {
          const response = await repository.auth.postLogin({email, password});

          if (!response?.data?.user) {
            throw new BackendAuthError('UNAUTHORIZED', 'Invalid email or password');
          }

          return {
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
            accessToken: response.data.access_token
          };
        } catch (error) {
          if (error instanceof BackendAuthError) {
            throw error; // 이미 변환된 경우 그대로
          }
          if (error instanceof FetchError) {
            const payload = error.payload as {error?: string; message?: string};
            throw new BackendAuthError(payload?.error ?? String(error.status), payload?.message ?? error.message);
          }
          throw error; // 진짜 예상 못한 에러는 그대로 던져서 로그에서 확인
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({session, token}) {
      session.accessToken = token.accessToken as string;
      return session;
    }
  },
  secret: process.env.AUTH_SECRET
});
