import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { FiSave, FiPlus, GrEdit } from 'react-icons/all';
import produce from 'immer';
import { useNavigation } from '../../context/NavigationContext';
import { useWorkflow } from '../../context/WorkflowContext';

import WorkflowEditor from '../../components/WorkflowEditor';

import { Container, WorkflowSelector } from './styles';
import api from '../../services/api';

interface SelectOptions {
  value?: string;
  label: string;
}

const Workflows: React.FC = () => {
  const { setPage } = useNavigation();
  const { workflow, setWorkflow } = useWorkflow();
  const [options, setOptions] = useState<SelectOptions[]>([]);

  useEffect(() => setPage('workflows'), [setPage]);

  const canSave = useMemo(
    () => !!(workflow.edited && workflow.content.length),
    [workflow],
  );

  useEffect(() => {
    api.get('/workflows').then(response => {
      const workflows = response.data.map((option: { id: any; name: any }) => ({
        value: option.id,
        label: option.name,
      }));
      setOptions(workflows);
    });
  }, []);

  const handleEditName = useCallback(() => {
    const newName = window.prompt(
      'Enter new name',
      workflow.name || 'untitled',
    );
    if (newName) {
      setWorkflow(
        produce(workflow, draft => {
          draft.name = newName;
          draft.edited = true;
        }),
      );

      const currentOptionIndex = options.findIndex(
        option => option.value === workflow.id,
      );

      if (currentOptionIndex > 0) {
        setOptions(
          produce(options, draft => {
            draft[currentOptionIndex].label = newName;
          }),
        );
      } else {
        setOptions(
          produce(options, draft => {
            draft.push({ value: workflow.id, label: newName });
          }),
        );
      }
    }
    return newName;
  }, [options, setWorkflow, workflow]);

  const handleOptionChange = useCallback(
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
    setWorkflow({ id: undefined, content: [], edited: false, name: undefined });
  }, [setWorkflow]);

  return (
    <Container>
      <WorkflowSelector>
        <strong>Workflow editor</strong>
        <Select
          options={options}
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
