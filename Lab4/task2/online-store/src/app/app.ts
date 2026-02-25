import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './components/productList.component';
import { CATEGORIES } from '../types/category.model';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList, FormsModule, NgFor],
templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('online-store');
  categories = Object.values(CATEGORIES);
  productCategory = signal("0");
  categoryAsNumber = computed(() => this.productCategory() ? Number(this.productCategory()) : 0)
}
