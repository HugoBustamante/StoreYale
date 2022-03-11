import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy{

  constructor() { }

  //Creamos nuestra estrategia de precarga, el primer parametro recibe la ruta
  //El segundo parametro recibe un metodo que recibe una funcion que retornará un observable tipo any
  //Nuestra función preload debe retornar un observable por eso lo indicamos en la firma del metodo
  preload(route: Route, load: () => Observable<any>): Observable<any> {
      //Escogeremos la ruta a precargar en el siguiente if:
      //Indicamos que queremos ir a la data de una route y si en data esta habilitada la opcion 'preload'
      if(route.data && route.data['preload']){
        return load();//Retornamos el metodo load
      }
      //Sino enviamos un observable en vacio:
      else{
        return of(null);//Así se envia un observable en vacio, toca importar este metodo of
      }
  //Nota: ya creamos nuestra estrategia de precarga ahora lo que queda es solo indicarle a las rutas de los modulos a los que queremos que hagan una precarga.
  }
}
