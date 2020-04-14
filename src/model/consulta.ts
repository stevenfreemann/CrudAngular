import {DetalleConsulta } from 'src/model/detalleConsulta';
export class Consulta{
    
    constructor(public id:number=null, public nombreMedico:string=null,
        public fecha: string=null, public detalleConsulta:DetalleConsulta[]=null){

        }
}
