'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetByIdWorkspaceApi } from '@/modules/workspaces/api/get-by-id-workspace';
import { useGetWorkspacesApi } from '@/modules/workspaces/api/get-workspaces';
import { useWorkspaceId } from '@/modules/workspaces/hooks/workspace-id';
import { useCreateWorkspaceModalStore } from '@/modules/workspaces/store/create-workspace-modal';
import { LoaderIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Switcher() {
  const id = useWorkspaceId();
  const { data: workspaceId, isPending } = useGetByIdWorkspaceApi({ id });
  const { data: workspaces } = useGetWorkspacesApi();

  const fillteredWorkdpace = workspaces?.filter(
    (workspace) => workspace?._id !== workspaceId?._id
  );

  const router = useRouter();

  const { onOpen } = useCreateWorkspaceModalStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ababad] hover:bg-[#ababad]/80 font-semibold text-slate-800 text-xl">
          {isPending ? (
            <LoaderIcon className="size-5 animate-spin shrink-0" />
          ) : (
            workspaceId?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-60">
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${id}`)}
          className="cursor-pointer flex flex-col items-start justify-start capitalize"
        >
          <span>{workspaceId?.name}</span>
          <span className="text-xs text-muted-foreground">
            Active workspace
          </span>
        </DropdownMenuItem>
        {fillteredWorkdpace?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="capitalize cursor-pointer overflow-hidden"
            onClick={() => router.push(`/workspace/${workspace?._id}`)}
          >
            <div className="size-7 relative overflow-hidden bg-[#616061] text-white font-medium text-lg rounded-md flex items-center justify-center ">
              {workspace?.name.charAt(0).toUpperCase()}
            </div>
            <span className="truncate">{workspace?.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={onOpen} className="cursor-pointer">
          <div className="size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center">
            <PlusIcon />
          </div>
          <span>Create a new workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
