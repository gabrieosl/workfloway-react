import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MdCheck, MdAdd } from 'react-icons/all';
import produce from 'immer';

import { classNames } from 'react-select/src/utils';
import { useSelection } from '../../hooks/selection';
import api from '../../services/api';

import FilterCreator from '../../components/FilterCreator';
import List from '../../components/List';

import { Container, SelectionPanel } from './styles';

interface SubjectData {
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

const Dashboard: React.FC = () => {
  const { isSelected, addToSelection, removeFromSelection } = useSelection();
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [parsedFilters, setParsedFilters] = useState({});
  const [subjectsPage, setSubjectsPage] = useState(1);
  const [subjectsPerPage] = useState(15);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refreshData = useCallback(() => {
    api
      .get(`/subjects?`, {
        params: {
          ...parsedFilters,
          page: subjectsPage,
          size: subjectsPerPage,
        },
      })
      .then(response => setSubjects(response.data));
  }, [parsedFilters, subjectsPage, subjectsPerPage]);

  const appendMoreData = useCallback(() => {
    console.log('called');
    api
      .get(`/subjects?`, {
        params: {
          ...parsedFilters,
          page: subjectsPage,
          size: subjectsPerPage,
        },
      })
      .then(response =>
        setSubjects(prev =>
          produce(prev, draft => {
            draft = draft.concat(response.data);
            return draft;
          }),
        ),
      );
    setSubjectsPage(prev => prev + 1);
  }, [parsedFilters, subjectsPage, subjectsPerPage]);

  const areAllSubjectsMarked = useMemo(
    () => !subjects.find(item => !isSelected(item.id)),
    [isSelected, subjects],
  );

  const handleToggleMarkAll = useCallback(() => {
    if (!areAllSubjectsMarked) {
      addToSelection(subjects);
    } else {
      removeFromSelection(subjects);
    }
  }, [addToSelection, areAllSubjectsMarked, subjects, removeFromSelection]);

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedFilters]);

  return (
    <Container>
      <div className="title-holder">
        <strong className="title-text">List of Products</strong>
        <button type="button" className="create-new">
          <MdAdd />
          <span>New Product</span>
        </button>
      </div>
      <SelectionPanel areAllSubjectsMarked={areAllSubjectsMarked}>
        <FilterCreator setParsedFilters={setParsedFilters} />
        <button
          type="button"
          className="select-all"
          onClick={handleToggleMarkAll}
        >
          <MdCheck size={25} />
          <MdCheck size={25} />
        </button>
      </SelectionPanel>
      <List items={subjects} loadMoreItems={appendMoreData} />
    </Container>
  );
};

export default Dashboard;
