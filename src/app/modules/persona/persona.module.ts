import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { ListarPersonaComponent } from './listar-persona/listar-persona.component';
import { AddEditPersonaComponent } from './add-edit-persona/add-edit-persona.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//angular material
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ListarPersonaComponent,
    AddEditPersonaComponent
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListarPersonaComponent
  ]
})
export class PersonaModule { }
