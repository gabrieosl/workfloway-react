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
import { Container, Menu, Settings } from './styles';

const Sider: React.FC = () => {
  const { page } = useNavigation();
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
          to="/selections"
          className={`selections${page === 'selections' ? ' active' : ''}`}
        >
          <FiList />
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
      <Settings to="/" className={page === 'settings' ? 'selected' : ''}>
        <BsGearFill />
      </Settings>
    </Container>
  );
};

export default Sider;
