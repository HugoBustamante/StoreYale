import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';//Nos sirve para leer parametros desde el routing
import { Product } from 'src/app/models/product.model';
import { ProductsService } from './../../../services/products.service';//Lo importamos para inyeectar el servicio de solicitar un producto por categoria.
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  //Almacenaremos el id  de la categoria con un estado inicial null si no nos envian nada:
  categoryId: string | null= null;
  limit = 5;
  offset = 0;
  products: Product[] = [];//Acá almacenaremos los productos categorizados
  productId: string | null= null;//Almacenará el valor del parametro product.

  //Inyectamos los servicio:
  constructor( private route: ActivatedRoute,
              private productsService: ProductsService
    ) { }

  //Creamos el metodo para capturar el id de la categoria que nos envia desde el url:
  ngOnInit(): void {
    //con route debemos hacer una subscripcion a paramMap, cada vez que me envien un id los obtenemos por medio de paramMap:
    this.route.paramMap
    .pipe(
      switchMap(params => {//acá tenemos los parametros, el id.
        this.categoryId= params.get("id");//Conceguimos el parametro id. El nombre dentro de get debe ser el mismo que está puesto en el parametro del routing category.

    //Validamos que el metodo get() nos haya devuelto un string ya que si no lo hacemos nos dará un error para el parametro categoryId en el metodo getByCategory() de abajo, porque si recordamos dentro de los parametros de getByCategory obligamos que el id debe ser un string asi que como sabemos el metodo get nos puede traer un String o un null; Y porque la respuesta peude ser null por ello habia conflicto y tenemos que validar que la respuesta nos haya traido un String si o si:
        if(this.categoryId){
          //Retornamos de forma directa el observador con los productos categorizado con dicho id de está petición:
          return  this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        }
        //El switcMap espera que de alguno u otra forma le retornemos un observador, asi que en el caso de que no nos llegue un observador con los productos categorizados, retornamos un array vacio, osea que no tengo productos que mostrar:
        return [];
        }),
    )
    .subscribe( data => {
        this.products= data; //Almacenamos los productos de la categoria
      });

    //Leemos los queryParams para los productos que estan en la categoria para que cuando abramos el detalle de un producto dentro de una categoria, la url tome estos parametros, osea: ?product=id:
    this.route.queryParamMap.subscribe(params => {
      this.productId= params.get('product');//Recibimos el parametro product
      console.log(this.productId);//Si en la ruta escribimos product=1, se imprimira ese id del parametro product
    })
  }

  //Metodo para solicitar más productos al servicio getAll dependiendo de parametros dinamicos limit y offset
  loadMore() {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      //Fijate acá como esa data vamos a concatenar paginas con productos en el array de los products[], que a su vez estamos comunicando de vuelta con un @Input al componente products:
      this.products = this.products.concat(data);
      this.offset += this.limit; //Cada peticion de carga aumentara el offset trayendo las siguientes paginas de productos
    });
  }

}
