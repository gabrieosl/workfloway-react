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
  tags: TypesItemData[];
  getTypeName(id: string): string | undefined;
  getTagName(id: string): string | undefined;
  getTagId(name: string): string | undefined;
  refreshTypes(): void;
  refreshTags(): void;
}

const TypesContext = createContext<ContextData>({} as ContextData);

const TypesProvider: React.FC = ({ children }) => {
  const [types, setTypes] = useState<TypesItemData[]>([]);
  const [tags, setTags] = useState<TypesItemData[]>([]);

  const getTypeName = useCallback(
    (id: string) => {
      const type = types.find(_type => _type.id === id);
      return type ? type.name : undefined;
    },
    [types],
  );

  const getTagName = useCallback(
    (id: string) => {
      const tag = tags.find(_tag => _tag.id === id);
      return tag ? tag.name : undefined;
    },
    [tags],
  );

  const getTagId = useCallback(
    (name: string) => {
      const tag = tags.find(_tag => _tag.name === name);
      return tag ? tag.id : undefined;
    },
    [tags],
  );

  const refreshTypes = useCallback(() => {
    api.get('/types').then(response => {
      if (response.status === 200) {
        setTypes(response.data);
      }
    });
  }, []);

  const refreshTags = useCallback(() => {
    api.get('/tags').then(response => {
      if (response.status === 200) {
        setTags(response.data);
      }
    });
  }, []);

  useEffect(() => {
    refreshTypes();
    refreshTags();
  }, [refreshTypes, refreshTags]);

  return (
    <TypesContext.Provider
      value={{
        types,
        tags,
        getTypeName,
        getTagName,
        getTagId,
        refreshTypes,
        refreshTags,
      }}
    >
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
