import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export function useGetByIdWorkspaceApi({ id }: { id: Id<'workspaces'> }) {
  const data = useQuery(api.workspaces.getByIdWorkspace, { id });

  const isPending = data === undefined;

  return { data, isPending };
}
