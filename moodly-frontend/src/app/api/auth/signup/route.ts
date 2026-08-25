import repository from '@/repository';
import {FetchError} from '@/utils';
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const {email, password, name} = await request.json();

  try {
    const response = await repository.auth.postSignup({email, password, name});
    return NextResponse.json(response, {status: 200});
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.json({message: error?.message, code: error?.code}, {status: error.status});
    }
    return NextResponse.json({error: '회원가입 실패'}, {status: 500});
  }
}
