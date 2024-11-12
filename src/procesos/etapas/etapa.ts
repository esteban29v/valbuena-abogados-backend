export const EtapasProceso = {
    INICIO: { nombre: 'Inicio proceso', porcentaje: 5 },
    PRESENTACION: { nombre: 'Presentación de demanda', porcentaje: 15 },
    ADMISION: { nombre: 'Admisión de demanda', porcentaje: 30 },
    CONTESTACION: { nombre: 'Contestación de demanda', porcentaje: 45 },
    PROBATORIA: { nombre: 'Etapa probatoria', porcentaje: 60 },
    AUDIENCIA: { nombre: 'Audiencia juicio', porcentaje: 75 },
    SENTENCIA: { nombre: 'Sentencia juez', porcentaje: 90 },
    APELACION: { nombre: 'sentencia apelada', porcentaje: 90 },
    FIN: { nombre: 'Finalización proceso', porcentaje: 100 },
    
  } as const;
  
  export type EtapaProceso = keyof typeof EtapasProceso;