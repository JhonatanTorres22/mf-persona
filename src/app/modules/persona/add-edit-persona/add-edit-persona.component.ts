import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaService } from 'src/app/arquitectura/services/persona.service';
import { AgregarPersona, EditarPersona } from 'src/app/core/models/persona.model';

@Component({
  selector: 'app-add-edit-persona',
  templateUrl: './add-edit-persona.component.html',
  styleUrls: ['./add-edit-persona.component.scss']
})
export class AddEditPersonaComponent implements OnInit{

  operacion!: string;
  formPersona!: FormGroup;
  modoAgregando: boolean = false

  constructor(
    private personaService:PersonaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ){
    this.formPersona = this.fb.group({
      idPersona: [],
      nombres:[],
      apellidoPaterno: [],
      apellidoMaterno: [],
      nDocumento: [],
      telFijo: [],
      telCelular:[],
      correoElectronico: [],
      nombreUsuario: [],
      contrasenia: [],
    })
  }

  ngOnInit(): void {
    if(this.data.tipo == 1){
      this.operacion = 'AGREGAR';
      this.modoAgregando = true;
    }
    else{
      this.operacion = 'EDITAR';
      this.editarPersona(1);
      this.modoAgregando = false
    }
  }

  agregarPersona(){
    let agregarPersona: AgregarPersona = {
      apellidoPaterno: this.formPersona.value.apellidoPaterno,
      apellidoMaterno: this.formPersona.value.apellidoMaterno,
      contrasenia: this.formPersona.value.contrasenia,
      correoElectronico: this.formPersona.value.correoElectronico,
      nDocumento: this.formPersona.value.nDocumento,
      nombres: this.formPersona.value.nombres,
      nombreUsuario: this.formPersona.value.nombreUsuario,
      telCelular: this.formPersona.value.telCelular,
      telFijo: this.formPersona.value.telFijo,
      usuarioCreacion: 1
    }
    console.log(agregarPersona);

    this.personaService.agregarPersona(agregarPersona).subscribe({
      next:(data:AgregarPersona) => {
        console.log('agregadoooooo');
        
      }
    })
  }

  editarPersona(estado:number){
    let editarPersona : EditarPersona = {
      idPersona:this.data.persona.idPersona,
      nombres:this.formPersona.value.nombres,
      apellidoPaterno:this.formPersona.value.apellidoPaterno,
      apellidoMaterno:this.formPersona.value.apellidoMaterno,
      nDocumento:this.formPersona.value.nDocumento,
      telFijo:this.formPersona.value.telFijo,
      telCelular:this.formPersona.value.telCelular,
      correoElectronico:this.formPersona.value.correoElectronico,
      nombreUsuario:this.formPersona.value.nombreUsuario,
      // contrasenia:this.formUsuarios.value.contrasenia,
      usuarioModificacion:1,
    }
    this.formPersona.patchValue({
      idPersona:this.data.persona.idPersona,
      nombres:this.data.persona.nombres,
      apellidoPaterno:this.data.persona.apellidoPaterno,
      apellidoMaterno:this.data.persona.apellidoMaterno,
      nDocumento:this.data.persona.nDocumento,
      telFijo:this.data.persona.telFijo,
      telCelular:this.data.persona.telCelular,
      correoElectronico:this.data.persona.correoElectronico,
      nombreUsuario:this.data.persona.nombreUsuario,
      // contrasenia:this.data.usuarios.contrasenia,
      usuarioModificacion: 1,
    });

    if(estado == 1) {return};
    this.personaService.editarPersona(editarPersona).subscribe({
      next:(editarPersona:EditarPersona) => {
        console.log('editandooooo');
        
      }
    })

  }

  add_edit(){
    if(this.data.tipo == 1){
      this.agregarPersona();
    }
    else{
      this.editarPersona(2)
    }
  }
}
