import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { api } from '../../../../convex/_generated/api';

export function useGetUsersApi() {
  return useQuery(convexQuery(api.users.getUsers, {}));
}
