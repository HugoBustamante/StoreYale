import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OnExit } from '../../../models/onExit.model';//Importamos la interfaz OneExit
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  //Este metodo le pertenece a la interfaz OnExit
  //Su funcion será la de ejecutar un mensaje de confirmacion en la pagina del register para cuando el usuario quiera salirse de ella.
  //El guardian exit estara escuchando este metodo para saber si nos permite o no la salida de la ruta register:
  onExit(): Observable<boolean> | Promise<boolean> | boolean{
    const confirm = Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false
    });
    return confirm

    // const confirmar= confirm("¿Estas seguro que quieres salir de la pagina?")
    // return confirmar;//Retornará un true o false, dependiendo de la opcion que escojamos en el alert que aparece en el navegador.
  };

}
