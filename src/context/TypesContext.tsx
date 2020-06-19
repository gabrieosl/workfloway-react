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

  const getTypeName = useCallback(
    (id: string) => {
      const type = types.find(_type => _type.id === id);
      return type ? type.name : undefined;
    },
    [types],
  );

  return (
    <TypesContext.Provider value={{ types, getTypeName }}>
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
