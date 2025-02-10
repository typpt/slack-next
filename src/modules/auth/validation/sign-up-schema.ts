import * as z from 'zod';

export const signUpSchema = z
  .object({
    name: z
      .string({ message: 'Name is required' })
      .min(3, {
        message:
          'Name must be at least 3 characters.',
      })
      .trim(),
    email: z
      .string()
      .email({ message: 'Enter a valid email' }),
    password: z
      .string({ message: 'Password is required' })
      .min(6, {
        message:
          'Password must be at least 6 characters.',
      })
      .trim(),
    confirmPassword: z.string().trim().optional(),
  })
  .superRefine(
    (
      { password, confirmPassword },
      { addIssue }
    ) => {
      if (password !== confirmPassword)
        addIssue({
          code: 'custom',
          message: 'Password do not match',
          path: ['confirmPassword'],
        });
    }
  );

export type SignUpSchema = z.infer<
  typeof signUpSchema
>;
