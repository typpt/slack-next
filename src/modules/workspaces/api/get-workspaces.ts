import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export function useGetWorkspacesApi() {
  const data = useQuery(api.workspaces.getWorkspaces);

  const isPending = data === undefined;

  return { data, isPending };
}
