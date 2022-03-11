import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SwiperModule } from 'swiper/angular';//Este es un modulo extenerno que debemos importar porque el modulo website lo está usando en algun componente de su modulo.
import { SharedModule } from '../shared/shared.module';//Importamos nuestro recurso compartido para poder usar sus recursos dentro de este modulo
import { QuicklinkModule } from 'ngx-quicklink';//Importamos para que la precarga quede habilitad con las estrategia de Quicklink en todos los submodulos que tenga este modulo website. Con esto cada modulo que tenga un RouterLink y este aparezca en pantalla, Quicklink lo va a observar y a hacer la precarga de ese modulo

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    MycartComponent,
    ProductDetailComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule, //Agregamos el modulo compartido a este modulo.
    QuicklinkModule
  ]
})
export class WebsiteModule { }
