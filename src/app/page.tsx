'use client';

import { useEffect, useMemo } from 'react';
import AuthUserButton from '@/modules/auth/components/auth-user-button';
import { useGetWorkspacesApi } from '@/modules/workspaces/api/get-workspaces';
import { useCreateWorkspaceModalStore } from '@/modules/workspaces/store/create-workspace-modal';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data, isPending } = useGetWorkspacesApi();
  const { isOpen, onOpen } = useCreateWorkspaceModalStore();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (workspaceId) {
      router.replace(`/workspace/${data?.[0]?._id}`);
    } else if (!isOpen) {
      onOpen();
      console.log('Open creation modal');
      console.log(isOpen);
    }
  }, [data, isPending, workspaceId, isOpen, onOpen, router]);

  return (
    <div className="p-5">
      <AuthUserButton />
    </div>
  );
}
