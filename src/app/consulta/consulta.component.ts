import { Component, OnInit } from '@angular/core';
import { Consulta } from 'src/model/consulta';
import { ConsultaService } from '../service/consulta.service';
import { DetalleConsultaService } from '../service/detalle-consulta.service';
import {DetalleConsulta } from 'src/model/detalleConsulta';
import { MenuItem } from 'primeng/api/menuitem';
import {MessageService, ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [MessageService,
    ConfirmationService]
})
export class ConsultaComponent implements OnInit {
  
  detalles: DetalleConsulta[];
  consultas: Consulta[];
  consulta: Consulta ={
    id:null,
    nombreMedico:null,
    fecha:null,
    detalleConsulta:null
  };
  selectedConsulta: Consulta ={
    id:null,
    nombreMedico:null,
    fecha:null,
    detalleConsulta:null
  };
  detalle: DetalleConsulta = {
    id:null,
    consulta:null,
    tratamiento:null,
    diagnostico:null
  };
  selectedDetalle: DetalleConsulta = {
    id:null,
    consulta:null,
    tratamiento:null,
    diagnostico:null
  };
 
  cols: any[];
  colsD: any[];
  items: MenuItem[];
  itemsDetalle: MenuItem[];
  diplayNewConsultaDialog: boolean = false;
  displayNewDetalleDialog : boolean = false;
  mostrarTablaDetalle: boolean = false;
  editar: boolean= false;
  constructor(private confirmService: ConfirmationService, private detalleService : DetalleConsultaService,
    private consultaService: ConsultaService, private messageService: MessageService) { }

//metodos mostrar//
nuevoDialogConsulta(editar: boolean) {
  this.editar=editar;
  if(editar){
    if (this.selectedConsulta!=null && this.selectedConsulta.id!=null) {
      this.consulta = this.selectedConsulta;
    }else{
      this.messageService.add({severity:"warn", summary:"Advertencia", detail:"Porfavor seleccione un registro"});
      return;
    }  
  }else{
    this.consulta = new Consulta();
  }
  this.diplayNewConsultaDialog = true;
}
nuevoDialogDetalleConsulta(editar: boolean) {
  this.editar=editar;
  if(editar){
    if (this.selectedDetalle!=null && this.selectedDetalle.id!=null) {
      this.detalle = this.selectedDetalle;
    }else{
      this.messageService.add({severity:"warn", summary:"Advertencia", detail:"Porfavor seleccione un registro"});
      return;
    }  
  }else{
    if(this.selectedConsulta.id!=null){
      this.detalle = new DetalleConsulta();
    }else{
      this.messageService.add({severity:"warn", summary:"Advertencia", detail:"Porfavor seleccione una consulta"});
      return;
    }
    
  }
  this.displayNewDetalleDialog = true;
}

guardarConsulta(){
  if(this.editar){
    console.log("entro al editar");
    this.consultaService.editarConsulta(this.consulta).subscribe(
      (result:any)=>{
        this.deleteObject(this.consulta.id);
        this.consultas.push(this.consulta);
        //this.obtenerConsulta();
        this.messageService.add({severity:"success", summary:"Resultado", detail:"se guardo la consulta correctamente"});
        this.diplayNewConsultaDialog=false;
      },
      error =>{
        console.log(error);
      }    
    );
  }else{
    console.log("entro al guardar");
    this.consultaService.guardarConsulta(this.consulta).subscribe(
      (result:any)=>{
        this.consultas.push(this.consulta);
        //this.obtenerConsulta();
        this.messageService.add({severity:"success", summary:"Resultado", detail:"se guardo la consulta correctamente"});
        this.diplayNewConsultaDialog=false;
      },
      error =>{
        console.log(error);
      }    
    );
  }
  
}
// Eliminar Consulta//
eliminarConsulta(){
  if(this.selectedConsulta == null || this.selectedConsulta.id==null){
    this.messageService.add({severity:"warn", summary:"Advertencia", detail:"Porfavor seleccione un registro"});
  }else{
  this.confirmService.confirm({
    message:"¿esta seguro que desea eliminar el registro?",
    accept: () =>{
      this.consultaService.eliminarConsulta(this.selectedConsulta.id).subscribe(
        (result:any)=>{
          console.log(result);
          this.deleteObject(this.selectedConsulta.id);
          this.messageService.add({severity:"success", summary:"Resultado", detail:"Se elimino la consulta correctamente"});
        }
      )
  }    
  });
}
}
deleteObject(id:number){
  let index = this.consultas.findIndex((e)=>e.id == id);
  if(index != -1){
    this.consultas.splice(index, 1);
  }

}
// guardar Detalle Consulta//
guardarDetalleConsulta(){
  if(this.editar){
    console.log("entro al editar");
    this.detalleService.editarDetalleConsulta(this.detalle).subscribe(
      (result:any)=>{
        this.deleteObject(this.detalle.id);
        this.detalles.push(this.detalle);
        //this.obtenerConsulta();
        this.messageService.add({severity:"success", summary:"Resultado", detail:"se guardo el detalle correctamente"});
        this.displayNewDetalleDialog =false;
      },
      error =>{
        console.log(error);
      }    
    );
  }else{
    console.log("entro al guardar");
    this.detalle.consulta=this.selectedConsulta;
    this.detalleService.guardarDetalleConsulta(this.detalle).subscribe(
      (result:any)=>{
        for (let c of this.consultas) {
          if(this.detalle.consulta.id===c.id){
            this.detalle.consulta=null;
            c.detalleConsulta.push(this.detalle);
            this.detalles.push(this.detalle);
            this.messageService.add({severity:"success", summary:"Resultado", detail:"se guardo el detalle correctamente"});
            this.displayNewDetalleDialog =false;
            return;
          }
        }
      },
      error =>{
        console.log(error);
      }    
    );
  }
  
}
//Eliminar detalle consulta//
eliminarDetalleConsulta(){
  if(this.selectedDetalle == null || this.selectedDetalle.id==null){
    this.messageService.add({severity:"warn", summary:"Advertencia", detail:"Porfavor seleccione un registro"});
  }else{
  this.confirmService.confirm({
    message:"¿esta seguro que desea eliminar el registro?",
    accept: () =>{
      this.consultaService.eliminarConsulta(this.selectedDetalle.id).subscribe(
        (result:any)=>{
          console.log(result);
          this.deleteObjectDeta(this.selectedDetalle.id);
          this.messageService.add({severity:"success", summary:"Resultado", detail:"Se elimino la consulta correctamente"});
        }
      )
  }    
  });
}
}
deleteObjectDeta(id:number){
  let index = this.detalles.findIndex((e)=>e.id == id);
  if(index != -1){
    this.detalles.splice(index, 1);
  }

}
// Metodo inicial //
  ngOnInit(){
    this.obtenerConsulta();
    this.cols = [
      {field:'id', header: 'Id' },
      {field:'nombreMedico', header: 'Nombre Medico' },
      {field:'fecha', header: 'Fecha' }
    ];
    this.colsD = [
      {field:'id', header: 'Id' },
      {field:'diagnostico', header: 'Diagnostico' },
      {field:'tratamiento', header: 'Tratamiento' }
    ];
    this.items=[
      {
        label:"Nuevo",
        icon: 'pi pi-fw pi-plus',
        command: ()=> this.nuevoDialogConsulta(false)
      },
      {
        label:"editar",
        icon: 'pi pi-fw pi-pencil',
        command: ()=> this.nuevoDialogConsulta(true)
      },
      {
        label:"eliminar",
        icon: 'pi pi-fw pi-times',
        command: ()=> this.eliminarConsulta()
      }
    ]
    this.itemsDetalle=[
      {
        label:"Nuevo",
        icon: 'pi pi-fw pi-plus',
        command: ()=> this.nuevoDialogDetalleConsulta(false)
      },
      {
        label:"editar",
        icon: 'pi pi-fw pi-pencil',
        command: ()=> this.nuevoDialogDetalleConsulta(true)
      },
      {
        label:"eliminar",
        icon: 'pi pi-fw pi-times',
        command: ()=> this.eliminarDetalleConsulta()
      }
    ]
  }
  //Metodo traer consultas
  obtenerConsulta(){
    let consul: Consulta[]=[];
    this.consultaService.obtenerConsultas().subscribe(
      (result: any) =>{
        for(let i= 0; i< result.length;i++){
          let consulta = result[i] as Consulta;
          consul.push(consulta);
        }
        this.consultas=consul;
      },
      error=>{
        console.log(error);
      }
    );
  }
  //Metodo obtener objeto consulta
  obtenerId(event: Event, consu: Consulta) {
    
    this.mostrarTablaDetalle=true;
    let deta: DetalleConsulta[]=[];
    if (consu.detalleConsulta!=null) {
      for (let index = 0; index < consu.detalleConsulta.length; index++) {
        let detalle = consu.detalleConsulta[index] as DetalleConsulta;
        deta.push(detalle);
      }
      this.detalles=deta;
    }else{
      console.log("la consulta no tiene detalles");
    }
    console.log(deta);
  }
 
}
