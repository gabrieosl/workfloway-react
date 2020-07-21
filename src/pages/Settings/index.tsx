import React, { useState, useMemo, useEffect } from 'react';

import { MdAdd } from 'react-icons/md';
import { useNavigation } from '../../context/NavigationContext';

import Observations from './Observations';
import Tags from './Tags';
import Submissions from './Submissions';

import { Container, Submenu } from './styles';

interface SubmenuComponentsInterface {
  [key: string]: React.FC;
}
const SubmenuComponents: SubmenuComponentsInterface = {
  observations: Observations,
  tags: Tags,
  submissions: Submissions,
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
          {/* <button
            type="button"
            onClick={() => setSubmenu('submissions')}
            className={submenu === 'submissions' ? ' active' : ''}
          >
            Submissions
          </button> */}
        </nav>
      </Submenu>
      <Component />
    </Container>
  );
};

export default Settings;
