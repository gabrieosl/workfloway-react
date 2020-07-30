import React, { useState, createContext, useCallback, useContext } from 'react';
import { produce } from 'immer';

interface WorkflowItemData {
  id: string;
  typeId?: string;
  name: string;
  mustExistBeforeNext?: boolean;
}

interface WorkflowData {
  id?: string;
  name?: string;
  hasUnsavedChanges?: boolean;
  content: WorkflowItemData[];
}

interface ContextData {
  workflow: WorkflowData;
  setWorkflow(newWorkflow: WorkflowData): void;
  setWorkflowName(newName: string): void;
  updateWorkflowItem(
    item: WorkflowItemData,
    beforeItem: WorkflowItemData,
    mustExistBeforeNext?: boolean,
  ): void;
  pushWorkflowItem(
    item: WorkflowItemData,
    beforeItem: WorkflowItemData,
    mustExistBeforeNext?: boolean,
  ): void;
  removeWorkflowItem(id: string): void;
  clearWorkflow(): void;
}

const WorkflowContext = createContext<ContextData>({} as ContextData);

const WorkflowProvider: React.FC = ({ children }) => {
  const [workflow, setWorkflow] = useState<WorkflowData>({
    content: [],
    hasUnsavedChanges: false,
  });

  const setWorkflowName = useCallback(
    (newName: string) => {
      setWorkflow(
        produce(workflow, draft => {
          draft.name = newName;
          draft.hasUnsavedChanges = true;
          return draft;
        }),
      );
    },
    [workflow],
  );

  const updateWorkflowItem = useCallback(
    (item: WorkflowItemData, beforeItem: WorkflowItemData): void => {
      setWorkflow(
        produce(workflow, draft => {
          const itemIndex = draft.content.findIndex(wf => wf.id === item.id);
          if (itemIndex < 0) return draft;

          draft.content.splice(itemIndex, 1);
          draft.hasUnsavedChanges = true;
          if (beforeItem.id === 'end') {
            draft.content.push(item);
            return draft;
          }
          const beforeItemIndex = draft.content.findIndex(
            wf => wf.id === beforeItem.id,
          );
          draft.content.splice(beforeItemIndex, 0, item);
          return draft;
        }),
      );
    },
    [workflow],
  );

  const removeWorkflowItem = useCallback(
    (id: string) => {
      setWorkflow(
        produce(workflow, draft => {
          const itemIndex = draft.content.findIndex(wf => wf.id === id);
          if (itemIndex < 0) return draft;
          draft.content.splice(itemIndex, 1);
          draft.hasUnsavedChanges = true;
          return draft;
        }),
      );
    },
    [workflow],
  );

  const pushWorkflowItem = useCallback(
    (item: WorkflowItemData, beforeItem: WorkflowItemData) => {
      console.log('item', item);
      console.log('beforeItem', beforeItem);

      setWorkflow(prev =>
        produce(prev, draft => {
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
          draft.hasUnsavedChanges = true;
          return draft;
        }),
      );
    },
    [],
  );

  const clearWorkflow = useCallback(() => {
    setWorkflow({
      content: [],
      hasUnsavedChanges: false,
    });
  }, []);

  return (
    <WorkflowContext.Provider
      value={{
        workflow,
        setWorkflow,
        setWorkflowName,
        updateWorkflowItem,
        pushWorkflowItem,
        removeWorkflowItem,
        clearWorkflow,
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
