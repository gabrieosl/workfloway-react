import React, { useState, createContext, useContext, useCallback } from 'react';
import produce from 'immer';

interface SubjectData {
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

interface SelectionState {
  id?: string;
  name?: string;
  subjectIds: string[];
  subjects: SubjectData[];
  edited?: boolean;
}

interface ContextData {
  selectedSubjectIds: string[];
  selectedSubjects: SubjectData[];
  selection: SelectionState;
  setSelection(state: SelectionState): void;
  isSelected(id: string): boolean;
  addToSelection(item: SubjectData[]): void;
  removeFromSelection(item: SubjectData[]): void;
  toogleSelection(item: SubjectData): void;
  clearSelection(): void;
}

const SelectionContext = createContext<ContextData>({} as ContextData);

const SelectionProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<SelectionState>({
    subjectIds: [],
    subjects: [],
  });

  const isSelected = useCallback(
    (id: string): boolean => {
      const index = data.subjectIds.findIndex(subjectId => subjectId === id);
      if (index >= 0) {
        return true;
      }
      return false;
    },
    [data],
  );

  const getSubjectIdIndex = useCallback(
    (id: string): number => {
      return data.subjectIds.findIndex(subjectId => subjectId === id);
    },
    [data],
  );

  const addToSelection = useCallback(
    (newItems: SubjectData[]): void => {
      setData(
        produce(data, draft => {
          newItems.forEach(newItem => {
            if (!isSelected(newItem.id)) {
              draft.subjectIds.push(newItem.id);
              draft.subjects.push(newItem);
              draft.edited = true;
            }
          });
          return draft;
        }),
      );
    },
    [data, isSelected],
  );

  const removeFromSelection = useCallback(
    (itemsToRemove: SubjectData[]): void => {
      setData(
        produce(data, draft => {
          itemsToRemove.forEach(itemToRemove => {
            const index = getSubjectIdIndex(itemToRemove.id);
            if (index >= 0) {
              draft.subjectIds.splice(index, 1);
              draft.subjects = draft.subjects.filter(subject =>
                draft.subjectIds.includes(subject.id),
              );
              draft.edited = true;
            }
            return draft;
          });
          return draft;
        }),
      );
    },
    [data, getSubjectIdIndex],
  );

  const toogleSelection = useCallback(
    (item: SubjectData): void => {
      setData(
        produce(data, draft => {
          const index = getSubjectIdIndex(item.id);
          if (index >= 0) {
            draft.subjectIds.splice(index, 1);
            draft.subjects = draft.subjects.filter(subject =>
              draft.subjectIds.includes(subject.id),
            );
          } else {
            draft.subjectIds.push(item.id);
            draft.subjects.push(item);
          }
          draft.edited = true;
          return draft;
        }),
      );
    },
    [data, getSubjectIdIndex],
  );

  const clearSelection = useCallback(() => {
    setData({
      subjectIds: [],
      subjects: [],
    });
  }, []);

  // TODO
  // add filter

  return (
    <SelectionContext.Provider
      value={{
        selectedSubjectIds: data.subjectIds,
        selectedSubjects: data.subjects,
        selection: data,
        setSelection: setData,
        isSelected,
        addToSelection,
        removeFromSelection,
        toogleSelection,
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
