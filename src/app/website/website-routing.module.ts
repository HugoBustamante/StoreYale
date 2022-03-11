import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importamos las paginas a las que vamos hacer routing en este modulo website:
import { LayoutComponent } from './components/layout/layout.component';//Para el tema de modulación lo importamos. Este componente lo hemos creado porque en este componente vamos a renderizar el app-nav y manejar las rutas.
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';//Para agregar la ruta de los detalles de un producto

import { AuthGuard } from '../guards/auth.guard';//Importamos nuestros guardianes para usar nuestro primer guardian que protegera nuestro ruta de profile.
import { ExitGuard } from '../guards/exit.guard';//Importamos este guardian para usarlo en nuestra ruta de registro.

const routes: Routes = [
  {
    //Segunda forma para cargar el home inicialmente con el cargue de la pagina por medio de redireccionamiento:
      path: '',//Cuando tengamos una ruta en vacio
      redirectTo: '/home',//Nos redireccionamos al path home
      pathMatch: 'full'
    },
    {
      path: '',//Cuando tengamos una ruta en vacio
      component: LayoutComponent,//Indicamos que el path inicial va a tener este componente.

      //Para que la aplicación sea un poco más abstracta y lista para implementar algunos otros módulos que no tengan nuestro nav los volvemos hijos del LayoutComponent que tiene el componente nav listo para renderizar:
      children: [//Le decimos que el componente LayoutComponent tiene hijos. Los hijos van a ser todas nuestras rutas del website, menos el notFound porque queremos que ese funcione para toda la aplicación
        {
          path: 'home',//Para que nos cargue la pagina incialmente con el home, la segunda forma es dejar vacio este path
          component: HomeComponent
        },
        {
          //Tema: precarga de modulos: pasaremos un submodulo a este modulo website para generar un Chunk js a parte y hacer más lazyloading permitiendo que el modulo category solo se cargue cuando se necesite dentro de la app:
          path: 'category',//necesitamos recibir el id de la categoria eso lo conseguimos automaticamente al importar el modulo category como un submodulo del module website para el path category. al importar abajo como un hijo esta ruta queradia category/:id
          loadChildren: () => import('./pages/category/category.module').then(modulo => modulo.CategoryModule),//de esta forma importamos el modulo de category como un submodulo. Acá aplicamos lazyloading y code spritting por lo que este modulo category solo va a cargar cuando estemos en la ruta de category
          data: {//Indicamos que la ruta de este modulo tendrá precarga
            preload: true,
          }
        },
        {
          path: 'product/:id',//Necesitamos recibir el id del producto para renderizarlo en la ruta que acabamos de crear product
          component: ProductDetailComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'register',
          canDeactivate: [ExitGuard],//Implementamos nuestro guardian en este path del registro
          component: RegisterComponent
        },
        {
          path: 'recovery',
          component: RecoveryComponent
        },
        {
          path: 'profile',
          canActivate: [ AuthGuard ],// agregamos nuestro guardian que protegera el acceso a esta ruta profile
          component: ProfileComponent
        },
        {
          path: 'mycart',
          component: MycartComponent
        },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
