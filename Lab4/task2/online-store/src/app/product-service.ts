import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductType} from '../types/product.model';
import { EXAMPLE_PRODUCTS } from '../api/ProductServiceAPI';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(categoryId?: number): Observable<ProductType[]> {
    console.log("Passed categoryId", categoryId)
    if(categoryId){
      return of(EXAMPLE_PRODUCTS.filter(product => product.categoryId === categoryId || categoryId == 0))
    }
    return of(EXAMPLE_PRODUCTS);
  }

  getProduct(id: number): Observable<ProductType | undefined> {
    return of(EXAMPLE_PRODUCTS.find(p => p.id === id));
  }
}
