import React, { useState, useMemo, useEffect } from 'react';

import { MdAdd } from 'react-icons/md';
import { useNavigation } from '../../context/NavigationContext';

import Observations from './Observations';
import Products from './Products';
import Submissions from './Submissions';

import { Container, Submenu } from './styles';

interface SubmenuComponentsInterface {
  [key: string]: React.FC;
}
const SubmenuComponents: SubmenuComponentsInterface = {
  observations: Observations,
  products: Products,
  submissions: Submissions,
};

const Settings: React.FC = () => {
  const [submenu, setSubmenu] = useState('observations');
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
            onClick={() => setSubmenu('observations')}
            className={submenu === 'observations' ? ' active' : ''}
          >
            Observation Types
          </button>
          <button
            type="button"
            onClick={() => setSubmenu('products')}
            className={submenu === 'products' ? ' active' : ''}
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => setSubmenu('submissions')}
            className={submenu === 'submissions' ? ' active' : ''}
          >
            Submissions
          </button>
        </nav>
        <button type="button" className="add-item">
          <MdAdd />
          Add item
        </button>
      </Submenu>
      <Component />
    </Container>
  );
};

export default Settings;
