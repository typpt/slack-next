'use client';

import { UseWorkspaceId } from '@/modules/workspaces/hooks/workspace-id';

export default function workspaceId() {
  const workspaceId = UseWorkspaceId();

  return <div>My Post: {workspaceId}</div>;
}
