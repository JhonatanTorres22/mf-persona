import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from 'src/app/arquitectura/services/persona.service';
import { EliminarPersona, ListarPersona } from 'src/app/core/models/persona.model';
import { AddEditPersonaComponent } from '../add-edit-persona/add-edit-persona.component';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.scss']
})
export class ListarPersonaComponent implements OnInit{

  displayedColumns: string[] = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'nDocumento', 'correoElectronico', 'acciones']
  listaDePersona!:ListarPersona;
  listarPersona: MatTableDataSource<ListarPersona>;

  constructor(
     private personaService:PersonaService,
     private dialog: MatDialog
      ){

    this.listarPersona = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.listaPersona();
  }

  listaPersona(){
    this.personaService.listarPersona().subscribe({
      next: (persona:ListarPersona[] ) => {
        this.listarPersona.data = persona;
        console.log(this.listarPersona.data, '***');
        

      }
    })
  }

  abrirModalAddEditPersona(persona:ListarPersona, tipo:number){
    const dialogRef = this.dialog.open(AddEditPersonaComponent, {
      disableClose : true,
      data: {persona : persona, tipo : tipo},
      width: '500px'
    })

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.listaPersona();
      }, 400);
    })
  }

  eliminarPersona(listarPersona: ListarPersona){
    this.personaService.eliminarPersona(listarPersona.idPersona, 1).subscribe({
      next: (eliminarPersona:EliminarPersona) => {
        console.log('eliminandooooo');
        this.listaPersona()
        
      }
    })
  }
}
