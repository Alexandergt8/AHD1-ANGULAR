import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-aplicacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './aplicacion.component.html',
  styleUrl: './aplicacion.component.css'
})
export class AplicacionComponent {
  resultado = '';

  formularioContacto = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.minLength(10)]),
    edad: new FormControl('',[Validators.required,Validators.minLength(1)]),
    dpi: new FormControl('',[Validators.required,Validators.minLength(12)])
  });
  
  listaPersonas: {nombre: string, edad: string, dpi: string}[] = [];
  
  constructor(@Inject(DOCUMENT)private document: Document){
    const localStorage = document.defaultView?.localStorage;

    let datos = localStorage?.getItem("personas");
    if(datos != null){
      let arreglo = JSON.parse(datos);
      if(arreglo != null){
        this.listaPersonas = arreglo;
      }
    }
  }

  enviar(){
    if(this.formularioContacto.valid){
      const nuevaPersona = {
        nombre: this.formularioContacto.value.nombre!,
        edad: this.formularioContacto.value.edad!,
        dpi: this.formularioContacto.value.dpi!,
      };
      this.listaPersonas.push(nuevaPersona);
      this.actualizarLocalStorage();
      this.formularioContacto.reset();
      this.resultado = "Todos los datos son validos";
    }
    else{
      this.resultado  = "Hay datos inválidos en el formulario";
    }
  }


borrarPersonal(index: number){
  this.listaPersonas.splice(index, 1);
  this.actualizarLocalStorage();
}

actualizarLocalStorage(){
  localStorage.setItem("personas", JSON.stringify(this.listaPersonas));
}
}
