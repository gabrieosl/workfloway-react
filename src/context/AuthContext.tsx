import React, { useState, createContext, useCallback, useContext } from 'react';

import api from '../services/api';

interface User {
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface ContextData {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<ContextData>({} as ContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Workfloway:token');
    const user = localStorage.getItem('@Workfloway:user');
    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', { email, password });
    if (response.status === 200) {
      const { token, user } = response.data;
      localStorage.setItem('@Workfloway:token', token);
      localStorage.setItem('@Workfloway:user', JSON.stringify(user));

      setData({ token, user });
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Workfloway:token');
    localStorage.removeItem('@Workfloway:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): ContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useWorkflow must be used within AuthProvider');
  }

  return context;
}
