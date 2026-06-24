import authRepository, {IAuthRepository} from './auth.repository';
import todosRepository, {ITodosRepository} from './todos.repository';
import {auth} from '@/auth';

// REST Api 엔드 포인트 정의
export const API = Object.freeze({
  TODOS: 'todos',
  AUTH: 'auth'
});

// export {
//   TodoSchema,
//   TodosSchema,
//   PostTodosSchema,
//   PutCompleteTodoByIdSchema,
//   DeleteTodoByIdSchema,
// } from "./schema/todos.repository.schema";

export interface IRepository {
  todos: ITodosRepository;
  auth: IAuthRepository;
}

const repository: IRepository = {
  todos: todosRepository,
  auth: authRepository
};

export default repository;
