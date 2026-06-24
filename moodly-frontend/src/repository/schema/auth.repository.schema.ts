import {z} from 'zod';

export const PostSignupSchema = z.object({
  data: z.object({
    access_token: z.string(),
    user: z.object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
      image: z.string().nullable()
    })
  }),
  statusCode: z.number()
});

export const PostLoginSchema = z.object({
  data: z.object({
    access_token: z.string(),
    user: z.object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
      image: z.string().nullable()
    })
  }),
  statusCode: z.number()
});

export const GetAuthMeSchema = z.object({
  data: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    image: z.string().nullable(),
    provider: z.string(),
    createdAt: z.string()
  }),
  statusCode: z.number()
});

export type TPostSignupResponse = z.infer<typeof PostSignupSchema>;
export type TPostLoginResponse = z.infer<typeof PostLoginSchema>;
export type TGetAuthMeResponse = z.infer<typeof GetAuthMeSchema>;
