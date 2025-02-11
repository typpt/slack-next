'use client';

import { useGetByIdWorkspaceApi } from '@/modules/workspaces/api/get-by-id-workspace';
import { useWorkspaceId } from '@/modules/workspaces/hooks/workspace-id';
import { Button } from '@/components/ui/button';
import { InfoIcon, SearchIcon } from 'lucide-react';

export default function Toolbar() {
  const workspaceId = useWorkspaceId();
  const { data } = useGetByIdWorkspaceApi({ id: workspaceId });

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[17.5rem] max-[40rem] grow-[2] shrink">
        <Button className="bg-accent/25 w-full h-7 justify-start hover:bg-accent/25">
          <SearchIcon className="size-4 text-white" />
          <span className="text-white text-xs">Search {data?.name}</span>
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <Button variant="transparent" size="sm">
          <InfoIcon className="size-5" />
        </Button>
      </div>
    </nav>
  );
}
