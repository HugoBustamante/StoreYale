import { Observable } from 'rxjs';

//Creamos esta interaz con este nombre para que se parezca a los llamados nativos de Angular
//Esta inerfaz se encargará de tener el metodo que le indique a nuestro guardian exit.guard que nos permita salir o no de la pagina de registro, que fue a la que le aplicamos este guardian.
//Esta interfaz la tenemos que importar en el guardian exit para indicarle en su propiedad component que ejecutará un compoennte de este tipo de interfaz
export interface OnExit {
  //El metodo nos debe retornar un observable de tipo boolean, una promesa de tipo boolean o un boolean:
    onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}
