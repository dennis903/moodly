import authRepository, {IAuthRepository} from './auth.repository';
import entriesRepository, {IEntriesRepository} from './entries.repository';
import todosRepository, {ITodosRepository} from './todos.repository';

// REST Api 엔드 포인트 정의
export const API = Object.freeze({
  TODOS: 'todos',
  AUTH: 'auth',
  ENTRIES: 'entries'
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
  entries: IEntriesRepository;
}

const repository: IRepository = {
  todos: todosRepository,
  auth: authRepository,
  entries: entriesRepository
};

export default repository;
