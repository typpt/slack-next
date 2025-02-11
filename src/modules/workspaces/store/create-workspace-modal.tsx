'use client';

import { createContext, useContext, useState } from 'react';

type State = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const CreateWorkspaceModal = createContext<State | null>(null);

export default function CreateWorkspaceModalProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(!isOpen);
  }

  function onClose() {
    setIsOpen(!isOpen);
  }

  return (
    <CreateWorkspaceModal.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
    </CreateWorkspaceModal.Provider>
  );
}

export function useCreateWorkspaceModalStore() {
  const context = useContext(CreateWorkspaceModal);

  if (!context) {
    throw new Error('Context create workspace modal not found');
  }

  return context;
}
