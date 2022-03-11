import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  //Metodo para eliminar el Token. Este metodo lo tenemos que conectar a neustro servicio de Auth:
  removeToken(){
    localStorage.removeItem('token')//Eliminamos el token que se almacena en el localStorage.
  }
}
