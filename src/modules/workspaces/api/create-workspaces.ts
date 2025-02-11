import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useCallback, useMemo, useState } from 'react';
import { Doc } from '../../../../convex/_generated/dataModel';

type ResponseType = Doc<'workspaces'>;
type RequestType = { name: string };

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export function useCreateWorkspacesApi() {
  const mutation = useMutation(api.workspaces.createWorkspaces);

  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    'success' | 'error' | 'settled' | 'pending' | null
  >(null);

  const isPending = useMemo(() => status === 'pending', [status]);
  const isError = useMemo(() => status === 'error', [status]);
  const isSuccess = useMemo(() => status === 'success', [status]);
  const isSettled = useMemo(() => status === 'settled', [status]);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus('pending');

        const response = await mutation(values);
        options?.onSuccess?.(response);
        return response;
      } catch (err) {
        options?.onError?.(err as Error);

        if (options?.throwError) {
          throw err;
        }
      } finally {
        setStatus('settled');
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
}
