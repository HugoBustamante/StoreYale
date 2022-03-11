import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service'; //Importamos el este servicio porque necesitamos el Token para que el guardian lo use para darnos el permiso a nuestra ruta profile. Si hay un Token significa que hay un usuario ocn una sesión
import { Router } from '@angular/router';//Nos permitira hacer redirecciones e ir de forma programatica a una URL en especifico. Es para el tema de Redirects
import { AuthService } from '../services/auth.service';//Importamos porque este es el estado global que tiene el estado de un usuario en un observador.
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //Inyección se dependencia:
  constructor( private tokenServise: TokenService,
              private router: Router, //Nos permitirá hacer redirreciones e ir de forma programatica a una url en especifico.
              private authService: AuthService
    ){}

  //Metodo que nos permite crear el guardian
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Deshabilitamos porque ahora vamos a retornar el observable que tiene el estado del usuario que hace login:
      // const token= this.tokenServise.getToken();//Capturamos el token.
    // if(!token){//Si no existe el token
    //   this.router.navigateByUrl('/home');//Le decimos al router que nos redireccione al home. Aca podriamos usar tambien el metodo navigate(['/home'])
    //   return false;//Con false indicamos que el guardian no nos da permiso
    // }

    //Si existe un token nos permite el ingreso si no, pues no:
    //return token ? true : false; //Este metodo normalmente nos va a retornar un booleano sea en forma de promesa, en forma de Observable o un valor primitivo directo.

    return this.authService.user$ //Retornamos el observable con el estado del usuario. Acá vigilamos el estado del user con este guardian.
    .pipe( //Transformamos con el siguiente map() donde si tenemos un usuario le decimos a nuestro guardian que retorne true o false sino tenemos un usuario.
        map(user => {//Acá recibimos el usuario
            if(!user){//Si no hay un usuario
              this.router.navigateByUrl('/home');//Le decimos al router que nos redireccione al home.
              return false;
            }
            return true;//En true el gurdian nos permitira ingresar a la pagina profile
            //Nota: en este punto tenemos el estado global del usuario y cualquier componente, guardián, pipe, lo que sea podría saber cual es el estado actual de nuestro usuario, si hay o no un usuario y con eso tomar deciciones. Ahora esto tenemos que aplicarlo en nuestro componente profile porque como sabes tenemos que ahorrarnos peticiones y en ese componente hacemos el request de getProfile(), pero no nos sirve porque ya nosotros obtenemos un perfil una vez le damos click en login, teniendo un usuario global interno en nuestra aplicación.
        })
    )
  }

}
