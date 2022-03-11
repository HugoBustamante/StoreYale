//Este será nuestro modulo compartido, tendrá recursos a compartir hacia otros modulos. Recuerda que debemos importar este modulo en otros modulos para que puedan ser compartidos sus recursos.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from '../shared/directivas/highlight.directive';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ImgComponent } from '../shared/components/img/img.component';
import { RouterModule } from '@angular/router'; //Importamos para que funcionar el routerLink colcoado en la vista del product. Esto lo hacemos para que pueda funcionar sin importar que este modulo compartido no este haciendo uso dle routing
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  //Aquí van los componentes, pipes y directivas que queremos compartir:
  exports: [
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent
  ]
})
export class SharedModule { }
