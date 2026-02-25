import {Component, inject, input, signal} from '@angular/core';
import { ProductType } from '../../types/product.model';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Product } from './product.component';
import { ProductService } from '../product-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, map, switchMap } from 'rxjs';

@Component({
  selector: 'product-list',
  template: `
    <div class="products-container">
      @for (prod of productList$ | async; track prod.id) {
      <product [product]="prod" (deleteItemEvent)="deleteItem($event)"/>
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

  productList$ = combineLatest([
    this.allProducts$,
    toObservable(this.hiddenIds)
  ]).pipe(
    map(([products, hidden]) => products.filter(p => !hidden.has(p.id)))
  );

  deleteItem(itemId: number){
    this.hiddenIds.update(ids => new Set([...ids, itemId]))
  }
}