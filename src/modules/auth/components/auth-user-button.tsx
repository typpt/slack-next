'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoaderIcon, LogInIcon } from 'lucide-react';
import { useGetUsersApi } from '../api/get-users';

export default function AuthUserButton() {
  const { data, isPending } = useGetUsersApi();
  const { signOut } = useAuthActions();

  if (isPending) {
    return <LoaderIcon className="size-5 animate-spin text-muted-foreground" />;
  }

  if (!data) return null;

  const { name, image } = data;
  const nameFallback = name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-50 transition">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="text-base font-medium">
            {nameFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-60">
        <DropdownMenuItem onClick={() => void signOut()}>
          <LogInIcon />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
