import React, { useMemo, useState, useCallback, useEffect } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { MdAdd, FiSend, MdCancel } from 'react-icons/all';

import api from '../../services/api';

import { useSelection } from '../../hooks/selection';
import { useBase } from '../../hooks/base';

import { FloatingButton, FloatingCard } from './styles';

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

  const [showCard, setShowCard] = useState(false);
  const [selectedType, setSelectedType] = useState<SelectOptions>(
    {} as SelectOptions,
  );
  const [value, setValue] = useState('');
  const [comment, setComment] = useState('');

  const options = useMemo<SelectOptions[]>(() => {
    return types.reduce((all, current) => {
      all.push({ value: current.id, label: current.name });
      return all;
    }, [] as SelectOptions[]);
  }, [types]);

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

  const handleSubmit = useCallback(async () => {
    const params = {
      value,
      comment,
      type_id: selectedType.value,
      subject_ids: selectedSubjectIds,
    };
    console.log(params);

    const response = await api.post('/observations', params);
    if (response.status === 201) {
      toast.success('Created!');
      // window.location.reload(false);
    } else {
      toast.error('Error!');
    }
  }, [comment, selectedSubjectIds, selectedType.value, value]);

  const numberOfSelected = useMemo(() => selectedSubjectIds.length, [
    selectedSubjectIds,
  ]);

  useEffect(() => {
    setSelectedType({
      value: initialTypeSelectedId || '',
      // TODO improve next line
      label: getNameById(initialTypeSelectedId, 'types') || 'Select type',
    });
  }, [getNameById, initialTypeSelectedId]);

  return (
    <>
      <FloatingButton
        onClick={showCard ? handleSubmit : toogleShowCard}
        showCard={showCard}
        isAnySelected={isAnySelected}
      >
        {showCard ? <FiSend /> : <MdAdd />}
        {!showCard && numberOfSelected > 0 && <span>{numberOfSelected}</span>}
      </FloatingButton>
      {showCard && (
        <FloatingCard>
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
          <div>
            {selectedSubjectIds.map(item => (
              <p>{item}</p>
            ))}
          </div>
        </FloatingCard>
      )}
    </>
  );
};

export default CreateObservation;
