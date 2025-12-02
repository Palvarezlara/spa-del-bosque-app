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