import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MdCheck, MdClose, MdAdd, FiFilter } from 'react-icons/all';
import produce from 'immer';
import Select from 'react-select';

import { useNavigation } from '../../context/NavigationContext';
import { useSelection } from '../../context/SelectionContext';
import { useTypes } from '../../context/TypesContext';
import api from '../../services/api';

import List from '../../components/List';
import CreateObservation from '../../components/CreateObservation';
import CreateProduct from '../../components/CreateProduct';

import { Container, SelectionPanel, ActiveFilters } from './styles';
import CreateNewPopup from '../../components/CreateNewPopup';

interface SelectOptions {
  value?: {
    id: string;
    needsMoreInput: boolean;
    type: string;
  };
  label: string;
}
interface ItemData {
  id: string;
  name: string;
  lastObservation?: {
    type_id: string;
    created_at: Date;
    user: {
      name: string;
    };
  };
  lastSubmission?: {
    repetition: number;
  };
  tags: {
    tagId: string;
    value: string;
  }[];
}

interface FilterData {
  type: string;
  id: string;
  value: string;
  name?: string;
}

interface GroupedFilters {
  [key: string]: string[];
}
interface ParsedFilters {
  [key: string]: string;
}

const Dashboard: React.FC = () => {
  const { tags, types, getTagName, getTypeName } = useTypes();
  const { setPage } = useNavigation();
  const { isSelected, addToSelection, removeFromSelection } = useSelection();

  const [currentPage, setCurrentpage] = useState(1);
  const [size] = useState(15);
  const [items, setItems] = useState<ItemData[]>([]);
  const [filterOption, setFilterOption] = useState<SelectOptions>({
    label: 'Select a filter',
  } as SelectOptions);
  const [filterInputValue, setFilterInputValue] = useState('');
  const [filterInputVisibility, setFilterInputVisibility] = useState(false);
  const [filters, setFilters] = useState<FilterData[]>([]);

  const isAllMarked = useMemo(() => !items.find(item => !isSelected(item.id)), [
    isSelected,
    items,
  ]);

  const handleToggleMarkAll = useCallback(() => {
    if (!isAllMarked) {
      addToSelection(items);
    } else {
      removeFromSelection(items);
    }
  }, [addToSelection, isAllMarked, items, removeFromSelection]);

  useEffect(() => setPage('dashboard'), [setPage]);
  const parsedFilters = useMemo(
    () =>
      filters.map(filter => ({
        ...filter,
        name: getTagName(filter.id) || getTypeName(filter.id),
      })),
    [filters, getTagName, getTypeName],
  );
  const paramsGroupedFilters = useMemo(() => {
    const groupedFilters = filters.reduce((prev, curr) => {
      if (!prev[curr.type]) {
        prev[curr.type] = [];
      }

      prev[curr.type].push(
        curr.value.length ? `${curr.id}:${curr.value}` : curr.id,
      );

      return prev;
    }, {} as GroupedFilters);

    const paramsParsedFilters = Object.entries(groupedFilters).reduce(
      (prev, curr) => {
        prev[curr[0]] = curr[1].join(',');
        return prev;
      },
      {} as ParsedFilters,
    );

    return paramsParsedFilters;
  }, [filters]);

  const getData = useCallback(() => {
    api
      .get(`/subjects?`, {
        params: {
          ...paramsGroupedFilters,
          page: currentPage,
          size,
        },
      })
      .then(response => {
        setItems(response.data);
      });
  }, [currentPage, paramsGroupedFilters, size]);

  const filterOptions = useMemo(() => {
    const options: SelectOptions[] = [];
    tags.forEach(tag => {
      options.push({
        value: { id: tag.id, needsMoreInput: true, type: 'hasTag' },
        label: `Tag: ${tag.name}`,
      });
    });
    types.forEach(type => {
      options.push({
        value: {
          id: type.id,
          needsMoreInput: false,
          type: 'lastObservationType',
        },
        label: `Status: ${type.name}`,
      });
    });

    return options;
  }, [tags, types]);

  const handleOptionChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newOption: any) => {
      console.log(newOption);
      setFilterOption(newOption);
      setFilterInputValue('');
      setFilterInputVisibility(newOption.value.needsMoreInput);
    },
    [],
  );

  const handleAddFilter = useCallback(() => {
    setFilters(
      produce(filters, draft => {
        if (!filterOption.value) return draft;
        draft.push({
          type: filterOption.value.type,
          id: filterOption.value.id,
          value: filterInputValue,
        });
        return draft;
      }),
    );
  }, [filterInputValue, filterOption.value, filters]);

  const handleRemoveFilter = useCallback(
    index => {
      setFilters(
        produce(filters, draft => {
          draft.splice(index, 1);
          return draft;
        }),
      );
    },
    [filters],
  );

  const handleLoadMoreItems = useCallback(() => {
    if (currentPage > 0) {
      api
        .get(`/subjects?page=${currentPage + 1}&size=${size}`)
        .then(response => {
          if (response.data.length > 0) {
            setItems(
              produce(items, draft => {
                draft.push(...response.data);
              }),
            );
          }
          if (response.data.length < size) {
            setCurrentpage(-1);
          }
        });
      setCurrentpage(currentPage + 1);
    }
  }, [currentPage, items, setItems, size]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsGroupedFilters]);

  return (
    <>
      <Container>
        <SelectionPanel isAllMarked={isAllMarked}>
          <strong>List of Products</strong>
          <section>
            <Select
              options={filterOptions}
              onChange={handleOptionChange}
              value={filterOption}
            />
            {filterInputVisibility && (
              <input
                type="text"
                value={filterInputValue}
                onChange={e => setFilterInputValue(e.target.value)}
              />
            )}
            <button type="button" onClick={handleAddFilter}>
              <MdAdd />
              <FiFilter />
            </button>
          </section>
          <CreateNewPopup text="New Product">
            <CreateProduct />
          </CreateNewPopup>
          <button
            type="button"
            className="mark-all"
            onClick={handleToggleMarkAll}
          >
            <MdCheck size={25} />
            <MdCheck size={25} />
          </button>
        </SelectionPanel>
        {!!Object.keys(filters).length && (
          <ActiveFilters>
            <span>Active filters:</span>
            {parsedFilters.map((filter, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <span>{`${filter.type} ${filter.name} ${filter.value}`}</span>
                <button type="button" onClick={() => handleRemoveFilter(index)}>
                  <MdClose />
                </button>
              </div>
            ))}
          </ActiveFilters>
        )}
        <List items={items}>
          {currentPage > 0 && (
            <button type="button" onClick={handleLoadMoreItems}>
              <MdAdd size={30} />
            </button>
          )}
        </List>
      </Container>
      <CreateObservation initialTypeSelectedId="b1dcfa79-d1ff-4922-b482-ad5629c970a3" />
    </>
  );
};

export default Dashboard;
