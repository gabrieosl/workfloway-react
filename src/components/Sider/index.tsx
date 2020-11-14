import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  FiGrid,
  FiList,
  IoIosGitNetwork,
  MdHistory,
  BsGearFill,
} from 'react-icons/all';

import { useSelection } from '../../hooks/selection';
import CreateObservation from '../CreateObservation';
import { Container } from './styles';

const Sider: React.FC = () => {
  const { path } = useRouteMatch();

  const { selectedSubjectIds } = useSelection();

  return (
    <Container>
      <nav>
        <Link
          to="/products"
          id="dashboard"
          className={path.startsWith('/products') ? ' active' : ''}
        >
          <FiGrid />
        </Link>
        <Link
          to="/selection"
          id="selection"
          className={path.startsWith('/selection') ? ' active' : ''}
        >
          <FiList />
          {!!selectedSubjectIds.length && (
            <span>{selectedSubjectIds.length}</span>
          )}
        </Link>
        <CreateObservation />
        <Link
          to="/workflows"
          id="workflows"
          className={path.startsWith('/workflows') ? ' active' : ''}
        >
          <IoIosGitNetwork />
        </Link>
        <Link
          to="/activities"
          id="activities"
          className={path.startsWith('/activities') ? ' active' : ''}
        >
          <MdHistory />
        </Link>
        <div className="separator" />
        <Link
          to="/settings"
          id="settings"
          className={path.startsWith('/settings') ? ' active' : ''}
        >
          <BsGearFill />
        </Link>
      </nav>
    </Container>
  );
};

export default Sider;
