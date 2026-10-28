import {createQueryKeys} from '@lukemorales/query-key-factory';

export const TODOS_QUERY_KEYS = createQueryKeys('todos', {
  postTodos: () => ['postTodos'],
  getTodos: () => ['getTodos'],
  putCompleteTodoById: () => ['putCompleteTodoById'],
  deleteTodoById: () => ['deleteTodoById']
});

export const AUTH_QUERY_KEYS = createQueryKeys('auth', {
  postSignup: () => ['postSignup'],
  postLogin: () => ['postLogin'],
  getAuthMe: () => ['getAuthMe']
});

export const EMOTION_REGISTER_MODAL_QUERY_KEYS = createQueryKeys('emotionRegisterModal', {
  postEmotionRegister: () => ['postEmotionRegister'],
  patchEmotionRegister: () => ['patchEmotionRegister'],
  deleteEmotionRegister: () => ['deleteEmotionRegister']
});

export const DETAIL_QUERY_KEYS = createQueryKeys('detail', {
  getDetailById: (id: string) => ['getDetailById', id]
});

export const CALENDAR_QUERY_KEYS = createQueryKeys('calendar', {
  getCalendarByMonth: (year: number, month: number) => ['getCalendarByMonth', year, month]
});
