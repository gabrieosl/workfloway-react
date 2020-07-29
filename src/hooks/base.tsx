import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
import produce from 'immer';
import api from '../services/api';

import { useAuth } from './auth';

interface BaseStateValues {
  id: string;
  name: string;
}

interface BaseState {
  [key: string]: BaseStateValues[];
}

interface ContextData {
  types: BaseStateValues[];
  tags: BaseStateValues[];
  getIdByName(name: string, channel?: 'tags' | 'types'): string | undefined;
  getNameById(id: string, channel?: 'tags' | 'types'): string | undefined;
  refreshData(channels?: 'tags' | 'types'): void;
}

const BaseContext = createContext<ContextData>({} as ContextData);

const BaseProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [data, setData] = useState<BaseState>({
    tags: [],
    types: [],
  });

  const getNameById = useCallback(
    (id: string, channel = 'types') => {
      const result = data[channel].find(_type => _type.id === id);
      return result ? result.name : undefined;
    },
    [data],
  );

  const getIdByName = useCallback(
    (name: string, channel = 'types') => {
      const result = data[channel].find(_type => _type.name === name);
      return result ? result.id : undefined;
    },
    [data],
  );

  const refreshData = useCallback(
    (channel?: 'tags' | 'types') => {
      if (!user) {
        return;
      }

      const channels = [];
      if (!channel) channels.push('tags', 'types');
      else channels.push(channel);

      channels.forEach(chann => {
        api.get(`/${chann}`).then(response => {
          if (response.status === 200) {
            setData(
              produce(data, draft => {
                draft[chann] = response.data;
                return draft;
              }),
            );
          }
        });
      });
    },
    [data, user],
  );

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <BaseContext.Provider
      value={{
        types: data.types,
        tags: data.tags,
        getNameById,
        getIdByName,
        refreshData,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

function useBase(): ContextData {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error('useBase must be used within BaseProvider');
  }

  return context;
}

export { BaseProvider, useBase };
