'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateWorkspaceModalStore } from '../store/create-workspace-modal';
import { useForm } from 'react-hook-form';
import {
  createWorkspaceSchema,
  CreateWorkspaceSchema,
} from '../validation/create-workspace-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateWorkspacesApi } from '../api/create-workspaces';
import { useRouter } from 'next/navigation';

export default function WorkspaceCreateModal() {
  const form = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate, isPending } = useCreateWorkspacesApi();
  const { isOpen, onClose } = useCreateWorkspaceModalStore();
  const router = useRouter();

  function onSubmit(values: CreateWorkspaceSchema) {
    const { name } = values;

    mutate(
      { name },
      {
        onSuccess: (data) => {
          console.log(data?._id);
        },
      }
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder='Workspace name e.g. "Work", "Personal", "Home"'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-start gap-x-3">
              <Button disabled={isPending} type="submit" size="sm">
                Create
              </Button>
              <Button
                disabled={isPending}
                onClick={onClose}
                type="button"
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
