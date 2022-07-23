import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaMedicaModel } from 'src/app/definiciones/area-medica.model';
import { ServicioModel } from 'src/app/definiciones/servicio.model';
import { AreaMedicaService } from 'src/app/servicios/area-medica.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-servicios-especialidad',
  templateUrl: './crear-servicios-especialidad.component.html',
  styleUrls: ['./crear-servicios-especialidad.component.css']
})
export class CrearServiciosEspecialidadComponent implements OnInit {

  cargando:boolean = false;
  mensajeCarga:string = "Cargando datos...";
  form: FormGroup;
  servicio: ServicioModel;

  areasMedicas: AreaMedicaModel[] = [];

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private dialogRef: MatDialogRef<CrearServiciosEspecialidadComponent>,
    private areaMedicaService: AreaMedicaService,
    @Inject(MAT_DIALOG_DATA) dataDialog: ServicioModel
  ) { 
    if(dataDialog){
      this.servicio = dataDialog;
      console.log("this.servicio");      
      console.log(this.servicio);
      
    } else {
      this.servicio = new ServicioModel();
    }
  }

  async ngOnInit(): Promise<void> {
    this.crearForm();
    this.cargando = true;
    this.areasMedicas = await this.areaMedicaService.listarTodos();
    this.cargando = false;
    this.crearForm();
  }

  crearForm(){
    this.form = this.fb.group({
      nombre: [ this.servicio?.nombre, Validators.required ],
      areaMedica: [ this.servicio?.areaMedica?.areaMedicaId, Validators.required ]
    });
  }

  async registrar(): Promise<void>{
    this.cargando = true;
    this.mensajeCarga = "Guardando...";
    let servicio = new ServicioModel();
    let mensaje = "";

    servicio.nombre = this.form.get("nombre").value;
    servicio.areaMedica = new AreaMedicaModel();
    servicio.areaMedica.areaMedicaId = this.form.get("areaMedica").value;
    servicio.servicioId = this.servicio.servicioId;

    let medicamentoResp = null;
    try {

      if(this.servicio.servicioId){
        await this.servicioService.editar(servicio);
        mensaje = "Se guardó los cambios correctamente.";
      } else {
        medicamentoResp = await this.servicioService.registrar(servicio);
        mensaje = "Se registró el servicio correctamente.";
      }

      this.dialogRef.close({
        guardo: true
      });

      Swal.fire( 'Éxito', mensaje, 'success' );

    } catch (error) {
      Swal.fire( 'Error', error.error, 'error' );
      this.dialogRef.close({
        guardo: false
      });
    }
    this.cargando = false;
  }
}
