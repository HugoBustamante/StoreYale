import { Component, OnInit } from '@angular/core';

import { StoreService } from './../../../services/store.service'
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../models/user.model';
import { CategoriesService } from './../../../services/categories.service';//Importamos para usar este servicio para la funcionalidad de renderizar dinamicamente las categorias en las opciones del menu de este nav.
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[]= []//Acá almacenamos los productas de la categoria solicitada

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  //Metodo que recive los servicios globales con los respectivos observadores, uno que esta a la escucha al añadir los productos al carrito y el otro traer la información del usuario que esta en el estado global de la app:
  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
      this.authService.user$//Obtenemos el usuario del estado global
      .subscribe(user => {
        this.profile= user;//Nutrimos de ese estado a la variable profile con la informacion de ese usuario logueado. (Acá reemplazamos el codigo del metodo login() donde tambien obteniamos el perfil del usuario pero no de un estado global del usuario)
      })
    });
    //Llamamos este metodo para Obtener las categorias apenas el componente empiece a renderizar gracias a la funcionalidad del ngOnInit():
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(() => {
      this.router.navigate(['/profile'])//Cuando hagamos login nos redirigiremos al la pagina profile.
    });
  }

  //Creamos el metodo para traer las categorias:
  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories= data//Almacenamos los productos de la categoria llamada en el metodo getAll().
    })
  }
  //Metodo que usaremos en la vista de este componente para hacer logout:
  logout(){
    this.authService.logout();
    this.profile= null;//Cuando cerremos sesion limpiamos el perfil.
    this.router.navigate(['/home'])//Luego direccionamos al usuario al home. Recuerda que tambien puedes usar navigateByUrl(/home) para hacer este redireccionamiento.
  }
}
