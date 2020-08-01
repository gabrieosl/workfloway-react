import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { FiFilter, MdKeyboardArrowUp, MdAdd } from 'react-icons/all';

import produce from 'immer';
import { useBase } from '../../hooks/base';

import FilterType from './FilterType';

import { Container, FilterPopup } from './styles';

interface FilterData {
  type: string;
  id: string;
  value?: string;
}

const AVAILABLE_FILTERS = [
  {
    type: 'name',
    hasOptions: false,
    hasValue: true,
  },
  {
    type: 'tags',
    hasOptions: true,
    hasValue: true,
  },
  {
    type: 'state',
    hasOptions: true,
    hasValue: false,
  },
];

interface GroupedFilters {
  [key: string]: string[];
}

interface ParsedFilters {
  [key: string]: string;
}

interface FilterCreatorProps {
  setParsedFilters(newParsedFilters: ParsedFilters): void;
}

const FilterCreator: React.FC<FilterCreatorProps> = ({ setParsedFilters }) => {
  const { tags, types } = useBase();
  const [filters, setFilters] = useState<FilterData[]>([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => setSelectedFilter(''), [showFilterPopup]);

  const addFilter = useCallback(
    (type: string, id: string, value?: string): void => {
      setFilters(prev =>
        produce(prev, draft => {
          const filterExists = draft.find(
            ({ type: _type, id: _id, value: _value }) =>
              type === _type && id === _id && value === _value && value,
          );
          if (filterExists) return draft;

          const isToogle = draft.findIndex(
            ({ type: _type, id: _id, value: _value }) =>
              type === _type && id === _id && !(_value && value),
          );
          if (isToogle >= 0) draft.splice(isToogle, 1);
          else draft.push({ type, id, value });
          return draft;
        }),
      );
    },
    [],
  );
  const removeFilter = useCallback((index: number): void => {
    setFilters(prev =>
      produce(prev, draft => {
        draft.splice(index, 1);
        return draft;
      }),
    );
  }, []);

  const groupedFilters = useMemo(
    () =>
      filters.reduce((prev, curr) => {
        if (!prev[curr.type]) {
          prev[curr.type] = [];
        }
        prev[curr.type].push(`${curr.id}${curr.value ? `:${curr.value}` : ''}`);
        return prev;
      }, {} as GroupedFilters),
    [filters],
  );

  const parsedFilters = useMemo(
    () =>
      Object.entries(groupedFilters).reduce((prev, [key, value]) => {
        prev[key] = value.join(',');
        return prev;
      }, {} as ParsedFilters),
    [groupedFilters],
  );

  const giveFocus = useCallback((type: string) => {
    setSelectedFilter(prev => {
      if (prev === type) return '';
      return type;
    });
  }, []);

  useEffect(() => {
    setParsedFilters(parsedFilters);
  }, [parsedFilters, setParsedFilters]);

  return (
    <Container>
      <button
        type="button"
        className="add-filter"
        onClick={() => setShowFilterPopup(!showFilterPopup)}
      >
        <FiFilter color={filters.length ? '#067bc2' : 'black'} />
        {showFilterPopup ? <MdKeyboardArrowUp size={10} /> : <MdAdd />}
      </button>
      {showFilterPopup && (
        <FilterPopup showFilterPopup={showFilterPopup}>
          <FilterType
            filters={filters}
            selectedFilter={selectedFilter}
            askFocus={giveFocus}
            type="name"
            addFilter={addFilter}
            removeFilter={removeFilter}
            hasValue
          />
          <FilterType
            filters={filters}
            selectedFilter={selectedFilter}
            askFocus={giveFocus}
            type="tags"
            addFilter={addFilter}
            removeFilter={removeFilter}
            options={tags}
            hasValue
          />
          <FilterType
            filters={filters}
            selectedFilter={selectedFilter}
            askFocus={giveFocus}
            type="lastObservation"
            addFilter={addFilter}
            removeFilter={removeFilter}
            options={types}
          />
        </FilterPopup>
      )}
    </Container>
  );
};

export default FilterCreator;
