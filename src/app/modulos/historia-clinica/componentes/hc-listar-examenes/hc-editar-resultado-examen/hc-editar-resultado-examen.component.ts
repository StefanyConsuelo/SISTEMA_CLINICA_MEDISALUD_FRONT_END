import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamenModel } from 'src/app/definiciones/examen.model';
import { ExamenService } from 'src/app/servicios/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hc-editar-resultado-examen',
  templateUrl: './hc-editar-resultado-examen.component.html',
  styleUrls: ['./hc-editar-resultado-examen.component.css']
})
export class HcEditarResultadoExamenComponent implements OnInit {

  cargando : boolean = false;
  mensajeCarga : string = "Cargando datos...";
  form: FormGroup;
  examen:ExamenModel;

  constructor(
    private fb: FormBuilder,
    private examenService: ExamenService,
    private dialogRef: MatDialogRef<HcEditarResultadoExamenComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: ExamenModel
  ) { 
    this.examen = dialogData;
  }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.form = this.fb.group({
      resultado: [this.examen?.resultado],
    });
  }

  async registrar(): Promise<void>{

    this.mensajeCarga = "Guardando...";
    this.cargando = true;

    let examen = new ExamenModel();
    examen.examenId = this.examen.examenId;
    examen.resultado = this.form.get('resultado').value;

    try {
      const res = await this.examenService.editarResultado(examen);

      console.log("resp");
      console.log(res);      
      
      Swal.fire("Éxito", "Se guardo el resultado correctamente.", "success");
      
      this.dialogRef.close({
        guardo: true
      });
      this.cargando = false;
    } catch (error) {
      Swal.fire("Error", "Error en el sistema", "error");
    }
    this.cargando = false;
  }

  async registrarYFinalizar(){
    this.mensajeCarga = "Guardando...";
    this.cargando = true;
    let examen = new ExamenModel();
    examen.examenId = this.examen.examenId;
    examen.resultado = this.form.get('resultado').value;
    try {
      const res = await this.examenService.editarResultado(examen);
      const res2 = await this.examenService.finalizarExamen(examen.examenId);
      Swal.fire("Éxito", "Se guardó y finalizó correctamente.", "success");
      this.dialogRef.close({
        guardo: true
      });
      this.cargando = false;
    } catch (error) {
      Swal.fire("Error", "Error en el sistema", "error");
    }
    this.cargando = false;
  }
}
