import { createContext, useContext, useState, useCallback } from 'react';

const FlashcardRefreshContext = createContext<{
  refreshTrigger: number;
  triggerRefresh: () => void;
} | undefined>(undefined);

export const FlashcardRefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const triggerRefresh = useCallback(() => setRefreshTrigger((n) => n + 1), []);

  return (
    <FlashcardRefreshContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </FlashcardRefreshContext.Provider>
  );
};

export const useFlashcardRefresh = () => {
  const ctx = useContext(FlashcardRefreshContext);
  return ctx?.triggerRefresh ?? (() => {});
};

export const useFlashcardRefreshTrigger = () => {
  const ctx = useContext(FlashcardRefreshContext);
  return ctx?.refreshTrigger ?? 0;
};
