const relajacionImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/relajacion.webp";
const descontracturanteImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/descontracturante.webp";
const piedrasCalientesImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/piedras-calientes.webp";
const bosqueImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/bosque.webp";
const olivoterapiaImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/olivoterapia.webp";
const chocolaterapiaImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/chocolaterapia.webp";
const exfoliacionImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/exfoliacion.webp";
const circuitoImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/circuito.webp";
const saunaImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/sauna.webp";
const renovacionImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/renovacion.webp";
const dulceAventuraImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/dulceaventura.webp";
const dayUseImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/dayuse.webp";
const bosqueNativoImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/bosqueNativo.webp";
const bosqueMagicoImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/bosqueMagico.webp";
const escapadaAmigasImg = "https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/EscapadaAmigas.webp";

export const SERVICIOS = [
  // MASAJES
  { sku: "RELAX30", categoria: "masajes", nombre: "Masaje de Relajación 30 min", precio: 35000, img: relajacionImg, duracionMin: 30  },
  { sku: "RELAX40", categoria: "masajes", nombre: "Masaje de Relajación 40 min", precio: 40000, img: relajacionImg, duracionMin: 40  },
  { sku: "RELAX60", categoria: "masajes", nombre: "Masaje de Relajación 60 min", precio: 45000, img: relajacionImg, duracionMin: 60  },
  { sku: "DESC60",  categoria: "masajes", nombre: "Masaje Descontracturante 60 min", precio: 55000, img: descontracturanteImg, duracionMin: 60  },
  { sku: "PIED60",  categoria: "masajes", nombre: "Masaje Piedras Calientes 60 min", precio: 57000, img: piedrasCalientesImg, duracionMin: 60  },
  { sku: "BOSQUE60",categoria: "masajes", nombre: "Masaje del Bosque 60 min", precio: 47000, img: bosqueImg, duracionMin: 60  },

  // CORPORALES
  { sku: "OLIVO90", categoria: "corporales", nombre: "Olivoterapia 90 min", precio: 72000, img: olivoterapiaImg, duracionMin: 90  },
  { sku: "CHOCO90", categoria: "corporales", nombre: "Chocolaterapia 90 min", precio: 87000, img: chocolaterapiaImg, duracionMin: 90  },
  { sku: "EXFO30",  categoria: "corporales", nombre: "Exfoliación corporal 30 min", precio: 42000, img: exfoliacionImg, duracionMin: 30  },

  // CIRCUITOS & SAUNA
  { sku: "CIRC45",  categoria: "circuitos",  nombre: "Circuito de agua 45 min", precio: 20000, img: circuitoImg , duracionMin: 45  },
  { sku: "SAUNA30", categoria: "circuitos",  nombre: "Sauna seco 30 min", precio: 18000, img: saunaImg , duracionMin: 30  },

  // PROGRAMAS INDIVIDUALES
  { sku: "RENO135", categoria: "individuales", nombre: "Renovación 135 min", precio: 87000, img: renovacionImg, duracionMin: 135  },
  { sku: "DULCE135",categoria: "individuales", nombre: "Dulce aventura en el Bosque 135 min", precio: 102000, img: dulceAventuraImg, duracionMin: 135  },
  { sku: "DAY135",  categoria: "individuales", nombre: "Day Use 135 min", precio: 107000, img: dayUseImg, duracionMin: 135  },

  // PROGRAMAS PAREJAS
  { sku: "NAT115",  categoria: "parejas", nombre: "Programa Bosque Nativo 115 min", precio: 134000, img: bosqueNativoImg, duracionMin: 115  },
  { sku: "MAG135",  categoria: "parejas", nombre: "Programa Bosque Mágico 135 min", precio: 186000, img: bosqueMagicoImg, duracionMin: 135  },

  // ESCAPADA AMIGAS
  { sku: "AMIG115", categoria: "escapada-amigas", nombre: "Programa Escapada de amigas 115 min", precio: 276000, img: escapadaAmigasImg, duracionMin: 115  }
];

