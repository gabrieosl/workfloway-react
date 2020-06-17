import React, {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { produce } from 'immer';

interface WorkflowItemData {
  id: string;
  typeId?: string;
  name: string;
}

interface WorkflowData {
  id?: string;
  content: WorkflowItemData[];
  edited: boolean;
  name?: string;
}

interface ContextData {
  workflow: WorkflowData;
  setWorkflow(workflow: WorkflowData): void;
  updateItem(item: WorkflowItemData, beforeItem: WorkflowItemData): void;
  pushItem(item: WorkflowItemData, beforeItem: WorkflowItemData): void;
  removeItem(id: string): void;
}

const WorkflowContext = createContext<ContextData>({} as ContextData);

const WorkflowProvider: React.FC = ({ children }) => {
  const [workflow, setWorkflow] = useState<WorkflowData>({
    id: undefined,
    name: undefined,
    content: [],
    edited: false,
  });

  const updateItem = useCallback(
    (item, beforeItem) => {
      setWorkflow(
        produce(workflow, draft => {
          const itemIndex = draft.content.findIndex(wf => wf.id === item.id);
          draft.content.splice(itemIndex, 1);
          draft.edited = true;
          if (beforeItem.id === 'end') {
            draft.content.push(item);
            return;
          }
          const beforeItemIndex = draft.content.findIndex(
            wf => wf.id === beforeItem.id,
          );
          draft.content.splice(beforeItemIndex, 0, item);
        }),
      );
    },
    [workflow],
  );

  const removeItem = useCallback(
    id => {
      setWorkflow(
        produce(workflow, draft => {
          const itemIndex = draft.content.findIndex(wf => wf.id === id);
          draft.content.splice(itemIndex, 1);
          draft.edited = true;
        }),
      );
    },
    [workflow],
  );

  const pushItem = useCallback(
    (item, beforeItem) => {
      setWorkflow(
        produce(workflow, draft => {
          const beforeItemIndex = draft.content.findIndex(
            wf => wf.id === beforeItem.id,
          );
          if (beforeItemIndex === 0) {
            draft.content.splice(0, 0, item);
          } else if (beforeItemIndex > 0) {
            draft.content.splice(beforeItemIndex, 0, item);
          } else {
            draft.content.push(item);
          }
          draft.edited = true;
        }),
      );
    },
    [workflow],
  );

  return (
    <WorkflowContext.Provider
      value={{
        workflow,
        setWorkflow,
        updateItem,
        pushItem,
        removeItem,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

function useWorkflow(): ContextData {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within WorkflowProvider');
  }

  return context;
}

export { WorkflowProvider, useWorkflow };
