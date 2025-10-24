import { useEffect, useState, useCallback } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function CategoriaChips({ categories }) {
  const [active, setActive] = useState(() => window.location.hash.replace('#', '') || '');

  // Actualiza cuando cambia el hash (ej: al volver atrás/adelante)
  useEffect(() => {
    const onHashChange = () => setActive(window.location.hash.replace('#', '') || '');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
     
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
      history.replaceState(null, '', `#${id}`);
    }
  }, []);

  return (
    <nav className="mb-3">
      <Stack direction="row" spacing={1} justifyContent="start" flexWrap="wrap">
        {categories.map(cat => {
          const isActive = active === cat.id;
          return (
            <Chip
              key={cat.id}
              label={cat.label}
              component="a"
              href={`#${cat.id}`}
              clickable
              onClick={(e) => handleClick(e, cat.id)}
              variant={isActive ? 'filled' : 'outlined'}
              sx={{
                m: '4px',
                fontWeight: 500,
                borderRadius: '999px',
                px: 0.5,
                // outlined
                borderColor: 'var(--brand)',
                color: 'var(--brand)',
                // filled (activo)
                ...(isActive && {
                  bgcolor: 'var(--brand)',
                  color: '#fff',
                }),
                '&:hover': {
                  bgcolor: isActive ? 'var(--brand)' : 'rgba(12,166,149,0.08)',
                },
              }}
            />
          );
        })}
      </Stack>
    </nav>
  );
}
