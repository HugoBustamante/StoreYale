//Este es el Routing general de nuestra aplicación. Todo lo que este aquí será general en el resto de nuestra app.
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';//Importamos PreloadAllModules porque queremos que precargue todos los modulos
import { NotFoundComponent } from './not-found/not-found.component';//Importamos para renderizarlo en la ruta '**' para el error 404
import { CustomPreloadService } from './services/custom-preload.service';//Servicio que contiene la estrategia de precarga para los modulos que nosotros elegimos.
import { QuicklinkStrategy } from 'ngx-quicklink';//Importamos la ultima estrategia de precarga que viene de ngx-quicklink. Para que funcione se debe importar el QuicklinkModule en el modulo que queremos que se habilite la precarga
import { AdminGuard } from './guards/admin.guard';//Importamos este guard para no permitirle ingreso a la pagina CMS a un usuario que no sea un administrador. Lo usaremos activando su tipo en el path cms

//Creamos unas reglas para establecer las rutas de las paginas segun su componente correspondiente:
const routes: Routes = [
  //Debemos indicarle a este archivo routing que es el principal de nuestra app, como ira nuestro Modulo Website y CMS:
  {
    path: '',//Path para renderizar nuestro modulo Website:
    loadChildren: () => import('./website/website.module').then(modulo => modulo.WebsiteModule),//De esta forma se importa un modulo externo a nuestro routing principal. Acá aplicamos lazyloading y code spritting
    data: {//Indicamos que la ruta de este modulo tendrá precarga
      preload: true,
    }
  },
  {
    path: 'cms',//Path para renderizar nuestro modulo CMS.
    canActivate: [AdminGuard],//Activamos el tipo de proteccion del guard, que no va a permitir ingresar alli al modulo general CMS si no cumple con la condición del guardian. Recuerda puedes aplicar guardianes a rutas especificas pero tambien a modulos de forma directa
    loadChildren: () => import('./cms/cms.module').then(modulo => modulo.CmsModule)//De esta forma se importa un modulo en nuestro routing principal. Esta parte en especifica es la que nos habilita hacer lazyloading y code spritting ya que lo estamos haciendo de forma modular.
  },
  {
    path: '**',//El ** significa cuando no encuentre nada.
    component: NotFoundComponent //Entonces nos iremos a esta pagina componente.
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //preloadingStrategy: PreloadAllModules //Habilitamos la precarga para todos nuestros modulos por defecto de Angular con PreloadAllModules
    //preloadingStrategy: CustomPreloadService//Habilitamos la estrategia de precarga que nosotros elegimos en este servicio. Se precargarán solo los modulos que nosotros elegimos tengan la bandera de preload.
    preloadingStrategy: QuicklinkStrategy, //Habilitamos la estrategia de precarga que de acuerdo al link donde el usuario este se descargará el Chunk js del modulo en que se este
  }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
