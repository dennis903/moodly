import {API} from '@/repository/index';
import {TDeleteEntriesResponse, TGetEntriesByDateResponse, TGetEntriesResponse, TPatchEntriesResponse, TPostEntriesResponse} from '@/repository/schema/entries.repository.schema';
import {fetchClient, fetchServer, getBaseUrl} from '@/utils';

export interface IEntriesRepository {
  postEntries: ({date, emotion, memo, tags}: {date: string; emotion: string; memo: string; tags: string[]}) => Promise<TPostEntriesResponse>;
  postEntriesServer: ({date, emotion, memo, tags}: {date: string; emotion: string; memo: string; tags: string[]}) => Promise<TPostEntriesResponse>;
  getEntriesById: (id: string) => Promise<TGetEntriesResponse>;
  getEntriesByIdServer: (id: string) => Promise<TGetEntriesResponse>;
  patchEntriesById: ({id, date, emotion, memo, tags}: {id: string; date: string; emotion: string; memo: string; tags: string[]}) => Promise<TPatchEntriesResponse>;
  patchEntriesByIdServer: ({id, date, emotion, memo, tags}: {id: string; date: string; emotion: string; memo: string; tags: string[]}) => Promise<TPatchEntriesResponse>;
  deleteEntriesById: (id: string) => Promise<TDeleteEntriesResponse>;
  deleteEntriesByIdServer: (id: string) => Promise<TDeleteEntriesResponse>;
  getEntriesByDate: ({startDate, endDate}: {startDate: string; endDate: string}) => Promise<TGetEntriesByDateResponse>;
  getEntriesByDateServer: ({startDate, endDate}: {startDate: string; endDate: string}) => Promise<TGetEntriesByDateResponse>;
}

const postEntries = async ({date, emotion, memo, tags}: {date: string; emotion: string; memo: string; tags: string[]}): Promise<TPostEntriesResponse> => {
  return await fetchClient(`${getBaseUrl()}/${API.ENTRIES}`, {
    method: 'POST',
    body: JSON.stringify({date, emotion, memo, tags})
  });
};

const postEntriesServer = async ({date, emotion, memo, tags}: {date: string; emotion: string; memo: string; tags: string[]}): Promise<TPostEntriesResponse> => {
  return await fetchServer(`${getBaseUrl()}/${API.ENTRIES}`, {
    method: 'POST',
    body: JSON.stringify({date, emotion, memo, tags})
  });
};

const getEntriesById = async (id: string): Promise<TGetEntriesResponse> => {
  return await fetchClient(`${getBaseUrl()}/${API.ENTRIES}/${id}`, {
    method: 'GET'
  });
};

const getEntriesByIdServer = async (id: string): Promise<TGetEntriesResponse> => {
  return await fetchServer(`${getBaseUrl()}/${API.ENTRIES}/${id}`, {
    method: 'GET'
  });
};

const patchEntriesById = async ({id, date, emotion, memo, tags}: {id: string; date: string; emotion: string; memo: string; tags: string[]}): Promise<TPatchEntriesResponse> => {
  return await fetchClient(`${getBaseUrl()}/${API.ENTRIES}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({date, emotion, memo, tags})
  });
};

const patchEntriesByIdServer = async ({id, date, emotion, memo, tags}: {id: string; date: string; emotion: string; memo: string; tags: string[]}): Promise<TPatchEntriesResponse> => {
  return await fetchServer(`${getBaseUrl()}/${API.ENTRIES}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({date, emotion, memo, tags})
  });
};

const deleteEntriesById = async (id: string): Promise<TDeleteEntriesResponse> => {
  return await fetchClient(`${getBaseUrl()}/${API.ENTRIES}/${id}`, {
    method: 'DELETE'
  });
};

const deleteEntriesByIdServer = async (id: string): Promise<TDeleteEntriesResponse> => {
  return await fetchServer(`${getBaseUrl()}/${API.ENTRIES}/${id}`, {
    method: 'DELETE'
  });
};

const getEntriesByDate = async ({startDate, endDate}: {startDate: string; endDate: string}): Promise<TGetEntriesByDateResponse> => {
  return await fetchClient(`${getBaseUrl()}/${API.ENTRIES}?from=${startDate}&to=${endDate}`, {
    method: 'GET'
  });
};

const getEntriesByDateServer = async ({startDate, endDate}: {startDate: string; endDate: string}): Promise<TGetEntriesByDateResponse> => {
  return await fetchServer(`${getBaseUrl()}/${API.ENTRIES}?from=${startDate}&to=${endDate}`, {
    method: 'GET'
  });
};

const entriesRepository: IEntriesRepository = {
  postEntries,
  postEntriesServer,
  getEntriesById,
  getEntriesByIdServer,
  patchEntriesById,
  patchEntriesByIdServer,
  deleteEntriesById,
  deleteEntriesByIdServer,
  getEntriesByDate,
  getEntriesByDateServer
};

export default entriesRepository;
