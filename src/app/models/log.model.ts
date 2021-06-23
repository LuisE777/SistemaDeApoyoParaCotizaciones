export interface Log {  
    id: number;
    lo_name: string;
    description: number;
    subject_id: string;
    subject_type: string;
    causer_id: string;
    causer_type: string;
    properties: string;
    created_at:string;
    updated_at:string;
  }

 //Informe  

  export interface LogInforme {  
    id: number;
    lo_name: string;
    description: number;
    subject_id: string;
    subject_type: string;
    causer_id: string;
    causer_type: string;
    properties: PropsInforme;
    created_at:string;
    updated_at:string;
  }

 export interface PropsInforme {
    attributes: {
      nombre_cotizador: string,
      tipo_informe: string,
      informe_escrito: string,
      id_solicitud: number
    }
}

export interface Stats {  
  "users": number,
  "solicitudes": number,
  "cotizaciones": number,
  "unidades": number
}
//Ends info model
