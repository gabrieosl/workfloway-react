import React, { useEffect, useState, useMemo } from 'react';

import { FiFilter, MdKeyboardArrowDown, MdAdd } from 'react-icons/all';
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
  const [filters, setFilters] = useState<FilterData[]>([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false);

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
        <MdAdd />
        <FiFilter />
      </button>
      {showFilterPopup && (
        <FilterPopup>
          <button type="button" className="filter">
            <FiFilter />
            <span>Name</span>
            <MdKeyboardArrowDown size={10} />
          </button>
          <button type="button" className="filter">
            <FiFilter />
            <span>Tags</span>
            <MdKeyboardArrowDown />
          </button>
          <button type="button" className="filter">
            <FiFilter />
            <span>Current State</span>
            <MdKeyboardArrowDown />
          </button>
        </FilterPopup>
      )}
    </Container>
  );
};

export default FilterCreator;
