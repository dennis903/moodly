import repository from '@/repository';
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const {email, password, name} = await request.json();

  try {
    const response = await repository.auth.postSignup({email, password, name});
    return NextResponse.json(response, {status: 200});
  } catch (error) {
    console.error('회원가입 실패', error);
    return NextResponse.json({error: '회원가입 실패'}, {status: 500});
  }
}
