import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export function useGetUsersApi() {
  const data = useQuery(api.users.getUsers);

  const isPending = data === undefined;

  return { data, isPending };
}
