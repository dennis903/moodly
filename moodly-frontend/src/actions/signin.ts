'use server';

import {signIn} from '@/auth';
import {AuthError} from 'next-auth';

export const signInWithCredentials = async (email: string, password: string) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    return {success: true};
  } catch (error) {
    if (error instanceof AuthError) {
      const message = error.cause?.err?.message ?? '인증에 실패했습니다';
      return {success: false, error: message};
    }

    throw error;
  }
};
