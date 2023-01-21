import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  currentUser: {},
  signup: (email: string, password: string) => {},
  login: (email: string, password: string) => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);

  function signup(email: string, password: string) {
    return axios
      .post('/register', {
        email: email,
        password: password,
      })
      .then((res) => {
        const userData = res.data;
        setCurrentUser(userData);
        setLoading(false);
      });
  }

  function login(email: string, password: string) {
    return axios
      .post('/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        const userData = res.data;
        setCurrentUser(userData);
        setLoading(false);
      });
  }

  function logout() {
    return setCurrentUser({});
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    //setUsername
  };

  return (
    //@ts-ignore
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
