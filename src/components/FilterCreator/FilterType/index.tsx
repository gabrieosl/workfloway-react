/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useMemo, useCallback } from 'react';

import {
  FiFilter,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdAdd,
  FiTrash,
} from 'react-icons/all';
import { Container, FilterTypePopup } from './styles';

interface FilterData {
  type: string;
  id: string;
  value?: string;
}

interface FilterTypeProps {
  filters: FilterData[];
  type: string;
  selectedFilter?: string;
  askFocus(type: string): void;
  addFilter(type: string, id: string, value?: string): void;
  removeFilter(index: number): void;
  options?: {
    id: string;
    name: string;
  }[];
  hasValue?: boolean;
}

const FilterType: React.FC<FilterTypeProps> = ({
  filters,
  type,
  selectedFilter,
  askFocus,
  addFilter,
  removeFilter,
  options,
  hasValue,
}) => {
  const [currentEditingId, setCurrentEditingId] = useState(type);
  const [inputValue, setInputValue] = useState('');

  const showFilterPopup = useMemo(() => selectedFilter === type, [
    selectedFilter,
    type,
  ]);

  const isCurrentlyEditing = useCallback(id => currentEditingId === id, [
    currentEditingId,
  ]);

  const selectOption = useCallback(
    id => {
      if (hasValue) {
        setCurrentEditingId(prev => {
          setInputValue('');
          if (prev === id) return type;
          return id;
        });
        return;
      }
      addFilter(type, id);
    },
    [addFilter, hasValue, type],
  );

  const hasActiveFiltersWithType = useMemo(
    () => !!filters.find(filter => filter.type === type),
    [filters, type],
  );

  const hasActiveFiltersWithId = useCallback(
    id => !!filters.find(filter => filter.id === id),
    [filters],
  );

  const getActiveFiltersWithId = useCallback(
    id =>
      filters.reduce((prev, curr, index) => {
        if (curr.id === id) prev.push([curr.value || '', index]);
        return prev;
      }, [] as [string, number][]),
    [filters],
  );

  return (
    <Container hasActiveFiltersWithType={hasActiveFiltersWithType}>
      <button
        type="button"
        className="filter-type"
        onClick={() => askFocus(type)}
      >
        <FiFilter />
        <span>{type}</span>
        {showFilterPopup ? (
          <MdKeyboardArrowUp size={10} />
        ) : (
          <MdKeyboardArrowDown size={10} />
        )}
      </button>
      {showFilterPopup && (
        <FilterTypePopup>
          <div className="option-wrapper">
            {options && options.length ? (
              options.map(option => (
                <div key={option.id} className="option">
                  <div
                    className="option-button"
                    onClick={() => selectOption(option.id)}
                  >
                    {hasActiveFiltersWithId(option.id) && <FiFilter />}
                    <span>{option.name}</span>
                    {hasValue ? (
                      <button type="button" className="option-action">
                        {isCurrentlyEditing(option.id) ? (
                          <MdKeyboardArrowUp />
                        ) : (
                          <MdKeyboardArrowDown />
                        )}
                      </button>
                    ) : (
                      <button type="button" className="option-action">
                        {hasActiveFiltersWithId(option.id) ? (
                          <FiTrash color="#b30000" />
                        ) : (
                          <MdAdd />
                        )}
                      </button>
                    )}
                  </div>
                  {isCurrentlyEditing(option.id) && (
                    <div className="option-active">
                      {getActiveFiltersWithId(option.id).map(filter => (
                        <button
                          key={filter[1]}
                          type="button"
                          className="filter-active"
                          onClick={() => removeFilter(filter[1])}
                        >
                          <span>{filter[0]}</span>
                          <FiTrash />
                        </button>
                      ))}
                      <div className="new-input-button">
                        <input
                          type="text"
                          className="input"
                          value={inputValue}
                          onChange={e => setInputValue(e.target.value)}
                          placeholder="Novo filtro"
                        />
                        <button
                          type="button"
                          className="new-filter"
                          onClick={() =>
                            addFilter(type, currentEditingId, inputValue)
                          }
                        >
                          <MdAdd />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="option-active">
                {getActiveFiltersWithId(type).map(filter => (
                  <button
                    key={filter[1]}
                    type="button"
                    className="filter-active"
                    onClick={() => removeFilter(filter[1])}
                  >
                    <span>{filter[0]}</span>
                    <FiTrash />
                  </button>
                ))}
                <div className="new-input-button">
                  <input
                    type="text"
                    className="input"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Novo filtro"
                  />
                  <button
                    type="button"
                    className="new-filter"
                    onClick={() => addFilter(type, type, inputValue)}
                  >
                    <MdAdd />
                  </button>
                </div>
              </div>
            )}
          </div>
        </FilterTypePopup>
      )}
    </Container>
  );
};

export default FilterType;
