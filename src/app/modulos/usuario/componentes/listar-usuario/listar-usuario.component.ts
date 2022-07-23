import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { UsuarioModel } from 'src/app/definiciones/usuario.model';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  displayedColumns: string[] = ["username","nombre_usuario","perfil","enabled","acciones"];
  dataSource = [];
  totalFilas = 0;

  cargando: boolean = true;
  mensajeCarga: string = "Cargando datos...";

  @ViewChild(MatTable) matTableUsuario: MatTable<UsuarioModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( 
    private usuarioService: UsuarioService,
    private authService: LoginService) { }

  ngOnInit(): void {
    
  }

  async ngAfterViewInit(): Promise<void> {
    this.paginator._intl.itemsPerPageLabel = "Cantidad de items por página";
    this.cargarDatos();
  }

  async cargarDatos(): Promise<void>{

    this.cargando = true;
    const res = await this.usuarioService.listarPaginado({
      "numeroPagina": this.paginator.pageIndex + 1,
      "totalFilasPagina": this.paginator.pageSize
    });
    this.dataSource = res.datos;
    this.totalFilas = res.totalFilas;
    this.cargando = false;
  }

  getNombreDelUsuario( usuario: UsuarioModel ): string {
    if(usuario.persona){
      return usuario.persona.nombres + ", " + usuario.persona.apellidoPaterno + " " + usuario.persona.apellidoMaterno;
    } else {
      return "";
    }
  }

  async eliminar( fila: UsuarioModel ): Promise<void>{
    Swal.fire({
      title: `Seguro desea eliminar el usuario ${fila.username}?`,
      text: 'Al presionar si, se procede a eliminar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar.',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Eliminando...";
          const res = await this.usuarioService.eliminar(fila.usuarioId);
          this.paginator.pageIndex = 0;
          this.cargarDatos();          
          Swal.fire('Eliminado!','Se eliminó correctamente.','success');
        } catch (error) {
          Swal.fire('Error!','Error de sistema.','error');
        }
      }
    });
  }
  async bloquear( fila: UsuarioModel ): Promise<void>{
    Swal.fire({
      title: `Seguro desea bloquear el usuario ${fila.username}?`,
      text: 'Al presionar si, se procede a bloquear.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, bloquear.',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Bloqueando...";
          const res = await this.usuarioService.bloquear(fila.usuarioId);
          this.paginator.pageIndex = 0;
          this.cargarDatos();          
          Swal.fire('Bloqueado!','Se bloqueó correctamente.','success');
        } catch (error) {
          Swal.fire('Error!','Error de sistema.','error');
        }
      }
    });
  }
  async desbloquear( fila: UsuarioModel ): Promise<void>{
    Swal.fire({
      title: `Seguro desea desbloquear el usuario ${fila.username}?`,
      text: 'Al presionar si, se procede a desbloquear.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, desbloquear.',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Bloqueando...";
          const res = await this.usuarioService.desbloquear(fila.usuarioId);
          this.paginator.pageIndex = 0;
          this.cargarDatos();          
          Swal.fire('Desbloqueado!','Se desbloqueó correctamente.','success');
        } catch (error) {
          Swal.fire('Error!','Error de sistema.','error');
        }
      }
    });
  }

  tienePermisoRol( codigoRol:string, codigoModulo: string ): boolean{
    const tienePermiso = this.authService.validarPermisoRol(codigoRol, codigoModulo);
    return tienePermiso;
  }
}
