import { Consulta } from './consulta';

export class DetalleConsulta{
    constructor(public consulta: Consulta= null ,public id:number = null, public diagnostico:string = null,
        public tratamiento: string = null){
    }
}