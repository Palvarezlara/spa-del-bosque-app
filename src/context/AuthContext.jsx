import { createContext, use, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const AUTH_KEY = 'spa-bosque-auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const isLoggedIn = !!user;

  const loginMock = (fakeUser) => {
    setUser(fakeUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(fakeUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  useEffect(() => {
    const onStorage = (e) =>{
        if (e.key === AUTH_KEY) {
            setUser(e.newValue ? JSON.parse(e.newValue) : null);
        }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  
  const value = useMemo(() => ({ user, isLoggedIn, loginMock, logout }), [user, isLoggedIn]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}