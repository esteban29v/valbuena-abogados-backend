export const EtapasProceso = {
    INICIO: { nombre: 'Inicio', porcentaje: 5 },
    PRESENTACION: { nombre: 'Presentación Demanda', porcentaje: 15 },
    ADMISION: { nombre: 'Finalización', porcentaje: 30 },
    CONTESTACION: { nombre: 'Finalización', porcentaje: 45 },
    PROBATORIA: { nombre: 'Finalización', porcentaje: 60 },
    AUDIENCIA: { nombre: 'Finalización', porcentaje: 75 },
    SENTENCIA: { nombre: 'Finalización', porcentaje: 90 },
    APELACION: { nombre: 'Finalización', porcentaje: 90 },
    FIN: { nombre: 'Finalización', porcentaje: 100 },
    
  } as const;
  
  export type EtapaProceso = keyof typeof EtapasProceso;