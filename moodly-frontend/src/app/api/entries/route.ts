import repository from '@/repository';
import {FetchError} from '@/utils';
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const {date, memo, emotion, tags} = await request.json();

  try {
    const response = await repository.entries.postEntriesServer({date, memo, emotion, tags});
    return NextResponse.json(response, {status: 200});
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.json({message: error?.message, code: error?.code}, {status: error.status});
    }

    console.log('Error in POST /api/entries:', error);

    return NextResponse.json({error: '감정 등록 실패'}, {status: 500});
  }
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const startDate = searchParams.get('from');
  const endDate = searchParams.get('to');
  if (!startDate || !endDate) {
    return NextResponse.json({error: '시작일과 종료일을 모두 입력해주세요.'}, {status: 400});
  }

  try {
    const response = await repository.entries.getEntriesByDateServer({startDate, endDate});
    return NextResponse.json(response, {status: 200});
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.json({message: error?.message, code: error?.code}, {status: error.status});
    }
    console.log('Error in GET /api/entries:', error);

    return NextResponse.json({error: '감정 조회 실패'}, {status: 500});
  }
}
