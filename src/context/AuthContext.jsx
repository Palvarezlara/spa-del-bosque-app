import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api} from '../api/http';


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
      const stored = JSON.parse(localStorage.getItem(AUTH_KEY));
      if (stored && typeof stored === 'object') {
        return {
          user: stored.user || null,
          token: stored.token || null,
        };
      }
      return { user: null, token: null };
    }
    catch { 
      return {user: null, token: null}; }
      
  });

  const user = auth.user;
  const isLoggedIn = !!auth.user;


  // LOGIN contra Backend
  const login = async (email, password, remember=false)=> {
    if(!email || !password){
      return { ok: false, error: 'Debes ingresar correo y contraseña'};
    }
    try{
      const res = await api.post('/api/v1/users/login', { email, password });
      const data = res.data;
      const userFromApi = data.user || data;
      const tokenFromApi = data.token || null; 

      const authData = { user: userFromApi, token: tokenFromApi };


      setAuth(authData);
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

      if(remember)
        localStorage.setItem(REMEMBER_KEY, '1');
      else
        localStorage.removeItem(REMEMBER_KEY);

      return {ok: true, user: userFromApi};
    } catch (err){
      const msg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      'Correo o contraseña incorrectos';
      return { ok: false, error: msg };
    }
  };

  // REGISTRO contra backend
  const register = async ({
    nombres,
    apellidos,
    email,
    password,
    telefono,
    region,
    comuna,
    fechaNacimiento,
  }) => {
    if (!isValidEmailDomain(email)) {
      return { ok: false, error: 'Dominio de correo no permitido' };
    }
    if (!isValidPhoneCL(telefono)) {
      return { ok: false, error: 'Teléfono chileno inválido' };
    }

    try {
      await api.post('/api/v1/users/register', {
        nombres,
        apellidos,
        email: email.trim(),
        password,
        telefono: normalizePhone(telefono),
        region,
        comuna,
        fechaNacimiento: fechaNacimiento || null,
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

  const updateUserProfile = (updatedUserOrPartial) => {
    setAuth((prev) => {
      if (!prev?.user) return prev;

      const newUser = updatedUserOrPartial.id
        ? updatedUserOrPartial
        : { ...prev.user, ...updatedUserOrPartial };

      const nextAuth = { ...prev, user: newUser };
      localStorage.setItem(AUTH_KEY, JSON.stringify(nextAuth));
      return nextAuth;
    });
  }; 

  // Sincronización entre pestañas 
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === AUTH_KEY) {
        try {
          const value = e.newValue ? JSON.parse(e.newValue) : null;
          setAuth(
            value
              ? { user: value.user || null, token: value.token || null }
              : { user: null, token: null }
          );
        } catch {
          setAuth({ user: null, token: null });
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token: auth.token, // quedará null, pero no rompe componentes que lo lean
      isLoggedIn,
      login,
      register,
      logout,
      updateUserProfile,
    }),
    [auth, user, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
