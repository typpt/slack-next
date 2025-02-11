import CreateWorkspaceModalProvider from '@/modules/workspaces/store/create-workspace-modal';

export default function ContextProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CreateWorkspaceModalProvider>{children}</CreateWorkspaceModalProvider>
    </>
  );
}
