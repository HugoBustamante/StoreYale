import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../../models/product.model';

import { StoreService } from './../../../services/store.service';
import { ProductsService } from './../../../services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  myShoppingCart: Product[] = [];
  total = 0;
  @Input () products: Product[] = []; //Transformamos este array para mandarlo a un componente externo padre
  @Output () onLoadMore = new EventEmitter(); //Emitimos a un componente padre la accion de click en cargar más
  showProductDetail = false;
  productChosen: Product | null = null;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  @Input() set productId (id: string | null) {//Le pasaremos el id.
      if(id){//Si id existe
        this.onShowDetail(id);//Con esto simplemente con el hecho de enviarle el id que queremos mostrar a este componente products, mostrariamos y ejecutariamos la logica de onShowDetail()
      }
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  //En este metodo generamos un request para obtener un producto por medio de su id, el detalle del producto:
  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    //this.toggleProductDetail();
    if(!this.showProductDetail){//Si el detalle está cerrado (el layout con el detalle), lo abrimos inmediatamente
      this.showProductDetail= true;
    }
    this.productsService.getOne(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      }
    );
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo prodcuto',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    if (this.productChosen) {
      const changes: UpdateProductDTO = {
        title: 'change title',
      };
      const id = this.productChosen?.id;
      this.productsService.update(id, changes).subscribe((data) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products[productIndex] = data;
        this.productChosen = data;
      });
    }
  }

  deleteProduct() {
    if (this.productChosen) {
      const id = this.productChosen?.id;
      this.productsService.delete(id).subscribe(() => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
    }
  }
  //Metodo donde emitimos el click del boton de cargar más productos hacia un componente externo
  loadMore() {
    this.onLoadMore.emit();//Si no egremos parametros el emit tomara de referencia el evento que recibe este metodo, en este caso el clik al boton  cargar más
  };
}
