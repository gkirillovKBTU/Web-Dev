import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductType} from '../types/product.model';
import { EXAMPLE_PRODUCTS } from '../api/ProductServiceAPI';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): Observable<ProductType[]> {
    return of(EXAMPLE_PRODUCTS);
  }

  getProduct(id: number): Observable<ProductType | undefined> {
    return of(EXAMPLE_PRODUCTS.find(p => p.id === id));
  }
}
