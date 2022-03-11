import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';//Nos permite leer parametros desde el routing
import { Product } from 'src/app/models/product.model';//Importamos
import { switchMap } from 'rxjs/operators';//Importamos
import { ProductsService } from './../../../services/products.service';//Lo importamos para inyectar el servicio de solicitar un producto por categoria.
import { Location } from '@angular/common';//Servicio que nos permite hacer uso de la navegacion en ruta. Este lo usaremos para el metodo que retrocede del detalle de un producto a la pagina principal

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

   //Necesitamos esta variable para capturar el id de la ruta:
   productId: string | null= null;
   product: Product | null= null //guardamos el producto individual. Debe ser nulo en el caso de que no encontremos a ese producto en especifico o nos manden un id que no tiene nada que ver

  //Inyectamos el servicio que permite leer las rutas:
  constructor( private route: ActivatedRoute,
              private productsService: ProductsService,
              private location: Location
    ) { }

  //Creamos el metodo para capturar el id de un producto que nos envia desde el url del navegador:
  ngOnInit(): void {
    //con route debemos hacer una subscripcion a paramMap, cada vez que me envien un id los obtenemos por medio de paramMap:
    this.route.paramMap
    .pipe(
      switchMap(params => {//acá tenemos los parametros, el id.
        this.productId= params.get("id");//Conseguimos el parametro id de la ruta. El nombre dentro de get() debe ser el mismo que está puesto en el parametro del routing category.

    //Validamos que el metodo get() nos haya devuelto un string porque si recordamos dentro de los parametros de getOne() obligamos que el id debe ser un string asi que como sabemos el metodo get nos puede traer un String o un null; Y porque la respuesta puede ser null por ello habria conflicto y por eso tenemos que validar que la respuesta nos haya traido un String si o si:
        if(this.productId){
          //Retornamos de forma directa el observador con el producto que tiene ese id
          return  this.productsService.getOne(this.productId)
        }
        //El switcMap espera que de alguno u otra forma le retornemos un observador, asi que en el caso de que no nos llegue un observador con el producto, osea que no encuentre el producto, retornamos un null
        return [null];
        }),
    )
    .subscribe( data => {
        this.product= data; //Almacenamos el producto
      });
  }

  //Metodo para volver del detalle de un producto a una ruta atras. Para ello usamos un servicio que nos provee Angular que esta dentro del modulo common que se llama location y este nos permite hacer el uso de la navegación en ruta:
  goToBack(){
      this.location.back()//Metodo que nos permite ir hacia una ruta atras.
  }
}
