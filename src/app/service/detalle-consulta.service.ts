import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleConsulta } from 'src/model/detalleConsulta';

@Injectable({
  providedIn: 'root'
})
export class DetalleConsultaService {
  
  raizurl:string = "http://localhost:8080/"
  +"clinica-app-web/rest/detalleConsultas";

  constructor(private http:HttpClient) {}
  guardarDetalleConsulta(detalle: DetalleConsulta): Observable<any>{
    let headers = new HttpHeaders();
    headers= headers.set('Content-Type','application/json');
    let p = JSON.stringify(detalle);
    console.log(p);
    return this.http.post(this.raizurl+"/guardar", JSON.stringify(detalle),{headers: headers}); 
  }
  editarDetalleConsulta(detalle: DetalleConsulta): Observable<any>{
    let headers = new HttpHeaders();
    headers= headers.set('Content-Type','application/json');
    let p = JSON.stringify(detalle);
    console.log(p);
    return this.http.put(this.raizurl+"/editar", JSON.stringify(detalle),{headers: headers}); 
  }
  eliminarDetalleConsulta(id:number): Observable<any>{
    return this.http.delete(this.raizurl+"/eliminar/"+id);
  }
   }

