import React, { useState } from 'react';

import { FaUser, FiPower, MdClose } from 'react-icons/all';
import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <Container showProfile={showProfile}>
      <strong>Workfloway</strong>
      <aside>
        <button
          type="button"
          id="profile"
          onClick={() => setShowProfile(prev => !prev)}
        >
          <FaUser />
          <MdClose />
        </button>
        <strong>{user.name}</strong>
        <button type="button" id="logout" onClick={signOut}>
          <FiPower />
        </button>
      </aside>
    </Container>
  );
};

export default Header;
