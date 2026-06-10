import { getBaseUrl, fetchClient } from "@/utils";
import { API } from "@/repository/index";
import {
  TDeleteTodoByIdResponse,
  TodoResponse,
  TodosResponse,
  TPostTodosResponse,
  TPutCompleteTodoByIdResponse,
} from "@/repository/schema/todos.repository.schema";

export interface ITodosRepository {
  postTodos: ({
    title,
    description,
    completed,
  }: {
    title: string;
    description: string;
    completed?: boolean;
  }) => Promise<TPostTodosResponse>;
  getTodos: () => Promise<TodosResponse>;
  putCompleteTodoById: ({
    id,
    completed,
  }: {
    id: number;
    completed: boolean;
  }) => Promise<TPutCompleteTodoByIdResponse>;
  getTodoById: (id: number) => Promise<TodoResponse>;
  deleteTodoById: (id: number) => Promise<TDeleteTodoByIdResponse>;
}

/**
 * getTodos
 * @description "todos" 엔드포인트에 GET 요청을 보내는 함수입니다. 서버에서 반환된 데이터를 TodosResponse 타입으로 반환합니다.
 */

const getTodos = async () => {
  return await fetchClient<TodosResponse>(`${getBaseUrl()}/${API.TODOS}`);
};

/**
 * postTodos
 * @description "todos" 엔드포인트에 POST 요청을 보내는 함수입니다. 서버에서 반환된 데이터를 TPostTodosResponse 타입으로 반환합니다.
 */
const postTodos = async ({
  title,
  description,
  completed,
}: {
  title: string;
  description: string;
  completed?: boolean;
}) => {
  return await fetchClient<TPostTodosResponse>(`${getBaseUrl()}/${API.TODOS}`, {
    method: "POST",
    body: JSON.stringify({ title, description, completed: completed ?? false }),
  });
};

/**
 *
 * putCompleteTodoById
 * @returns
 */

const putCompleteTodoById = async ({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}) => {
  return await fetchClient<TPutCompleteTodoByIdResponse>(
    `${getBaseUrl()}/${API.TODOS}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ completed }),
    },
  );
};

const getTodoById = async (id: number) => {
  return await fetchClient<TodoResponse>(`${getBaseUrl()}/${API.TODOS}/${id}`);
};

const deleteTodoById = async (id: number) => {
  return await fetchClient<TDeleteTodoByIdResponse>(
    `${getBaseUrl()}/${API.TODOS}/${id}`,
    {
      method: "DELETE",
    },
  );
};

const todosRepository: ITodosRepository = {
  postTodos,
  getTodos,
  putCompleteTodoById,
  getTodoById,
  deleteTodoById,
};

export default todosRepository;
