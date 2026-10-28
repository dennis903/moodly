import repository from '@/repository';
import {FetchError} from '@/utils';
import {NextResponse} from 'next/server';

export async function GET(request: Request, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  try {
    const response = await repository.entries.getEntriesByIdServer(id);
    return NextResponse.json(response, {status: 200});
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.json({message: error?.message, code: error?.code}, {status: error.status});
    }

    console.log('Error in GET /api/entries/:id:', error);

    return NextResponse.json({error: '감정 조회 실패'}, {status: 500});
  }
}

export async function PATCH(request: Request, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const {date, emotion, memo, tags} = await request.json();

  try {
    const response = await repository.entries.patchEntriesByIdServer({id, date, emotion, memo, tags});
    return NextResponse.json(response, {status: 200});
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.json({message: error?.message, code: error?.code}, {status: error.status});
    }

    console.log('Error in PATCH /api/entries/:id:', error);

    return NextResponse.json({error: '감정 수정 실패'}, {status: 500});
  }
}

export async function DELETE(request: Request, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  try {
    const response = await repository.entries.deleteEntriesByIdServer(id);
    return NextResponse.json(response, {status: 200});
  } catch (error) {
    if (error instanceof FetchError) {
      return NextResponse.json({message: error?.message, code: error?.code}, {status: error.status});
    }

    console.log('Error in DELETE /api/entries/:id:', error);

    return NextResponse.json({error: '감정 삭제 실패'}, {status: 500});
  }
}
