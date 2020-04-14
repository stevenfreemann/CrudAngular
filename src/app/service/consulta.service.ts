import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from 'src/model/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  c:any={};
  raizurl:string = "http://localhost:8080/"
  +"clinica-app-web/rest/consultas";

  constructor(private http:HttpClient) { }
  obtenerConsultas(): Observable<any>{
    return this.http.get(this.raizurl+"/buscar");
  }
  guardarConsulta(consulta: Consulta): Observable<any>{
    let headers = new HttpHeaders();
    headers= headers.set('Content-Type','application/json');
    return this.http.post(this.raizurl+"/guardar", JSON.stringify(consulta),{headers: headers}); 
  }
  editarConsulta(consulta: Consulta): Observable<any>{
    let headers = new HttpHeaders();
    headers= headers.set('Content-Type','application/json');
    return this.http.put(this.raizurl+"/editar", JSON.stringify(consulta),{headers: headers}); 
  }
  eliminarConsulta(id:number): Observable<any>{
    return this.http.delete(this.raizurl+"/eliminar/"+id);
  }
}
