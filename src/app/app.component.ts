import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
//Importamos estos dos servicios para detectar que un usuario ya tenia una sesion iniciada:
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {//Implementamos para poder usar el metodo ngOnInit()
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
    private autService: AuthService,
    private tokenService: TokenService
  ) {}

  //Metodo para que cuando el usuario cargue la aplicacion, evaluemos si habia un usuario identificado:
  ngOnInit(){
      const token= this.tokenService.getToken();//Solicitamos el token para asegurarnos que si hay un usuario logueado
      if(token){//Si tenemos un token
        this.autService.getProfile()//Obtenemos el perfil del usuario logueado. Entonces cada vez que cargue nuestra aplicacion igual en el app.component vamos a estar evaluando si hay un Token. Entonces si, si hay un token hacemos la peticion del getProfile, y en ese metodo dejamos al usuario en el estado global que es el guardian y cualquier componente que este subscribto a el, puede obtener la información
        .subscribe() //Necesitamos del subcribe para que se ejecute
      }
  }

  //Metodo para crear un usuario en la API:
  createUser() {
    this.usersService.create({
      name: 'Sebas',
      email: 'sebas@mail.com',
      password: '1212',
      role: 'customer'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  downloadPdf() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }

  }
}
