import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MdCheck, MdAdd } from 'react-icons/all';
import produce from 'immer';

import { useSelection } from '../../hooks/selection';
import api from '../../services/api';

import FilterCreator from '../../components/FilterCreator';
import List from '../../components/List';
import Popup from '../../components/Popup';
import CreateProduct from '../../components/CreateProduct';

import { Container, SelectionPanel } from './styles';

interface ObservationData {
  type_id: string;
  created_at: Date;
  comment: string;
  value: string;
  user: {
    name: string;
  };
}

interface SubjectData {
  id: string;
  name: string;
  observations: ObservationData[];
  lastObservation?: ObservationData;
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
  const [showCreateProductPopup, setShowCreateProductPopup] = useState(false);

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
          page: subjectsPage + 1,
          size: subjectsPerPage,
        },
      })
      .then(response => {
        setSubjects(prev =>
          produce(prev, draft => {
            draft = draft.concat(response.data);
            return draft;
          }),
        );
        setSubjectsPage(subjectsPage + 1);
      });
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
      <button
        type="button"
        className="create-new"
        onClick={() => setShowCreateProductPopup(true)}
      >
        <MdAdd />
        <span>New Product</span>
      </button>
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
      {showCreateProductPopup && (
        <Popup onClose={setShowCreateProductPopup}>
          <CreateProduct
            onClose={setShowCreateProductPopup}
            refreshData={refreshData}
          />
        </Popup>
      )}
    </Container>
  );
};

export default Dashboard;
