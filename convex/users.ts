import { query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    return userId === null ? null : await ctx.db.get(userId);
  },
});
