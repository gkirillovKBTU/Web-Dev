import {Component, inject, input, signal} from '@angular/core';
import { ProductType } from '../../types/product.model';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Product } from './product.component';
import { ProductService } from '../product-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, map, switchMap } from 'rxjs';
import { CATEGORIES } from '../../types/category.model';

@Component({
  selector: 'product-list',
  template: `
    <div class="products-container">
      @if((productList$ | async)?.length ?? 0 > 0){
        @for (prod of productList$ | async; track prod.id) {
           <product [product]="prod" (deleteItemEvent)="deleteItem($event)"/>
        }
      } @else{
        <h3 class="central-msg">No products in the category</h3>
        }
    </div>
  `,
  styleUrl: './product-list.css',
  imports:[Product, AsyncPipe]
})
export class ProductList {
  productService = inject(ProductService);
  category = input<number>();
  allProducts$ = toObservable(this.category).pipe(
    switchMap(category => this.productService.getProducts(category))
  )

  hiddenIds = signal<Set<number>>(new Set());

  ngOnInit(){
    alert("Welcome to online-store")
  }

  productList$ = combineLatest([
    this.allProducts$,
    toObservable(this.hiddenIds)
  ]).pipe(
    map(([products, hidden]) => products.filter(p => !hidden.has(p.id)))
  );

  // productList = signal<Product[]>([]);

  // ngOnInit() {
  //   this.productService.getProducts(this.category()).subscribe(products => {
  //     this.productList.set(products);
  //   });
  // }

  // deleteProduct(id: number) {
  //   this.productList.update(products => products.filter(p => p.id !== id));
  // }

  deleteItem(itemId: number){
    this.hiddenIds.update(ids => new Set([...ids, itemId]))
  }
}