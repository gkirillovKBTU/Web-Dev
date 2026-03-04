import {Component, computed, input, output} from '@angular/core';
import { ProductType } from '../../types/product.model';
import { DecimalPipe } from '@angular/common';
import { shareProduct } from '../../utils/productFormatter';
import { CarouselComponent } from './carouselImages';

@Component({
  selector: 'product',
  template: `
    <div class="product-card">
      <div class="image-container">
        <app-carousel [images]="product()?.images ? [...product()?.images ?? []] : []"/>
        
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product()?.name }}</h3>
        <p class="product-description">{{ product()?.description }}</p>
        <p class="product-price">{{ product()?.price | number }} KZT</p>
        <div class="product-ratings">
          <span class="product-rating"> 
            <div class="star-container">
            <div class="star-back">★</div>
              <div class="star-front" [style.height.%]="ratingPercent()">
                <span>★</span>
              </div>
            </div>
            {{ product()?.rating }}
          </span>
          <span class="product-likes">
            <button class="like-btn" (click)="likeItem()">
              @if(!liked){
                <img alt="Liked heart" src="https://www.svgrepo.com/show/23218/black-heart.svg" decoding="async" width="16" height="16">
              }@else {
                <img alt="Unliked heart" src="https://www.svgrepo.com/show/407319/red-heart.svg" decoding="async" width="16" height="16">
              }
            </button>
            {{ liked ? (product()?.likes ?? 0) + 1 : product()?.likes ?? 0 }}
          </span>
        </div>
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
      <button class="delete-btn" (click)="deleteItem()">X</button>
    </div>
  `,
  styleUrl: './products.css',
  imports:[DecimalPipe, CarouselComponent]
})
export class Product {
  product = input<ProductType>();
  liked = false;
  readonly deleteItemEvent = output<number>();
  shareUrls = computed(() => shareProduct(this.product()?.name ?? 'Unknown', this.product()?.link ?? 'Unknown'))

  ratingPercent = computed(() => (this.product()?.rating ?? 0)/5.0 * 100)

  deleteItem() {
    this.deleteItemEvent.emit(this.product()?.id ?? 0);
  }

  likeItem(){
    this.liked = !this.liked;
  }
}