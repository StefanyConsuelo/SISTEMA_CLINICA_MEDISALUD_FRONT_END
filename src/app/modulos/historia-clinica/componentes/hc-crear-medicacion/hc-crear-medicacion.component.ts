import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetalleMedicacionModel } from 'src/app/definiciones/detalle-medicacion.model';
import { MedicamentoModel } from 'src/app/definiciones/medicamento.model';
import { MedicamentoService } from 'src/app/servicios/medicamento.service';

@Component({
  selector: 'app-hc-crear-medicacion',
  templateUrl: './hc-crear-medicacion.component.html',
  styleUrls: ['./hc-crear-medicacion.component.css']
})
export class HcCrearMedicacionComponent implements OnInit {

  form: FormGroup;
  medicamentos: MedicamentoModel[] = [];

  @Output() notificarRegistroNuevo: EventEmitter<any> = new EventEmitter();
  @Output() notificarNuevaFila: EventEmitter<DetalleMedicacionModel> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService
  ) { }

  async ngOnInit(): Promise<void> {
    this.crearForm();
    this.medicamentos = await this.medicamentoService.listarTodos();
  }

  crearForm(){
    this.form = this.fb.group({
      medicamento: ['', Validators.required],
      via: ['', Validators.required],
      duracion: ['', Validators.required],
      frecuencia: ['', Validators.required],
      indicaciones: ['', Validators.required],
      dosis: ['', Validators.required]
    });
  }

  agregarFila(){
    let dm = new DetalleMedicacionModel();
    dm.medicamento = this.form.get("medicamento").value;
    dm.via = this.form.get("via").value;
    dm.duracion = this.form.get("duracion").value;
    dm.frecuencia = this.form.get("frecuencia").value;
    dm.indicaciones = this.form.get("indicaciones").value;
    dm.dosis = this.form.get("dosis").value;
    this.notificarNuevaFila.emit(dm);

    this.crearForm();
  }
}
