import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AntecedentesModel } from 'src/app/definiciones/antecedentes.model';
import { AntecedentesService } from 'src/app/servicios/antecedentes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hc-antecedentes',
  templateUrl: './hc-antecedentes.component.html',
  styleUrls: ['./hc-antecedentes.component.css']
})
export class HcAntecedentesComponent implements OnInit {

  form: FormGroup;
  cargando: boolean = false;
  mensajeCarga: string = "Guardando datos...";
  antecedente = new AntecedentesModel();

  constructor(
    private fb: FormBuilder,
    private antecedenteService: AntecedentesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.crearForm();
    const historiaClinicaId = document.getElementById("historiaClinicaId").dataset.historiaclinicaid;
    const res = await this.antecedenteService.buscarPor(parseInt(historiaClinicaId));
    this.antecedente = res;
    this.crearForm();
  }

  crearForm(){
    this.form = this.fb.group({
      prenatales: [this.antecedente.prenatalesFisiologicos],
      parto: [this.antecedente.partoFisiologicos],
      grado_instruccion: [this.antecedente.gradoInstruccionFisiologicos],
      comunicaciones: [this.antecedente.comunicacionesFisiologicos],

      alimentacion: [this.antecedente.alimentacionGenerales],
      ejercicios: [this.antecedente.ejerciciosGenerales],
      habitos_nocivos: [this.antecedente.habitosNocivosGenerales],
      alergias: [this.antecedente.alergiasGenerales],
      descripcion_alergia: [this.antecedente.descripcionAlergiaGenerales],

      hipertencion_arterial: [this.antecedente.hipertencionArterialPatologicos],
      hepatitis_viral: [this.antecedente.hepatitisViralPatologicos],
      enfermedades_cardiacas: [this.antecedente.enfermedadesCardiacasPatologicos],
      fiebre_malta: [this.antecedente.fiebreMaltaPatologicos],
      asma: [this.antecedente.asmaPatologicos],
      enfermedad_tiroidea: [this.antecedente.enfermedadTiroideaPatologicos],
      gastritis_ulcera: [this.antecedente.gastritisUlceraPatologicos],
      otras_enfermedades: [this.antecedente.otrasEnfermedadesPatologicos],
      cirugias: [this.antecedente.cirugiasPatologicos],
      medicina: [this.antecedente.medicinaPatologicos],

      enfermedades_mentales: [this.antecedente.enfermedadesCardiacasFamiliares],
      tuberculosis: [this.antecedente.tuberculosisFamiliares],
      diabetes_mellitus: [this.antecedente.diabetesMellitusFamiliares],
      enfermedades_cardiacas_f: [this.antecedente.enfermedadesCardiacasFamiliares],
      hipertencion_arterial_f: [this.antecedente.hipertencionArterialFamiliares],
      otras_enfermedades_f: [this.antecedente.otrasEnfermedadesPatologicos],
    });
  }

  async registrar(): Promise<void>{
    this.cargando = true;
    const datasetHistoriaClinicaId = document.getElementById("historiaClinicaId").dataset.historiaclinicaid;
    const a = new AntecedentesModel();

    a.prenatalesFisiologicos = this.form.get("prenatales").value;
    a.partoFisiologicos = this.form.get("parto").value;
    a.gradoInstruccionFisiologicos = this.form.get("grado_instruccion").value;
    a.comunicacionesFisiologicos = this.form.get("comunicaciones").value;

    a.alimentacionGenerales = this.form.get("alimentacion").value;
    a.ejerciciosGenerales = this.form.get("ejercicios").value;
    a.habitosNocivosGenerales = this.form.get("habitos_nocivos").value;
    a.alergiasGenerales = this.form.get("alergias").value;
    a.descripcionAlergiaGenerales= this.form.get("descripcion_alergia").value;

    a.hepatitisViralPatologicos = this.form.get("hepatitis_viral").value;
    a.hipertencionArterialPatologicos = this.form.get("hipertencion_arterial").value;
    a.enfermedadesCardiacasPatologicos= this.form.get("enfermedades_cardiacas").value;
    a.fiebreMaltaPatologicos = this.form.get("fiebre_malta").value;
    a.asmaPatologicos = this.form.get("asma").value;
    a.enfermedadTiroideaPatologicos = this.form.get("enfermedad_tiroidea").value;
    a.gastritisUlceraPatologicos = this.form.get("gastritis_ulcera").value;
    a.otrasEnfermedadesPatologicos = this.form.get("otras_enfermedades").value;
    a.cirugiasPatologicos = this.form.get("cirugias").value;
    a.medicinaPatologicos = this.form.get("medicina").value;

    a.enfermedadesMentalesFamiliares = this.form.get("enfermedades_mentales").value;
    a.tuberculosisFamiliares = this.form.get("tuberculosis").value;
    a.diabetesMellitusFamiliares = this.form.get("diabetes_mellitus").value;
    a.enfermedadesCardiacasFamiliares = this.form.get("enfermedades_cardiacas_f").value;
    a.hipertencionArterialFamiliares = this.form.get("hipertencion_arterial_f").value;
    a.otrasEnfermedadesFamiliares = this.form.get("otras_enfermedades_f").value;
    a.historiaClinicaId = Number.parseInt(datasetHistoriaClinicaId);
    try {
      const res = await this.antecedenteService.actualizar(a);
      Swal.fire("Éxito","Se guardo los cambios correctamente","success");
      this.cargando = false;
    } catch (error) {
      this.cargando = false;
      Swal.fire("Error", "Error de sistema","error");
    }
  }
}
