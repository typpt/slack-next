import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, {
      message: 'Password must be at least 6 characters.',
    })
    .trim(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
