import relajacionImg from '/Productos/relajacion.png'
import descontracturanteImg from '/Productos/descontracturante.png'
import piedrasCalientesImg from '/Productos/piedras-calientes.png'
import bosqueImg from '/Productos/bosque.png'
import olivoterapiaImg from '/Productos/olivoterapia.png'
import chocolaterapiaImg from '/Productos/chocolaterapia.png'
import exfoliacionImg from '/Productos/exfoliacion.png'
import circuitoImg from '/Productos/circuito.png'
import saunaImg from '/Productos/sauna.png'
import renovacionImg from '/Productos/renovacion.png'
import dulceAventuraImg from '/Productos/dulceaventura.png'
import dayUseImg from '/Productos/dayuse.png'
import bosqueNativoImg from '/Productos/bosqueNativo.png'
import bosqueMagicoImg from '/Productos/bosqueMagico.png'
import escapadaAmigasImg from '/Productos/EscapadaAmigas.png'

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