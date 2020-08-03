import React from 'react';

import { AuthProvider } from './auth';
import { BaseProvider } from './base';
import { SelectionProvider } from './selection';
import { WorkflowProvider } from './workflow';

const hooks: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <BaseProvider>
        <SelectionProvider>
          <WorkflowProvider>{children}</WorkflowProvider>
        </SelectionProvider>
      </BaseProvider>
    </AuthProvider>
  );
};

export default hooks;
