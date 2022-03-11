import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';//Importamos para hacerle uso en este guardian que permitira solo el acceso al CMS a los usuarios con un rol de administrador
import { Router } from '@angular/router';//Lo usaremos para redireccionar al usuario en tal caso de que no tengamos un usuario listo para que el guardian le de permiso al CMS
import { map } from 'rxjs/operators';//Importamos para transformar el request hacia el estado global del usuario

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private authService: AuthService,
              private router: Router
    ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.user$ //Retornamos el observable con el estado del usuario. Acá vigilamos el estado del user con este guardian.
      .pipe( //Transformamos con el siguiente map() donde si tenemos un usuario le decimos a nuestro guardian que retorne true, o false sino tenemos un usuario.
          map(user => {//Acá recibimos el
            //Con el ?. protejemos que no tengamos un error porque el usuario puede ser null. Entonces TypeScrip sabe que el resultado puede ser nulo entonces lo va a saber manejar:
              if(user?.role === 'admin'){//Si hay un usuario con rol admin
                return true;//true, el guardian deja ingresar al usuario administrador a la pagina CMS
              }
              else{
                this.router.navigateByUrl('/home');//Le decimos al router que nos redireccione al home.
                return false//false, el guardian no permitira ingresar a la pagina CMS
              }
            //Nota: ahora este guardian lo vamos a usar en la ruta cms, especificamente lo importamos en el routing principal de la aplicacion donde se maneja las rutas para usarlo allí.
          })
      )
  }

}
