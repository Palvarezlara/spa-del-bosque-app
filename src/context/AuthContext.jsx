import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/http';


const AuthContext = createContext(null);

// Claves de almacenamiento 
const AUTH_KEY = 'spa-bosque-auth';
const REMEMBER_KEY = AUTH_KEY + '_remember';

// Dominio permitido 
function isValidEmailDomain(email) {
  return /^[\w.%+-]+@(duoc\.cl|duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(String(email));
}

// Normalizar teléfono chileno
function normalizePhone(str) {
  return String(str).replace(/\D+/g, '');
}
function isValidPhoneCL(str) {
  const digits = normalizePhone(str);
  return digits.length >= 9 && digits.length <= 11;
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try { 
      return JSON.parse(localStorage.getItem(AUTH_KEY)) || {user: null, token: null}; 
    }
    catch { 
      return {user: null, token: null}; }
  });

  const user = auth.user;
  const isLoggedIn = !!auth.user && !!auth.token;

  // LOGIN contra Backend
  const login = async (email, password, remember=false)=> {
    if(!email || !password){
      return { ok: false, error: 'Debes ingresar correo y contraseña'};
    }
    try{
      const res = await api.post('/users/auth/login', { email, password });
      const {token, user} = res.data;

      const authData = {token, user};
      setAuth(authData);
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      if(remember)
        localStorage.setItem(REMEMBER_KEY, '1');
      else
        localStorage.removeItem(REMEMBER_KEY);

      return {ok: true, user};
    } catch (err){
      const msg =
      err.response?.data?.message ||
      err.responde?.data?.error ||
      'Correo o contraseña incorrectos';
      return { ok: false, error: msg };
    }
  };

  // REGISTRO contra backend
  const register = async ({
    nombre,
    apellido,
    email,
    password,
    telefono,
    region,
    comuna,
  }) => {
    if (!isValidEmailDomain(email)) {
      return { ok: false, error: 'Dominio de correo no permitido' };
    }
    if (!isValidPhoneCL(telefono)) {
      return { ok: false, error: 'Teléfono chileno inválido' };
    }

    try {
      await api.post('/users', {
        nombre,
        apellido,
        email: email.trim(),
        password,
        telefono: normalizePhone(telefono),
        region,
        comuna,
      });

      // El backend creó el usuario; el frontend luego redirige al login
      return { ok: true };
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'No se pudo registrar.';
      return { ok: false, error: msg };
    }
  };

  // LOGOUT
  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  };


  // Sincronización entre pestañas 
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === AUTH_KEY) {
        setAuth(e.newValue ? JSON.parse(e.newValue) : {user: null, token: null});
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(
    () => ({ user, token: auth.token, isLoggedIn, login, register, logout }),
    [auth, user, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
