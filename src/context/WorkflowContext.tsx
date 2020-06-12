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

interface ContextData {
  workflow: WorkflowItemData[];
  updateItem(item: WorkflowItemData, beforeItem: WorkflowItemData): void;
  pushItem(item: WorkflowItemData, beforeItem: WorkflowItemData): void;
  removeItem(id: string): void;
}

const WorkflowContext = createContext<ContextData>({} as ContextData);

const WorkflowProvider: React.FC = ({ children }) => {
  const [workflow, setWorkflow] = useState<WorkflowItemData[]>(() => {
    const wf = localStorage.getItem('@Workfloway:currentWorkflow');
    if (wf) {
      return JSON.parse(wf);
    }
    return [
      {
        id: '111',
        typeId: 'af6d66dd-0512-4ada-bd52-b753af3baccd',
        name: 'Recolher no Cliente',
      },
      {
        id: '222',
        typeId: '5ffa7d0c-0b3e-447d-b7ad-24219d4e4a24',
        name: 'Guardar no TB',
      },
      {
        id: '333',
        typeId: '59d6a0bc-3f25-47bb-9726-c9dae9510e6e',
        name: 'CV Realizada',
      },
    ];
  });

  const updateItem = useCallback(
    (item, beforeItem) => {
      setWorkflow(
        produce(workflow, draft => {
          const itemIndex = draft.findIndex(wf => wf.id === item.id);
          draft.splice(itemIndex, 1);
          if (beforeItem.id === 'end') {
            draft.push(item);
            return;
          }
          const beforeItemIndex = draft.findIndex(
            wf => wf.id === beforeItem.id,
          );
          draft.splice(beforeItemIndex, 0, item);
        }),
      );
    },
    [workflow],
  );

  const removeItem = useCallback(
    id => {
      setWorkflow(
        produce(workflow, draft => {
          const itemIndex = draft.findIndex(wf => wf.id === id);
          draft.splice(itemIndex, 1);
        }),
      );
    },
    [workflow],
  );

  const pushItem = useCallback(
    (item, beforeItem) => {
      setWorkflow(
        produce(workflow, draft => {
          const beforeItemIndex = draft.findIndex(
            wf => wf.id === beforeItem.id,
          );
          if (beforeItemIndex === 0) {
            draft.splice(0, 0, item);
          } else if (beforeItemIndex > 0) {
            draft.splice(beforeItemIndex, 0, item);
          } else {
            draft.push(item);
          }
        }),
      );
    },
    [workflow],
  );

  useEffect(() => {
    localStorage.setItem(
      '@Workfloway:currentWorkflow',
      JSON.stringify(workflow),
    );
  }, [workflow]);

  return (
    <WorkflowContext.Provider
      value={{ workflow, updateItem, pushItem, removeItem }}
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
