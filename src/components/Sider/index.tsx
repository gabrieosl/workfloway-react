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
import { Container, Menu, Settings } from './styles';

const Sider: React.FC = () => {
  const { path } = useRouteMatch();

  const { selectedSubjectIds } = useSelection();

  return (
    <Container>
      <Menu>
        <Link
          to="/dashboard"
          className={`dashboard${
            path.startsWith('/dashboard') ? ' active' : ''
          }`}
        >
          <FiGrid />
        </Link>
        <Link
          to="/selection"
          className={`selection${
            path.startsWith('/selection') ? ' active' : ''
          }`}
        >
          <FiList />
          {!!selectedSubjectIds.length && (
            <span>{selectedSubjectIds.length}</span>
          )}
        </Link>
        <Link
          to="/workflows"
          className={`workflows${
            path.startsWith('/workflows') ? ' active' : ''
          }`}
        >
          <IoIosGitNetwork />
        </Link>
        <Link
          to="/activities"
          className={`activities${
            path.startsWith('/activities') ? ' active' : ''
          }`}
        >
          <MdHistory />
        </Link>
      </Menu>
      <Settings
        to="/settings"
        className={`settings${path.startsWith('/settings') ? ' active' : ''}`}
      >
        <BsGearFill />
      </Settings>
    </Container>
  );
};

export default Sider;
