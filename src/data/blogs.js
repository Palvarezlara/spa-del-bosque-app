
import respiracionImg from '../assets/blog/respiracion.webp';
import piedrasImg     from '../assets/blog/piedras.webp';
import circuitoImg    from '../assets/blog/circuito.webp'; 

export const BLOGS_DB = [
  {
    id: 'respiracion',
    titulo: 'Respiración consciente: reduce el estrés en 5 minutos',
    autor: 'Equipo SPA',
    fecha: '2025-09-05',
    resumen: 'Técnica breve para calmar el sistema nervioso antes de dormir o después del trabajo.',
    portada: respiracionImg,
    contenido: [
      { type: 'p', text: 'La respiración consciente es una técnica simple y poderosa…' },
      { type: 'h2', text: '¿Qué es la respiración consciente?' },
      { type: 'p', text: 'Consiste en poner atención plena a la respiración…' },
      { type: 'h2', text: 'Beneficios inmediatos' },
      { type: 'ul', items: ['Disminuye la tensión', 'Mejora la concentración', 'Reduce la ansiedad', 'Aporta calma'] },
      { type: 'h2', text: 'Ejercicio práctico en 5 pasos' },
      { type: 'ol', items: ['Siéntate cómodo', 'Relaja hombros', 'Inhala 4', 'Mantén 2', 'Exhala 6 (5 minutos)'] },
      { type: 'blockquote', text: '“La calma está a una respiración de distancia”.' },
    ],
  },
  {
    id: 'piedras',
    titulo: 'Beneficios del masaje con piedras calientes',
    autor: 'Viviana',
    fecha: '2025-09-01',
    resumen: 'Termoterapia: mejora la circulación y libera tensiones profundas.',
    portada: piedrasImg,
    contenido: [
      { type: 'p', text: 'La termoterapia con piedras calientes…' },
    ],
  },
  {
    id: 'circuito',
    titulo: 'Circuito de aguas: guía para tu primera vez',
    autor: 'Rosa',
    fecha: '2025-08-28',
    resumen: 'Qué llevar, cómo prepararte y qué esperar de las distintas temperaturas.',
    portada: circuitoImg,
    contenido: [
      { type: 'p', text: 'Te contamos cómo aprovechar al máximo tu primera experiencia…' },
    ],
  },
];

// CRUD simulado en memoria (como hicimos para servicios)
let blogs = [...BLOGS_DB];

export const blogList = () => blogs;
export const blogGetById = (id) => blogs.find(b => b.id === id);
export const blogCreate = (post) => { blogs.push(post); return post; };
export const blogUpdate = (id, data) => {
  const i = blogs.findIndex(b => b.id === id);
  if (i === -1) return null;
  blogs[i] = { ...blogs[i], ...data };
  return blogs[i];
};
export const blogDelete = (id) => { blogs = blogs.filter(b => b.id !== id); return true; };
