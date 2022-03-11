import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';

//Al modularizar este componente podemos atomizarlo más. Por ello solo recibimos el id en este modulo
const routes: Routes = [
  {
    path: ':id', //Creamos el path id. El path recibirá un id
    component: CategoryComponent //En ese path vamos a renderizar este componente.
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
