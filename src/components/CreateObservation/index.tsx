import React, { useMemo, useState, useCallback, useEffect } from 'react';
import Select from 'react-select';

import { MdAdd, FiSend, MdCancel } from 'react-icons/all';

import { useSelection } from '../../context/SelectionContext';
import { useTypes } from '../../context/TypesContext';

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
  const { selection } = useSelection();
  const { types, getTypeName } = useTypes();

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

  const isAnySelected = useMemo(() => !!selection.length, [selection]);

  const handleSubmit = useCallback(() => {
    console.log(value, comment, selectedType.value);
  }, [comment, selectedType.value, value]);

  const numberOfSelected = useMemo(() => selection.length, [selection]);

  useEffect(() => {
    setSelectedType({
      value: initialTypeSelectedId || '',
      // TODO improve next line
      label: getTypeName(initialTypeSelectedId) || 'Select type',
    });
  }, [getTypeName, initialTypeSelectedId]);

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
            {selection.map(item => (
              <p>{item.name}</p>
            ))}
          </div>
        </FloatingCard>
      )}
    </>
  );
};

export default CreateObservation;
