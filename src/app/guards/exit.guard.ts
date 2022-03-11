import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OnExit } from '../models/onExit.model';//Importamos la interfaz que va a tipar el componente que recibe nuestro guardian:

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: OnExit, //Acá recibimos el componente. Lo tipamos con onExit para que sea de esté tipo interfaz
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // const confirmar=  confirm("¿Estas seguro que quieres salir de está pagina?")//Creamos un alert con el metodo confirm() que es nativo de JavaScript. El pensado es que nuestro guardián muestre este alert de confirmación cuando queramos salir de la pagina de registro, si le damos confirmar entonces la respuesta será true por lo que el guardián nos dejará salir, pero si le damos cancelar, le devolverá un false al guardián por lo que este no nos dejará salir de la pagina de registro.
    // return confirmar; //true, el guardian no nos permite salir
    return component.onExit ? component.onExit() :true; //Si la propiedad component tiene la funcion onExit, ejecute la funcion, sino, pues no y permitamosle la salida de la pagina register al usuario
  }

}
