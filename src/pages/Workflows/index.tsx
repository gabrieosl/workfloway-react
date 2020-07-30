import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { FiSave, FiPlus, GrEdit } from 'react-icons/all';
import produce from 'immer';
import { useWorkflow } from '../../hooks/workflow';

import WorkflowEditor from '../../components/WorkflowEditor';

import { Container, WorkflowSelector } from './styles';
import api from '../../services/api';

interface SelectOptions {
  value?: string;
  label: string;
}

const Workflows: React.FC = () => {
  const {
    workflow,
    setWorkflowName,
    setWorkflow,
    clearWorkflow,
  } = useWorkflow();

  const [workflows, setWorkflows] = useState<SelectOptions[]>([]);

  const getWorkflows = useCallback((): void => {
    api.get<{ id: string; name: string }[]>('/workflows').then(response => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedToOptionsWorkflows = response.data.map(option => ({
        value: option.id,
        label: option.name,
      }));
      setWorkflows(parsedToOptionsWorkflows);
    });
  }, []);

  useEffect(() => {
    getWorkflows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canSave = useMemo(
    () => !!(workflow.hasUnsavedChanges && workflow.content.length),
    [workflow],
  );

  const handleEditName = useCallback(() => {
    // eslint-disable-next-line no-alert
    const newName = window.prompt(
      'Enter new name',
      workflow.name || 'untitled',
    );
    if (newName) {
      setWorkflowName(newName);

      const currentOptionIndex = workflows.findIndex(
        option => option.value === workflow.id,
      );

      if (currentOptionIndex > 0) {
        setWorkflows(
          produce(workflows, draft => {
            draft[currentOptionIndex].label = newName;
          }),
        );
      } else {
        setWorkflows(
          produce(workflows, draft => {
            draft.push({ value: workflow.id, label: newName });
          }),
        );
      }
      return newName;
    }
  }, [workflow.name, workflow.id, setWorkflowName, workflows]);

  const handleOptionChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newOption: any) => {
      api.get(`/workflows/${newOption.value}`).then(response => {
        setWorkflow(response.data);
      });
    },
    [setWorkflow],
  );

  const handleSave = useCallback(() => {
    if (!workflow.id) {
      const name = workflow.name || handleEditName();
      if (!name) {
        toast.warning('Canceled');
        return;
      }

      api
        .post('/workflows', { name, content: workflow.content })
        .then(response => {
          setWorkflow(response.data);
          toast.success('Created');
        });
    } else {
      api
        .put(`/workflows/${workflow.id}`, {
          name: workflow.name,
          content: workflow.content,
        })
        .then(response => {
          setWorkflow(response.data);
          toast.success('Updated');
        });
    }
  }, [handleEditName, setWorkflow, workflow]);

  const handleNew = useCallback(() => {
    clearWorkflow();
  }, [clearWorkflow]);

  return (
    <Container>
      <WorkflowSelector>
        <strong>Workflow editor</strong>
        <Select
          options={workflows}
          onChange={handleOptionChange}
          value={{ value: workflow.id, label: workflow.name || '+ New' }}
        />
        <button type="button" id="edit" onClick={handleEditName}>
          <GrEdit />
        </button>
        <button
          type="button"
          id="other"
          className={canSave ? 'save' : 'save-disabled'}
          onClick={canSave ? handleSave : () => null}
        >
          {canSave && <span />}
          <FiSave />
          Save
        </button>
        <button type="button" id="other" className="new" onClick={handleNew}>
          <FiPlus />
          New
        </button>
      </WorkflowSelector>
      <WorkflowEditor />
    </Container>
  );
};

export default Workflows;
