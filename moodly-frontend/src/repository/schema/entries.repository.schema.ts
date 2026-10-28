import {z} from 'zod';

export const PostEntriesSchema = z.object({
  data: z.object({
    id: z.string(),
    date: z.string(),
    emotion: z.string(),
    memo: z.string(),
    tags: z.array(z.string())
  }),
  statusCode: z.number()
});

export const GetEntriesByIdSchema = z.object({
  data: z.object({
    id: z.string(),
    date: z.string(),
    emotion: z.string(),
    memo: z.string(),
    userId: z.string(),
    tags: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        userId: z.string()
      })
    ),
    createdAt: z.string(),
    updatedAt: z.string()
  }),
  statusCode: z.number()
});

export const PatchEntriesByIdSchema = z.object({
  data: z.object({
    id: z.string(),
    date: z.string(),
    emotion: z.string(),
    memo: z.string(),
    tags: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        userId: z.string()
      })
    ),
    createdAt: z.string(),
    updatedAt: z.string()
  }),
  statusCode: z.number()
});

export const DeleteEntriesByIdSchema = z.object({
  data: z.object({
    message: z.string()
  }),
  statusCode: z.number()
});

export const GetEntriesByDateSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      date: z.string(),
      emotion: z.string(),
      memo: z.string(),
      userId: z.string(),
      tags: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          userId: z.string()
        })
      ),
      createdAt: z.string(),
      updatedAt: z.string()
    })
  ),
  statusCode: z.number()
});

export type TPostEntriesResponse = z.infer<typeof PostEntriesSchema>;
export type TGetEntriesResponse = z.infer<typeof GetEntriesByIdSchema>;
export type TPatchEntriesResponse = z.infer<typeof PatchEntriesByIdSchema>;
export type TDeleteEntriesResponse = z.infer<typeof DeleteEntriesByIdSchema>;
export type TGetEntriesByDateResponse = z.infer<typeof GetEntriesByDateSchema>;
