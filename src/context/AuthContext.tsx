import { createContext, useState, ReactNode, FC, useMemo } from 'react';
import { apiLogin } from '../api/services';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Intentamos leer el estado inicial desde sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

  const login = async (user: string, pass: string): Promise<boolean> => {
    try {
      const success = await apiLogin(user, pass);
      if (success) {
        sessionStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    // Aquí también podrías llamar a una API de logout si existiera
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
    }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};