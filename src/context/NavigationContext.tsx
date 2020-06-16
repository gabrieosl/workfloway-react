import React, { useState, createContext, useCallback, useContext } from 'react';
import { produce } from 'immer';

interface NavigationState {
  page: string;
  subpage: string;
}

interface ContextData {
  page: string;
  subpage: string;
  setPage(_page: string): void;
  setSubpage(_subpage: string): void;
}

const NavigationContext = createContext<ContextData>({} as ContextData);

export const NavigationProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<NavigationState>({
    page: 'dashboard',
    subpage: '',
  });

  const setPage = useCallback((_page: string) => {
    setData(prev =>
      produce(prev, draft => {
        draft.page = _page;
        return draft;
      }),
    );
  }, []);

  const setSubpage = useCallback((_subpage: string) => {
    setData(prev => {
      prev.subpage = _subpage;
      return prev;
    });
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        page: data.page,
        subpage: data.subpage,
        setPage,
        setSubpage,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigation(): ContextData {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }

  return context;
}
