import React, { useState, createContext, useContext, useCallback } from 'react';
import produce from 'immer';

interface ItemData {
  id: string;
  name: string;
  lastObservation?: {
    type_id: string;
    created_at: Date;
    user: {
      name: string;
    };
  };
  lastSubmission?: {
    repetition: number;
  };
  tags: {
    tagId: string;
    value: string;
  }[];
}

interface ContextData {
  selection: ItemData[];
  addToSelection(item: ItemData[]): void;
  removeFromSelection(item: ItemData[]): void;
  toogleSelection(item: ItemData): void;
  isSelected(id: string): boolean;
  clearSelection(): void;
}

const SelectionContext = createContext<ContextData>({} as ContextData);

const SelectionProvider: React.FC = ({ children }) => {
  const [selection, setSelection] = useState<ItemData[]>([]);

  const addToSelection = useCallback(
    (newItems: ItemData[]): void => {
      setSelection(
        produce(selection, draft => {
          newItems.forEach(newItem => {
            const index = draft.findIndex(item => item.id === newItem.id);
            if (index < 0) {
              draft.push(newItem);
            }
          });
          return draft;
        }),
      );
    },
    [selection],
  );

  const removeFromSelection = useCallback(
    (itemsToRemove: ItemData[]): void => {
      setSelection(
        produce(selection, draft => {
          itemsToRemove.map(itemToRemove => {
            const index = draft.findIndex(item => item.id === itemToRemove.id);
            if (index >= 0) {
              draft.splice(index, 1);
            }
          });
          return draft;
        }),
      );
    },
    [selection],
  );

  const toogleSelection = useCallback(
    (item: ItemData): void => {
      setSelection(
        produce(selection, draft => {
          const index = draft.findIndex(_item => _item.id === item.id);
          if (index >= 0) {
            draft.splice(index, 1);
          } else {
            draft.push(item);
          }
          return draft;
        }),
      );
    },
    [selection],
  );

  const isSelected = useCallback(
    (id: string): boolean => {
      const index = selection.findIndex(item => item.id === id);
      if (index >= 0) {
        return true;
      }
      return false;
    },
    [selection],
  );

  const clearSelection = useCallback(() => {
    setSelection([]);
  }, []);

  // TODO
  // add filter

  return (
    <SelectionContext.Provider
      value={{
        selection,
        addToSelection,
        removeFromSelection,
        toogleSelection,
        isSelected,
        clearSelection,
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
