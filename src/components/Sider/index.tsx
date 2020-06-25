import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiGrid,
  FiList,
  IoIosGitNetwork,
  AiOutlineFileText,
  BsGearFill,
} from 'react-icons/all';

import { useNavigation } from '../../context/NavigationContext';
import { useSelection } from '../../context/SelectionContext';
import { Container, Menu, Settings } from './styles';

const Sider: React.FC = () => {
  const { page } = useNavigation();
  const { selection } = useSelection();
  return (
    <Container>
      <Menu>
        <Link
          to="/dashboard"
          className={`dashboard${page === 'dashboard' ? ' active' : ''}`}
        >
          <FiGrid />
        </Link>
        <Link
          to="/selection"
          className={`selection${page === 'selection' ? ' active' : ''}`}
        >
          <FiList />
          {!!selection.length && <span>{selection.length}</span>}
        </Link>
        <Link
          to="/workflows"
          className={`workflows${page === 'workflows' ? ' active' : ''}`}
        >
          <IoIosGitNetwork />
        </Link>
        <Link
          to="/activities"
          className={`activities${page === 'activities' ? ' active' : ''}`}
        >
          <AiOutlineFileText />
        </Link>
      </Menu>
      <Settings
        to="/settings"
        className={`settings${page === 'settings' ? ' active' : ''}`}
      >
        <BsGearFill />
      </Settings>
    </Container>
  );
};

export default Sider;