/* PARA LA BASE DE DATOS MYSQL, USA ESTE SCRIPT: 
-- =========================================================
-- 1) Crear tabla (si aún no existe)
-- =========================================================
CREATE TABLE IF NOT EXISTS services (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  sku           VARCHAR(20)  NOT NULL UNIQUE,
  nombre        VARCHAR(150) NOT NULL,
  categoria     VARCHAR(50)  NOT NULL,
  precio        DECIMAL(10,0) NOT NULL,
  duracion_min  INT          NOT NULL,
  image_url     VARCHAR(500),
  descripcion   VARCHAR(1000),
  activo        TINYINT(1)   NOT NULL DEFAULT 1
);

-- =========================================================
-- 2) Poblar tabla con los servicios del SPA
--    (ajusta las URLs de image_url con las reales de tu S3)
-- =========================================================

INSERT INTO services
(sku,  nombre,                           categoria,        precio, duracion_min, image_url, descripcion, activo)
VALUES
-- MASAJES
('RELAX30', 'Masaje de Relajación 30 min', 'masajes', 35000, 30,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/relajacion.webp',
 'Masaje de relajación de 30 minutos para aliviar tensión general.', 1),

('RELAX40', 'Masaje de Relajación 40 min', 'masajes', 40000, 40,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/relajacion.webp',
 'Masaje de relajación de 40 minutos, ideal para después de la jornada laboral.', 1),

('RELAX60', 'Masaje de Relajación 60 min', 'masajes', 45000, 60,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/relajacion.webp',
 'Masaje de relajación profunda de 60 minutos para cuerpo y mente.', 1),

('DESC60',  'Masaje Descontracturante 60 min', 'masajes', 55000, 60,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/descontracturante.webp',
 'Masaje focalizado en zonas de mayor tensión muscular, ideal para contracturas.', 1),

('PIED60',  'Masaje Piedras Calientes 60 min', 'masajes', 57000, 60,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/piedras-calientes.webp',
 'Masaje de relajación profunda con piedras calientes que ayuda a descontracturar y relajar.', 1),

('BOSQUE60','Masaje del Bosque 60 min',        'masajes', 47000, 60,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/bosque.webp',
 'Masaje inspirado en la naturaleza del bosque, con aceites aromáticos y maniobras relajantes.', 1),

-- CORPORALES
('OLIVO90', 'Olivoterapia 90 min',             'corporales', 72000, 90,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/olivoterapia.webp',
 'Tratamiento corporal con aceite de oliva que nutre en profundidad la piel.', 1),

('CHOCO90', 'Chocolaterapia 90 min',           'corporales', 87000, 90,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/olivoterapia.webp',
 'Envolvimiento corporal con chocolate que hidrata, tonifica y aporta bienestar.', 1),

('EXFO30',  'Exfoliación corporal 30 min',     'corporales', 42000, 30,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/exfoliacion.webp',
 'Exfoliación corporal completa para renovar la piel y prepararla para otros tratamientos.', 1),

-- CIRCUITOS & SAUNA
('CIRC45',  'Circuito de agua 45 min',         'circuitos',  20000, 45,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/circuito.webp',
 'Recorrido por circuito de agua con diferentes estaciones de hidromasaje y relajación.', 1),

('SAUNA30', 'Sauna seco 30 min',               'circuitos',  18000, 30,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/sauna.webp',
 'Sesión de sauna seco para favorecer la eliminación de toxinas y relajar músculos.', 1),

-- PROGRAMAS INDIVIDUALES
('RENO135', 'Renovación 135 min',              'individuales', 87000, 135,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/renovacion.webp',
 'Programa individual que combina masajes y tratamientos corporales para una renovación completa.', 1),

('DULCE135','Dulce aventura en el Bosque 135 min','individuales', 102000, 135,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/renovacion.webp',
 'Experiencia sensorial con masajes y tratamientos aromáticos de inspiración dulce.', 1),

('DAY135',  'Day Use 135 min',                 'individuales', 107000, 135,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/dayuse.webp',
 'Programa de uso diario del spa que combina circuito, masajes y relajación guiada.', 1),

-- PROGRAMAS PAREJAS
('NAT115',  'Programa Bosque Nativo 115 min',  'parejas', 134000, 115,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/bosqueNativo.webp',
 'Programa para parejas inspirado en la naturaleza, con masajes simultáneos y circuito de agua.', 1),

('MAG135',  'Programa Bosque Mágico 135 min',  'parejas', 186000, 135,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/bosqueMagico.webp',
 'Experiencia premium para parejas con masajes, tratamientos y tiempo de relajación exclusiva.', 1),

-- ESCAPADA AMIGAS
('AMIG115', 'Programa Escapada de amigas 115 min','escapada-amigas', 276000, 115,
 'https://spa-del-bosque-media.s3.us-east-1.amazonaws.com/servicios/imagenes-servicios/EscapadaAmigas.webp',
 'Programa grupal pensado para amigas, que combina tratamientos, circuito y momentos de relajo.', 1);



/*/