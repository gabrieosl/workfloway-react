import React, { useState, useEffect, createContext, useContext } from 'react';
import api from '../services/api';

interface TypesItemData {
  id: string;
  name: string;
}

interface ContextData {
  types: TypesItemData[];
}

const TypesContext = createContext<ContextData>({} as ContextData);

const TypesProvider: React.FC = ({ children }) => {
  const [types, setTypes] = useState<TypesItemData[]>([]);

  useEffect(() => {
    api.get('/observationtypes').then(response => {
      if (response.status === 200) {
        setTypes(response.data);
      }
    });
  }, []);

  return (
    <TypesContext.Provider value={{ types }}>{children}</TypesContext.Provider>
  );
};

function useTypes(): ContextData {
  const context = useContext(TypesContext);
  if (!context) {
    throw new Error('useTypes must be used within TypesProvider');
  }

  return context;
}

export { TypesProvider, useTypes };
