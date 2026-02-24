import {Component, inject} from '@angular/core';
import { ProductType } from '../../types/product.model';
import { AsyncPipe } from '@angular/common';
import { Product } from './product.component';
import { ProductService } from '../product-service';

@Component({
  selector: 'product-list',
  template: `
    <div class="products-container">
      @for (prod of productList | async; track prod.id) {
      <product [product]="prod"/>
      }
    </div>
  `,
  styleUrl: './product-list.css',
  imports:[Product, AsyncPipe]
})
export class ProductList {
  productService = inject(ProductService)
  productList = this.productService.getProducts()
}