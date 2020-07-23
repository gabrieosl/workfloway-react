import React, { useState, useMemo, useEffect } from 'react';

import { useNavigation } from '../../context/NavigationContext';

import Observations from './Observations';
import Tags from './Tags';

import { Container, Submenu } from './styles';

interface SubmenuComponentsInterface {
  [key: string]: React.FC;
}
const SubmenuComponents: SubmenuComponentsInterface = {
  observations: Observations,
  tags: Tags,
};

const Settings: React.FC = () => {
  const [submenu, setSubmenu] = useState('tags');
  const { setPage } = useNavigation();

  const Component = useMemo(() => {
    return SubmenuComponents[submenu];
  }, [submenu]);

  useEffect(() => {
    setPage('settings', submenu);
  }, [setPage, submenu]);

  return (
    <Container>
      <Submenu>
        <nav>
          <button
            type="button"
            onClick={() => setSubmenu('tags')}
            className={submenu === 'tags' ? ' active' : ''}
          >
            Tags
          </button>
          <button
            type="button"
            onClick={() => setSubmenu('observations')}
            className={submenu === 'observations' ? ' active' : ''}
          >
            Observation Types
          </button>
        </nav>
      </Submenu>
      <Component />
    </Container>
  );
};

export default Settings;
