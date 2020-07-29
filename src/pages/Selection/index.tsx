import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Select from 'react-select';
import { produce } from 'immer';
import { FiTrash2, GrEdit, FiSave } from 'react-icons/all';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { useNavigation } from '../../context/NavigationContext';
import { useSelection } from '../../context/SelectionContext';

import List from '../../components/List';

import { Container, SelectionPanel } from './styles';

interface SelectOptions {
  value?: string;
  label: string;
}

const Selection: React.FC = () => {
  const { setPage } = useNavigation();
  const { selection, setSelection, clearSelection } = useSelection();
  const [options, setOptions] = useState<SelectOptions[]>([]);

  useEffect(() => setPage('selection'), [setPage]);

  const isEmpty = useMemo(() => selection.content.length === 0, [selection]);

  const handleOptionChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newOption: any) => {
      api.get(`/selections/${newOption.value}`).then(response => {
        setSelection(response.data);
      });
    },
    [setSelection],
  );

  const handleEditName = useCallback(() => {
    // eslint-disable-next-line no-alert
    const newName = window.prompt(
      'Enter new name',
      selection.name || 'untitled',
    );
    if (newName) {
      setSelection(
        produce(selection, draft => {
          draft.name = newName;
          draft.edited = true;
        }),
      );

      const currentOptionIndex = options.findIndex(
        option => option.value === selection.id,
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
            draft.push({ value: selection.id, label: newName });
          }),
        );
      }
    }
    return newName;
  }, [selection, setSelection, options]);

  const handleSave = useCallback(() => {
    const name = selection.name || handleEditName();
    if (!name) {
      toast.warning('Canceled');
      return;
    }

    api
      .post('/selections', {
        id: selection.id,
        name,
        content: selection.content,
      })
      .then(() => {
        toast.success('Created');
      });
  }, [handleEditName, selection]);

  useEffect(() => {
    api.get('/selections').then(response => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selections = response.data.map(
        (option: { id: any; name: any }) => ({
          value: option.id,
          label: option.name,
        }),
      );
      setOptions(selections);
    });
  }, []);

  return (
    <Container>
      <SelectionPanel isEmpty={isEmpty}>
        <strong>Selection editor</strong>
        <Select
          options={options}
          onChange={handleOptionChange}
          // value={{ value: selection.id, label: selection.name || '+ New' }}
        />
        <button type="button" id="edit" onClick={handleEditName}>
          <GrEdit />
        </button>
        <button type="button" id="other" className="save" onClick={handleSave}>
          <FiSave />
          Save
        </button>

        <button
          type="button"
          id="other"
          className="clear-all"
          onClick={clearSelection}
        >
          <FiTrash2 size={20} />
        </button>
      </SelectionPanel>
      <List items={selection.content} type="select" />
    </Container>
  );
};

export default Selection;
