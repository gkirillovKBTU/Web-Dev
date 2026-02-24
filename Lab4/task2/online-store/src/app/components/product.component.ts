import {Component, computed, input} from '@angular/core';
import { ProductType } from '../../types/product.model';
import { DecimalPipe } from '@angular/common';
import { shareProduct } from '../../utils/productFormatter';

@Component({
  selector: 'product',
  template: `
    <div class="product-card">
      <div class="image-container">
        <img [src]="product()?.image" [alt]="product()?.name" />
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product()?.name }}</h3>
        <p class="product-description">{{ product()?.description }}</p>
        <p class="product-price">{{ product()?.price | number }} KZT</p>
        <p class="product-rating">⭐ {{ product()?.rating }}</p>
        <a class="product-link" [href]="product()?.link" target="_blank">View on Kaspi.kz</a>
        <div class="share-block">
          <a class="share-link" [href]="shareUrls().telegramUrl" target="_blank">
              <img alt="Файл:Telegram 2019 Logo.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/960px-Telegram_2019_Logo.svg.png" decoding="async" width="32" height="32" data-file-width="512" data-file-height="512">
          </a>
          <a class="share-link" [href]="shareUrls().whatsappUrl" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/60px-WhatsApp.svg.png" decoding="async" width="40" height="40" data-file-width="512" data-file-height="512">
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrl: './products.css',
  imports:[DecimalPipe]
})
export class Product {
  product = input<ProductType>();
  shareUrls = computed(() => shareProduct(this.product()?.name ?? 'Unknown', this.product()?.link ?? 'Unknown'))
}