import { useParams } from 'next/navigation';
import { Id } from '../../../../convex/_generated/dataModel';

export function UseWorkspaceId() {
  const params = useParams();
  return params.workspaceId as Id<'workspaces'>;
}
