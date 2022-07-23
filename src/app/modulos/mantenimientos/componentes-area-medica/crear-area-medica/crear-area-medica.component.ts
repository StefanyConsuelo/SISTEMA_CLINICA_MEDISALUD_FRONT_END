import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaMedicaModel } from 'src/app/definiciones/area-medica.model';
import { AreaMedicaService } from 'src/app/servicios/area-medica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-area-medica',
  templateUrl: './crear-area-medica.component.html',
  styleUrls: ['./crear-area-medica.component.css']
})
export class CrearAreaMedicaComponent implements OnInit {

  cargando:boolean = false;
  mensajeCarga:string = "Cargando datos...";
  form: FormGroup;
  area: AreaMedicaModel;

  constructor(
    private fb: FormBuilder,
    private areaService: AreaMedicaService,
    private dialogRef: MatDialogRef<CrearAreaMedicaComponent>,
    @Inject(MAT_DIALOG_DATA) dataDialog: AreaMedicaModel
  ) { 
    if(dataDialog){
      this.area = dataDialog;
    } else {
      this.area = new AreaMedicaModel();
    }    
  }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.form = this.fb.group({
      nombre: [ this.area?.nombre, Validators.required ]
    });
  }

  async registrar(): Promise<void> {
    this.cargando = true;
    this.mensajeCarga = "Guardando...";
    let area = new AreaMedicaModel();
    let mensaje = "";

    area.nombre = this.form.get("nombre").value;
    area.areaMedicaId = this.area.areaMedicaId;

    let medicamentoResp = null;
    try {

      if(this.area.areaMedicaId){
        await this.areaService.editar(area);
        mensaje = "Se guardó los cambios correctamente.";
      } else {
        medicamentoResp = await this.areaService.registrar(area);
        mensaje = "Se registró el area médica correctamente.";
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
