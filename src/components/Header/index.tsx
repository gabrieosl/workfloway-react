import React from 'react';

import { Link } from 'react-router-dom';
import { FaUser, FiPower } from 'react-icons/all';
import { Container } from './styles';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard">Workflow</Link>
      </nav>
      <aside>
        <FaUser />
        <strong>{user.name}</strong>
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </aside>
    </Container>
  );
};

export default Header;
