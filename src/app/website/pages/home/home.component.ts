import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../services/products.service';
import {Product} from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null= null;//Almacenará el valor del parametro product.

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  //Metodo que treará todos los productos de la API y se suscribirá a los parametros tipo Query:
  ngOnInit(): void {
    this.productsService.getAll(10, 0).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
    //Nos subscribimos a los parametros tipo Query para vigilarlo:
    this.route.queryParamMap.subscribe(params => {//tenemos los parametros en params
      this.productId= params.get('product');//Recibimos el parametro product
      console.log(this.productId);//Si en la ruta escribimos product=1, se imprimira ese id del parametro product
    })
  }

  //Metodo para solicitar más productos al servicio getAll de pendiendo de parametros dinamicos limit y offset
  loadMore() {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      //Fijate acá como esa data vamos a concatenar paginas con productos en el array de los products[], que a su vez estamos comunicando de vuelta con un @Input al componente products:
      this.products = this.products.concat(data);
      this.offset += this.limit; //Cada peticion de carga aumentara el offset trayendo las siguientes paginas de productos
    });
  }

}
