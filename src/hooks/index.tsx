import React from 'react';

import { AuthProvider } from './auth';
import { BaseProvider } from './base';
import { SelectionProvider } from './selection';

const hooks: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <BaseProvider>
        <SelectionProvider>{children}</SelectionProvider>
      </BaseProvider>
    </AuthProvider>
  );
};

export default hooks;
