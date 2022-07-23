import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit {

  anios:number[]=[];

  constructor() { 
    this.establecerAnios();
  }

  ngOnInit(): void {}

  establecerAnios(){
    const anioActual = new Date().getFullYear();
    for (let index = anioActual - 10; index <= anioActual; index++) {
      this.anios.unshift(index);
    }
  }
  
}
