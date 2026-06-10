import todosRepository, {ITodosRepository} from './todos.repository';

// REST Api 엔드 포인트 정의
export const API = Object.freeze({
  TODOS: 'todos'
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
}

const repository: IRepository = {
  todos: todosRepository
};

export default repository;
