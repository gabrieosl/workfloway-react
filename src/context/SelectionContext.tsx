import React, { useState, createContext, useContext, useCallback } from 'react';
import produce from 'immer';

import ObjectId from '../utils/mongoIdGenerator';

interface SelectionItemData {
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

interface SelectionData {
  id?: string;
  content: SelectionItemData[];
  edited?: boolean;
  name?: string;
}

interface ContextData {
  selection: SelectionData;
  setSelection(selection: SelectionData): void;
  addToSelection(item: SelectionItemData[]): void;
  removeFromSelection(item: SelectionItemData[]): void;
  toogleSelection(item: SelectionItemData): void;
  isSelected(id: string): boolean;
  clearSelection(): void;
}

const SelectionContext = createContext<ContextData>({} as ContextData);

const SelectionProvider: React.FC = ({ children }) => {
  const [selection, setSelection] = useState<SelectionData>({
    id: ObjectId(),
    name: undefined,
    content: [],
    edited: false,
  });

  const addToSelection = useCallback(
    (newItems: SelectionItemData[]): void => {
      setSelection(
        produce(selection, draft => {
          newItems.forEach(newItem => {
            const index = draft.content.findIndex(
              item => item.id === newItem.id,
            );
            if (index < 0) {
              draft.content.push(newItem);
              draft.edited = true;
            }
          });
          return draft;
        }),
      );
    },
    [selection],
  );

  const removeFromSelection = useCallback(
    (itemsToRemove: SelectionItemData[]): void => {
      setSelection(
        produce(selection, draft => {
          itemsToRemove.map(itemToRemove => {
            const index = draft.content.findIndex(
              item => item.id === itemToRemove.id,
            );
            if (index >= 0) {
              draft.content.splice(index, 1);
              draft.edited = true;
            }
            return draft;
          });
          return draft;
        }),
      );
    },
    [selection],
  );

  const toogleSelection = useCallback(
    (item: SelectionItemData): void => {
      setSelection(
        produce(selection, draft => {
          const index = draft.content.findIndex(_item => _item.id === item.id);
          if (index >= 0) {
            draft.content.splice(index, 1);
          } else {
            draft.content.push(item);
          }
          draft.edited = true;
          return draft;
        }),
      );
    },
    [selection],
  );

  const isSelected = useCallback(
    (id: string): boolean => {
      const index = selection.content.findIndex(item => item.id === id);
      if (index >= 0) {
        return true;
      }
      return false;
    },
    [selection],
  );

  const clearSelection = useCallback(() => {
    setSelection({
      id: ObjectId(),
      name: undefined,
      content: [],
      edited: false,
    });
  }, []);

  // TODO
  // add filter

  return (
    <SelectionContext.Provider
      value={{
        selection,
        setSelection,
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
