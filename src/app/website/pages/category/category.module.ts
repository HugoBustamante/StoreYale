import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SharedModule } from '../../../shared/shared.module';//Importamos porque en la vista tenemos el componente products y como este está componente lo tenemos en nuestro modulo compartido shared entonces con solo importamos ya podemos hacer uso de ese compoennte product en este componente category

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule //Importamos nuestro componente compartido
  ]
})
export class CategoryModule { }
