import * as z from 'zod';

export const createWorkspaceSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .min(3, { message: 'Name must be at least 3 characters.' })
    .trim(),
});

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;
