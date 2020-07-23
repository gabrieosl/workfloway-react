import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
import api from '../services/api';

interface TypesItemData {
  id: string;
  name: string;
}

interface ContextData {
  types: TypesItemData[];
  getTypeName(id: string): string | undefined;
  refreshTypes(): void;
}

const TypesContext = createContext<ContextData>({} as ContextData);

const TypesProvider: React.FC = ({ children }) => {
  const [types, setTypes] = useState<TypesItemData[]>([]);

  const getTypeName = useCallback(
    (id: string) => {
      const type = types.find(_type => _type.id === id);
      return type ? type.name : undefined;
    },
    [types],
  );

  const refreshTypes = useCallback(() => {
    api.get('/types').then(response => {
      if (response.status === 200) {
        setTypes(response.data);
      }
    });
  }, []);

  useEffect(() => {
    refreshTypes();
  }, [refreshTypes]);

  return (
    <TypesContext.Provider value={{ types, getTypeName, refreshTypes }}>
      {children}
    </TypesContext.Provider>
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
