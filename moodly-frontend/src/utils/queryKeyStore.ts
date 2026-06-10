import { createQueryKeys } from "@lukemorales/query-key-factory";

export const TODOS_QUERY_KEYS = createQueryKeys("todos", {
  postTodos: () => ["postTodos"],
  getTodos: () => ["getTodos"],
  putCompleteTodoById: () => ["putCompleteTodoById"],
  deleteTodoById: () => ["deleteTodoById"],
});
