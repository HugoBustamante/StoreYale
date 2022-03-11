
//Este es el Store global donde almacenamos reactivamente el estado del usuario
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { TokenService } from './../services/token.service';
import { BehaviorSubject } from 'rxjs';//Importamos para este observador para almacenar un estado de login del usuario


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;
  //Almacenaremos el estado del usuario esté logueado en el BehaviorSubject.
  private user = new BehaviorSubject<User | null>(null);//Damos un estado inicial de null, es decir que puede no haber un usuario que esta autentificado. Entonces el Behavior nos puede devolver un User que esta autentificado o un null sino
  user$ = this.user.asObservable();//Habilitamos este servicio para que otros componentes se puedan subscribir a este Observable

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  //Metodo para traer el profile del usuario:
  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      //Con tap recuerda que hacemos una accion sin transformar nada, solo una accion cuando recibamos en este caso el perfil:
      tap(profileUser => this.user.next(profileUser))//Dejamos el perfil usuario en el estado global que creamos con el o BehaviorObserver (lo enviamos allí). Cada vez que este metodo se llame vamos a nutrir a el estado global
    )
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }

  //Metodo para hacer logout. Este metodo lo tenemos que agregar en el componente nav donde esta el login:
  logout(){
    this.tokenService.removeToken();//Llamamos a este metodo para remover el token del localStorage
  }
}
