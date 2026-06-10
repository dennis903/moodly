import { z } from "zod";

export const TodoSchema =
  // 성공 데이터 케이스
  z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().nullable(),
    completed: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
  });

export const TodosSchema =
  // 성공 데이터 케이스
  z.array(TodoSchema);

export const PostTodosSchema = z.string();
export const PutCompleteTodoByIdSchema = z.string();
export const DeleteTodoByIdSchema = z.string();

export type TodoResponse = z.infer<typeof TodoSchema>;
export type TodosResponse = z.infer<typeof TodosSchema>;
export type TPostTodosResponse = z.infer<typeof PostTodosSchema>;
export type TPutCompleteTodoByIdResponse = z.infer<
  typeof PutCompleteTodoByIdSchema
>;
export type TDeleteTodoByIdResponse = z.infer<typeof DeleteTodoByIdSchema>;
