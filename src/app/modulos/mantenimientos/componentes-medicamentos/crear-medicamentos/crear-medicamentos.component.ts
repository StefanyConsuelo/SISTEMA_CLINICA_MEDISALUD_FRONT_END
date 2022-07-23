import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicamentoModel } from 'src/app/definiciones/medicamento.model';
import { MedicamentoService } from 'src/app/servicios/medicamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-medicamentos',
  templateUrl: './crear-medicamentos.component.html',
  styleUrls: ['./crear-medicamentos.component.css']
})
export class CrearMedicamentosComponent implements OnInit {

  cargando:boolean = false;
  mensajeCarga:string = "Cargando datos...";
  form: FormGroup;
  medicamento: MedicamentoModel;

  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private dialogRef: MatDialogRef<CrearMedicamentosComponent>,
    @Inject(MAT_DIALOG_DATA) dataDialog: MedicamentoModel
  ) { 
    if(dataDialog){
      this.medicamento = dataDialog;
    } else {
      this.medicamento = new MedicamentoModel();
    }    
  }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.form = this.fb.group({
      nombre: [ this.medicamento?.nombre, Validators.required ]
    });
  }

  async registrar(): Promise<void> {
    this.cargando = true;
    this.mensajeCarga = "Guardando...";
    let medicamento = new MedicamentoModel();
    let mensaje = "";

    medicamento.nombre = this.form.get("nombre").value;
    medicamento.medicamentoId = this.medicamento.medicamentoId;

    let medicamentoResp = null;
    try {

      if(this.medicamento.medicamentoId){
        await this.medicamentoService.editar(medicamento);
        mensaje = "Se guardó los cambios correctamente.";
      } else {
        medicamentoResp = await this.medicamentoService.registrar(medicamento);
        mensaje = "Se registró el medicamento correctamente.";
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
