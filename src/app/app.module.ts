//Este es el modulo general de nuestra aplicacion.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';//Importamos para que sea este componente de uso general. Este estará importado tambien en el app-routing.module.ts ya que desde hay controlamos el 404
import { QuicklinkModule } from 'ngx-quicklink';//Importamos el modulo de la ultima estrategia de precarga que viene de ngx-quicklink

@NgModule({
  declarations: [
    AppComponent, //Componente inicial
    NotFoundComponent //Componente para el error 404
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QuicklinkModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
