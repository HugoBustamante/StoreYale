import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';//Importamos el servicio que maneja las autentificaciones
import { User } from './../../../models/user.model'//Queremos renderizar un modelo de perfil del usuario

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //Creamos la variable que guardará al usuario y la usaremos para renderizar el perfil en la vista de esta pagina
  user: User | null = null;

  //Inyeccion de dependencias:
  constructor( private authService: AuthService) { }

  //Con este metodo vamos a soliticar la información del usuario a la API y la almacenaremos en la variable user:
  ngOnInit(): void {
    //this.authService.getProfile() //Nos ahorramos esta peticion del profile porque nuestro usuario ya tiene un estado global en nuestra aplicacion, por ello abajo solicitamos directamente ese usuario logueado
    this.authService.user$ //solicitamos al usuario que esta logueado su información
    .subscribe(data => {
      this.user= data; //Almacenamos los datos en la variable user
    })
  }

}
