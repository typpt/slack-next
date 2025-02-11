import Toolbar from './toolbar';

export default function WorkspaceIdLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-full">
      <Toolbar />
      {children}
    </div>
  );
}
