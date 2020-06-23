import React, { useState, createContext, useContext, useCallback } from 'react';
import produce from 'immer';

interface ContextData {
  selection: string[];
  addToSelection(id: string): void;
  removeFromSelection(id: string): void;
  toogleSelection(id: string): void;
}

const SelectionContext = createContext<ContextData>({} as ContextData);

const SelectionProvider: React.FC = ({ children }) => {
  const [selection, setSelection] = useState<string[]>([]);

  const addToSelection = useCallback(
    (id: string): void => {
      setSelection(
        produce(selection, draft => {
          const index = draft.findIndex(mk => mk === id);
          if (index < 0) {
            draft.push(id);
          }
          return draft;
        }),
      );
    },
    [selection],
  );

  const removeFromSelection = useCallback(
    (id: string): void => {
      setSelection(
        produce(selection, draft => {
          const index = draft.findIndex(mk => mk === id);
          if (index >= 0) {
            draft.splice(index, 1);
          }
          return draft;
        }),
      );
    },
    [selection],
  );

  const toogleSelection = useCallback(
    (id: string): void => {
      setSelection(
        produce(selection, draft => {
          const index = draft.findIndex(mk => mk === id);
          if (index >= 0) {
            draft.splice(index, 1);
          } else {
            draft.push(id);
          }
          return draft;
        }),
      );
    },
    [selection],
  );

  // TODO
  // add filter

  return (
    <SelectionContext.Provider
      value={{
        selection,
        addToSelection,
        removeFromSelection,
        toogleSelection,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

function useSelection(): ContextData {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider');
  }

  return context;
}

export { SelectionProvider, useSelection };
