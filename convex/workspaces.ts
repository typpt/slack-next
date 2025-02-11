import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const createWorkspaces = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Unauthorized');
    }

    function generateRandomNumber() {
      return Math.floor(10000 + Math.random() * 90000);
    }

    const workspaceId = await ctx.db.insert('workspaces', {
      name: args.name,
      userId: userId,
      joinCode: String(generateRandomNumber()),
    });

    const workspace = await ctx.db.get(workspaceId);

    return workspace;
  },
});

export const getWorkspaces = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('workspaces').collect();
  },
});
