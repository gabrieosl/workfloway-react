import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { MdAdd, FiSend, MdCancel } from 'react-icons/all';

import api from '../../services/api';

import { useSelection } from '../../hooks/selection';
import { useBase } from '../../hooks/base';

import { Container, FloatingCard } from './styles';

interface SelectOptions {
  value?: string;
  label: string;
}

interface CreateObservationProps {
  initialTypeSelectedId?: string;
}

const CreateObservation: React.FC<CreateObservationProps> = ({
  initialTypeSelectedId = '',
}) => {
  const { selectedSubjectIds } = useSelection();
  const { types, getNameById } = useBase();
  const { path } = useRouteMatch();

  const [showCard, setShowCard] = useState(false);
  const [selectedType, setSelectedType] = useState<SelectOptions>(
    {} as SelectOptions,
  );
  const [value, setValue] = useState('');
  const [comment, setComment] = useState('');

  const showSelfWhenFloating = useMemo(() => path === '/dashboard', [path]);

  const options = useMemo<SelectOptions[]>(() => {
    return types.map(type => {
      return { value: type.id, label: type.name };
    });
  }, [types]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOptionChange = useCallback((newOption: any) => {
    setSelectedType(newOption);
  }, []);

  const handleObsValueChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const handleObsCommentChange = useCallback(e => {
    setComment(e.target.value);
  }, []);

  const toogleShowCard = useCallback(() => {
    setShowCard(!showCard);
  }, [showCard]);

  const isAnySelected = useMemo(() => !!selectedSubjectIds.length, [
    selectedSubjectIds,
  ]);

  const numberOfSelected = useMemo(() => selectedSubjectIds.length, [
    selectedSubjectIds,
  ]);

  const handleSubmit = useCallback(async () => {
    const params = {
      value,
      comment,
      type_id: selectedType.value,
      subject_ids: selectedSubjectIds,
    };

    const response = await api.post('/observations', params);
    if (response.status === 201) {
      toast.success('Created!');
      // window.location.reload(false);
    } else {
      toast.error('Error!');
    }
  }, [comment, selectedSubjectIds, selectedType.value, value]);

  useEffect(() => {
    setSelectedType({
      value: initialTypeSelectedId || '',
      // TODO improve next line
      label: getNameById(initialTypeSelectedId, 'types') || 'Select type',
    });
  }, [getNameById, initialTypeSelectedId]);

  return (
    <>
      <Container
        onClick={toogleShowCard}
        showCard={showCard}
        isAnySelected={isAnySelected}
        showSelfWhenFloating={showSelfWhenFloating}
      >
        {showCard ? <FiSend /> : <MdAdd />}
        {!showCard && numberOfSelected > 0 && <span>{numberOfSelected}</span>}
      </Container>
      {showCard && (
        <FloatingCard showCard={showCard}>
          <aside>
            <h2>Add Observation</h2>
            <button type="button" onClick={toogleShowCard}>
              <MdCancel />
            </button>
          </aside>
          <Select
            options={options}
            onChange={handleOptionChange}
            value={selectedType}
          />
          <input
            type="text"
            value={value}
            placeholder="Value"
            onChange={handleObsValueChange}
          />
          <input
            type="text"
            value={comment}
            placeholder="Comment"
            onChange={handleObsCommentChange}
          />
          <section />
          <hr />
          <h3>{`To ${numberOfSelected} products`}</h3>
          <button
            type="button"
            className="submit-observation"
            onClick={handleSubmit}
          >
            <MdAdd />
            Add
          </button>
        </FloatingCard>
      )}
    </>
  );
};

export default CreateObservation;
