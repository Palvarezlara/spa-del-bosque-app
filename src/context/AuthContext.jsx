import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

// Claves de almacenamiento 
const LS_USERS = 'spa_users';
const LS_SESSION = 'spa_session';
const AUTH_KEY = 'spa-bosque-auth'; 
const REMEMBER_KEY = LS_SESSION + '_remember';

// endpoint mockable.io con usuarios semilla
const USERS_URL = 'https://demo6694663.mockable.io/api/v1/spadelbosque/usuarios';

// Utilidad: hash SHA-256 (hex)
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

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
  // Sesión (objeto usuario logueado mínimo: id, nombre, email, rol)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_SESSION)) || null; }
    catch { return null; }
  });

  // Semilla de usuarios 
  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem(LS_USERS) || '[]');
      if (!existing.length) {
        
        fetch(USERS_URL)
          .then(r => r.json())
          .then(data => {
            const usuarios = Array.isArray(data?.usuarios) ? data.usuarios : [];
            // Normalizamos al formato local
            const mapped = usuarios.map(u => ({
              id: u.id,
              nombre: `${u.nombres} ${u.apellidos}`.trim(),
              email: u.correo,
              telefono: u.telefono,
              region: u.region,
              comuna: u.comuna,
              passHash: u.passwordHash, // importante
              rol: 'cliente',
            }));
            localStorage.setItem(LS_USERS, JSON.stringify(mapped));
          })
          .catch(() => {
            // sin seed remota; se queda vacío y se podrá registrar
          });
      }
    } catch { /* noop */ }
  }, []);

  const isLoggedIn = !!user;

  // LOGIN: acepta contraseña en texto, compara contra passHash si existe o contra pass plano si fue registrado local
  const login = async (email, password, remember = false) => {
    const users = JSON.parse(localStorage.getItem(LS_USERS) || '[]');
    const found = users.find(u => u.email?.toLowerCase() === String(email).toLowerCase());
    if (!found) return { ok: false, error: 'Correo o contraseña incorrectos' };

    // Si el usuario tiene hash (semilla mockable), comparamos hash
    if (found.passHash) {
      const incomingHash = await sha256(password);
      if (incomingHash !== found.passHash) {
        return { ok: false, error: 'Correo o contraseña incorrectos' };
      }
    } else {
      // Usuarios creados localmente guardarán pass plano (solo DEMO)
      if (found.pass !== password) {
        return { ok: false, error: 'Correo o contraseña incorrectos' };
      }
    }

    const session = {
      id: found.id ?? Date.now(),
      email: found.email,
      nombre: found.nombre ?? 'Usuario',
      rol: found.rol ?? 'cliente',
      ts: Date.now(),
    };

    localStorage.setItem(LS_SESSION, JSON.stringify(session));
    if (remember) localStorage.setItem(REMEMBER_KEY, '1');
    else localStorage.removeItem(REMEMBER_KEY);

    setUser(session);
    return { ok: true, user: session };
  };

  // REGISTRO: valida dominio, teléfonos y duplica a LS_USERS; luego inicia sesión
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

    const users = JSON.parse(localStorage.getItem(LS_USERS) || '[]');
    if (users.some(u => u.email?.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Este correo ya está registrado' };
    }

    const newUser = {
      id: 'U' + Date.now(),
      nombre: `${nombre} ${apellido}`.trim(),
      email: email.trim(),
      pass: password,        // DEMO: plano (cuando conectes backend, usa hash + backend)
      passHash: null,        // para distinguir de los semilla
      telefono: normalizePhone(telefono),
      region,
      comuna,
      rol: 'cliente',
    };

    users.push(newUser);
    localStorage.setItem(LS_USERS, JSON.stringify(users));

    // Autologin
    const res = await login(newUser.email, password, true);
    return res.ok ? { ok: true, user: res.user } : res;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_SESSION);
    localStorage.removeItem(REMEMBER_KEY);
  };

  // Sincronización entre pestañas 
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === LS_SESSION) {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(
    () => ({ user, isLoggedIn, login, register, logout }),
    [user, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
