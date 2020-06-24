import React, { useEffect, useMemo } from 'react';

import { FiTrash2 } from 'react-icons/all';
import { useNavigation } from '../../context/NavigationContext';
import { useSelection } from '../../context/SelectionContext';

import List from '../../components/List';

import { Container, SelectionPanel } from './styles';

const Selection: React.FC = () => {
  const { setPage } = useNavigation();
  const { selection, clearSelection } = useSelection();

  useEffect(() => setPage('selection'), [setPage]);

  const isEmpty = useMemo(() => selection.length === 0, [selection]);

  return (
    <Container>
      <SelectionPanel isEmpty={isEmpty}>
        <strong>Selection editor</strong>

        <button type="button" id="clear-all" onClick={clearSelection}>
          <FiTrash2 size={20} />
        </button>
      </SelectionPanel>
      <List items={selection} type="select" />
    </Container>
  );
};

export default Selection;
